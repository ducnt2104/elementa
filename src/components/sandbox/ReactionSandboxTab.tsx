// src/components/sandbox/ReactionSandboxTab.tsx
// Interactive Chemical Laboratory & Reaction Sandbox (GDPT 2018 & IUPAC Compliant)

import React, { useState } from 'react';
import {
  ChemicalEnvironmentState,
  ChemicalEnvironmentEngine,
  UniversalIndicatorData
} from '../../domain/chemicalEnvironment';
import { ThermochemistryEngine, STANDARD_FORMATION_ENTHALPY } from '../../domain/thermochemistryEngine';
import {
  defaultReactionEngine,
  ReactionCascadeResult,
  MolecularInventory
} from '../../domain/reactionEngine';
import { EnvironmentalCondition } from '../../domain/types';
import {
  FlaskConical,
  Flame,
  Gauge,
  Droplets,
  Zap,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle,
  AlertTriangle,
  Play,
  Layers,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
  Workflow,
  Beaker,
  Plus,
  Minus,
  Trash2,
  GitBranch
} from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface ReactantOption {
  formula: string;
  nameVI: string;
  state: 's' | 'l' | 'g' | 'aq';
  category: 'ELEMENT' | 'COMPOUND' | 'ACID' | 'BASE' | 'SALT';
}

const AVAILABLE_REACTANTS: ReactantOption[] = [
  { formula: 'Na', nameVI: 'Natri (Kim loại kiềm)', state: 's', category: 'ELEMENT' },
  { formula: 'H2O', nameVI: 'Nước lỏng', state: 'l', category: 'COMPOUND' },
  { formula: 'Fe', nameVI: 'Sắt kim loại', state: 's', category: 'ELEMENT' },
  { formula: 'O2', nameVI: 'Khí oxi', state: 'g', category: 'ELEMENT' },
  { formula: 'Al', nameVI: 'Nhôm kim loại (Lưỡng tính)', state: 's', category: 'ELEMENT' },
  { formula: 'Fe2O3', nameVI: 'Sắt(III) oxit (Gỉ quặng)', state: 's', category: 'COMPOUND' },
  { formula: 'N2', nameVI: 'Khí nitơ (Liên kết 3)', state: 'g', category: 'ELEMENT' },
  { formula: 'H2', nameVI: 'Khí hiđro', state: 'g', category: 'ELEMENT' },
  { formula: 'Cu', nameVI: 'Đồng kim loại', state: 's', category: 'ELEMENT' },
  { formula: 'HCl', nameVI: 'Axit clohiđric', state: 'aq', category: 'ACID' },
  { formula: 'NaOH', nameVI: 'Natri hiđroxit', state: 'aq', category: 'BASE' },
  { formula: 'Cl2', nameVI: 'Khí clo', state: 'g', category: 'ELEMENT' },
  { formula: 'CaCO3', nameVI: 'Đá vôi (Canxi cacbonat)', state: 's', category: 'COMPOUND' },
  { formula: 'SO2', nameVI: 'Khí lưu huỳnh đioxit', state: 'g', category: 'COMPOUND' },
  { formula: 'Ba', nameVI: 'Bari kim loại', state: 's', category: 'ELEMENT' },
  { formula: 'CH3COOH', nameVI: 'Axit axetic (Giấm ăn)', state: 'l', category: 'ACID' },
  { formula: 'C2H5OH', nameVI: 'Etanol (Cồn sinh học 96°)', state: 'l', category: 'COMPOUND' },
  { formula: 'C6H12O6', nameVI: 'Glucozơ (Đường nho)', state: 'aq', category: 'COMPOUND' },
  { formula: 'AgNO3', nameVI: 'Bạc nitrat (Thuốc thử Tollens)', state: 'aq', category: 'SALT' },
  { formula: 'Zn', nameVI: 'Kẽm kim loại (Anode Pin)', state: 's', category: 'ELEMENT' },
  { formula: 'CuSO4', nameVI: 'Đồng(II) sunfat (Dung dịch xanh)', state: 'aq', category: 'SALT' },
  { formula: 'NaCl', nameVI: 'Muối ăn (Natri clorua)', state: 'aq', category: 'SALT' },
  { formula: 'S', nameVI: 'Lưu huỳnh đơn chất (Hoàng trầm)', state: 's', category: 'ELEMENT' },
  { formula: 'SO3', nameVI: 'Lưu huỳnh trioxit', state: 'g', category: 'COMPOUND' },
  { formula: 'H2SO4', nameVI: 'Axit sunfuric', state: 'aq', category: 'ACID' },
  { formula: 'NH3', nameVI: 'Khí amoniac', state: 'g', category: 'BASE' },
  { formula: 'NH4Cl', nameVI: 'Amoni clorua (Khói trắng)', state: 's', category: 'SALT' },
  { formula: 'CaO', nameVI: 'Canxi oxit (Vôi sống)', state: 's', category: 'BASE' },
  { formula: 'Ca(OH)2', nameVI: 'Canxi hiđroxit (Nước vôi trong)', state: 'aq', category: 'BASE' },
  { formula: 'CO2', nameVI: 'Khí cacbonic', state: 'g', category: 'COMPOUND' },
  { formula: 'CH3COOC2H5', nameVI: 'Etyl axetat (Este mùi chuối)', state: 'l', category: 'COMPOUND' },
  { formula: 'CH3COONa', nameVI: 'Natri axetat (Muối giấm)', state: 'aq', category: 'SALT' },
  { formula: 'C2H4', nameVI: 'Khí etilen (Anken)', state: 'g', category: 'COMPOUND' },
  { formula: 'Au', nameVI: 'Vàng kim loại (Kim loại quý trơ)', state: 's', category: 'ELEMENT' },
  { formula: 'Mg', nameVI: 'Magie kim loại', state: 's', category: 'ELEMENT' },
  { formula: 'K', nameVI: 'Kali kim loại kiềm', state: 's', category: 'ELEMENT' },
  { formula: 'Ba(OH)2', nameVI: 'Bari hiđroxit', state: 'aq', category: 'BASE' },
  { formula: 'BaSO4', nameVI: 'Bari sunfat (Kết tủa trắng)', state: 's', category: 'SALT' },
  { formula: 'Cu(OH)2', nameVI: 'Đồng(II) hiđroxit (Kết tủa lam)', state: 's', category: 'BASE' }
];

export interface CascadePreset {
  id: string;
  name: string;
  description: string;
  initialInventory: Record<string, number>;
  conditions: EnvironmentalCondition[];
}

export const CASCADE_PRESETS: CascadePreset[] = [
  {
    id: 'cascade_alkali_neutral',
    name: '2-Bước: Thủy Phân Natri & Trung Hòa Axit',
    description: '2Na + 2H₂O → 2NaOH + H₂↑, sau đó NaOH + HCl → NaCl + H₂O',
    initialInventory: { Na: 2, H2O: 2, HCl: 1 },
    conditions: ['MOISTURE_H2O', 'ACID_DILUTE']
  },
  {
    id: 'cascade_haber_smoke',
    name: '2-Bước: Haber-Bosch & Khói Trắng Amoni Clorua',
    description: 'N₂ + 3H₂ → 2NH₃, sau đó NH₃ + HCl → NH₄Cl (khói trắng)',
    initialInventory: { N2: 1, H2: 3, HCl: 1 },
    conditions: ['HIGH_TEMP', 'CATALYST', 'ACID_DILUTE']
  },
  {
    id: 'cascade_contact_process',
    name: '3-Bước: Dây Chuyền Sản Xuất Axit H₂SO₄ Tiếp Xúc',
    description: 'S + O₂ → SO₂, 2SO₂ + O₂ ⇌ 2SO₃, SO₃ + H₂O → H₂SO₄',
    initialInventory: { S: 1, O2: 2, H2O: 1 },
    conditions: ['HIGH_TEMP', 'CATALYST', 'MOISTURE_H2O', 'OXYGEN_GAS']
  },
  {
    id: 'cascade_thermite_halogen',
    name: '2-Bước: Hỏa Thần Nhiệt Nhôm & Clo Hóa Sắt(III)',
    description: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe, sau đó 2Fe + 3Cl₂ → 2FeCl₃',
    initialInventory: { Al: 2, Fe2O3: 1, Cl2: 3 },
    conditions: ['HIGH_TEMP']
  },
  {
    id: 'cascade_ester_saponify',
    name: '2-Bước: Xà Phòng Hóa Este & Tách Nước Tạo Anken',
    description: 'CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH, sau đó C₂H₅OH → C₂H₄ + H₂O',
    initialInventory: { CH3COOC2H5: 1, NaOH: 1 },
    conditions: ['HIGH_TEMP', 'ACID_DILUTE', 'BASE_ALKALINE']
  },
  {
    id: 'cascade_fermentation_alkene',
    name: '2-Bước: Lên Men Rượu Sinh Học & Điều Chế Khí Etilen',
    description: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, sau đó 2C₂H₅OH → 2C₂H₄ + 2H₂O',
    initialInventory: { C6H12O6: 1 },
    conditions: ['HIGH_TEMP', 'ACID_DILUTE', 'CATALYST']
  }
];

interface SimulationResult {
  hasReacted: boolean;
  balancedEquation: string;
  reactionName: string;
  reactionType: string;
  deltaH: number; // kJ
  isExothermic: boolean;
  leChatelierNote: string;
  observationVI: string;
  theoreticalExplanation: string;
  resultingPh: number;
}

interface ReactionSandboxTabProps {
  onExportToWorkshop?: (reaction: {
    equation: string;
    name: string;
    notes: string;
    reactants: string[];
  }) => void;
}

export const ReactionSandboxTab: React.FC<ReactionSandboxTabProps> = ({
  onExportToWorkshop
}) => {
  // Environmental sliders
  const [temperatureC, setTemperatureC] = useState<number>(25);
  const [pressureAtm, setPressureAtm] = useState<number>(1.0);
  const [initialPh, setInitialPh] = useState<number>(7.0);
  const [vanTHoffGamma, setVanTHoffGamma] = useState<number>(2.5);
  const [selectedCatalyst, setSelectedCatalyst] = useState<string>('NONE');

  // Chamber Mode ('SINGLE' = Pair reaction, 'CASCADE' = Multi-step chain)
  const [chamberMode, setChamberMode] = useState<'SINGLE' | 'CASCADE'>('SINGLE');

  // Reactants selection (Single mode)
  const [reactantA, setReactantA] = useState<string>('Na');
  const [reactantB, setReactantB] = useState<string>('H2O');

  // Cascade Simulation State (Cascade mode)
  const [selectedCascadePreset, setSelectedCascadePreset] = useState<string>('cascade_alkali_neutral');
  const [customCascadeInventory, setCustomCascadeInventory] = useState<Record<string, number>>({ Na: 2, H2O: 2, HCl: 1 });
  const [newSubstanceSelect, setNewSubstanceSelect] = useState<string>('NaCl');
  const [cascadeResult, setCascadeResult] = useState<ReactionCascadeResult | null>(null);
  const [isSimulatingCascade, setIsSimulatingCascade] = useState<boolean>(false);

  // Simulation output (Single mode)
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Reset to SATP
  const resetToSatp = () => {
    sound.playUiClick();
    setTemperatureC(25);
    setPressureAtm(1.0);
    setInitialPh(7.0);
    setVanTHoffGamma(2.5);
    setSelectedCatalyst('NONE');
    setResult(null);
    setCascadeResult(null);
  };

  const handleSelectCascadePreset = (presetId: string) => {
    sound.playCardSelect();
    setSelectedCascadePreset(presetId);
    const preset = CASCADE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setCustomCascadeInventory({ ...preset.initialInventory });
      setCascadeResult(null);
    }
  };

  const handleUpdateInventoryCount = (formula: string, delta: number) => {
    sound.playUiClick();
    setCustomCascadeInventory(prev => {
      const next = { ...prev };
      const current = next[formula] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        delete next[formula];
      } else {
        next[formula] = updated;
      }
      return next;
    });
    setCascadeResult(null);
  };

  const handleAddSubstanceToCascade = () => {
    if (!newSubstanceSelect) return;
    sound.playVolumetricPouring('aqueous');
    setCustomCascadeInventory(prev => ({
      ...prev,
      [newSubstanceSelect]: (prev[newSubstanceSelect] || 0) + 1
    }));
    setCascadeResult(null);
  };

  const handleRunCascade = () => {
    sound.playUiClick();
    setIsSimulatingCascade(true);

    setTimeout(() => {
      setIsSimulatingCascade(false);
      const activeConditions: EnvironmentalCondition[] = [];
      if (temperatureC >= 80) activeConditions.push('HIGH_TEMP');
      if (selectedCatalyst !== 'NONE') activeConditions.push('CATALYST');
      if (initialPh <= 5.5) activeConditions.push('ACID_DILUTE');
      if (initialPh >= 8.5) activeConditions.push('BASE_ALKALINE');

      const preset = CASCADE_PRESETS.find(p => p.id === selectedCascadePreset);
      if (preset) {
        preset.conditions.forEach(c => {
          if (!activeConditions.includes(c)) activeConditions.push(c);
        });
      }

      const res = defaultReactionEngine.evaluateReactionCascade(
        customCascadeInventory,
        activeConditions,
        6
      );
      setCascadeResult(res);

      if (res.totalReactionsTriggered > 0) {
        sound.playReactionSuccess();
        sound.triggerHaptic([40, 20, 80]);
      } else if (res.hasTrapsEncountered) {
        sound.playErrorFizzle();
      }
    }, 450);
  };

  const handleSimulate = () => {
    sound.playUiClick();
    setIsSimulating(true);

    setTimeout(() => {
      setIsSimulating(false);
      evaluateReaction();
    }, 400);
  };

  const evaluateReaction = () => {
    const pair = [reactantA, reactantB].sort().join('+');
    const tempK = temperatureC + 273.15;

    // Simulation rules grounded in thermodynamics & kinetics
    if (pair === 'H2O+Na') {
      sound.playEffervescence('vigorous');
      sound.playReactionSuccess();
      sound.triggerHaptic([40, 30, 80]);
      setResult({
        hasReacted: true,
        balancedEquation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑',
        reactionName: 'Natri Thủy Phân Tỏa Nhiệt Kèm Sủi Bọt Khí',
        reactionType: 'Oxi hóa - khử (Tỏa nhiệt cực mạnh)',
        deltaH: -368.6,
        isExothermic: true,
        leChatelierNote: pressureAtm > 10.0
          ? 'Áp suất cao cản trở nhẹ sự thoát khí H₂, nhưng không đảo ngược được phản ứng tự diễn này.'
          : 'Khí H₂ thoát ra tự do đẩy cân bằng sang phải hoàn toàn.',
        observationVI: 'Mẩu Natri nóng chảy vo tròn thành giọt bạc, chạy tròn trên mặt nước, sủi bọt khí H₂ mãnh liệt, dung dịch chuyển sang màu tím hồng của kiềm NaOH.',
        theoreticalExplanation: 'Natri có thế khử chuẩn rất âm (E° Na⁺/Na = -2.71V), dễ dàng khử H⁺ trong H₂O sinh ra dung dịch kiềm kiềm tính cao (pH ~13-14).',
        resultingPh: 13.5
      });
    } else if (pair === 'Al+Fe2O3') {
      if (tempK < 800) {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: '2Al(s) + Fe₂O₃(s) ↛ (Cần mồi nhiệt > 800K)',
          reactionName: 'Phản Ứng Nhiệt Nhôm (Bị Ức Chế Do Nhiệt Độ Quá Thấp)',
          reactionType: 'Nhiệt nhôm (Thermite)',
          deltaH: -851.5,
          isExothermic: true,
          leChatelierNote: 'Phản ứng này có năng lượng hoạt hóa Ea rất cao; cần kích hoạt nhiệt độ cao để khơi mào.',
          observationVI: 'Bột nhôm và bột gỉ sắt nằm yên không phản ứng vì nhiệt độ môi trường chưa đủ vượt qua hàng rào năng lượng hoạt hóa Ea.',
          theoreticalExplanation: 'Mặc dù ΔG° rất âm (-840 kJ/mol), phản ứng nhiệt nhôm đòi hỏi mồi nhiệt ít nhất 800K (hoặc dải magie mồi cháy). Hãy tăng thanh trượt Nhiệt Độ lên trên 600°C!',
          resultingPh: initialPh
        });
      } else {
        sound.playExplosion();
        sound.triggerHaptic([50, 40, 100]);
        setResult({
          hasReacted: true,
          balancedEquation: '2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l) (3000°C)',
          reactionName: 'Hỏa Thần Nhiệt Nhôm Chảy Lỏng Kim Loại Sắt',
          reactionType: 'Oxi hóa khử nhiệt luyện kim',
          deltaH: -851.5,
          isExothermic: true,
          leChatelierNote: 'Phản ứng chất rắn nên ít bị ảnh hưởng bởi áp suất khí.',
          observationVI: 'Ngọn lửa chói lòa bùng cháy dữ dội, nhiệt độ chạm mốc gần 3000°C, sắt nóng chảy màu cam sáng rực rót chảy xuống đáy cốc nung.',
          theoreticalExplanation: 'Nhôm có ái lực cực mạnh với oxi, khử Fe(III) thành Fe nóng chảy, giải phóng nhiệt lượng khổng lồ ΔH = -851.5 kJ.',
          resultingPh: initialPh
        });
      }
    } else if (pair === 'H2+N2') {
      const hasFe = selectedCatalyst === 'Fe';
      const isHighP = pressureAtm >= 50.0;
      const isOptimalT = temperatureC >= 350 && temperatureC <= 550;

      if (!hasFe && !isHighP) {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: 'N₂(g) + 3H₂(g) ⇄ 2NH₃(g) (Hiệu suất ~0%)',
          reactionName: 'Tổng Hợp Amoniac (Haber-Bosch Thiếu Điều Kiện)',
          reactionType: 'Tổng hợp khí thuận nghịch',
          deltaH: -92.2,
          isExothermic: true,
          leChatelierNote: 'Ở 1 atm và không có xúc tác, liên kết 3 N≡N (945 kJ/mol) trơ hoàn toàn, không đứt gãy.',
          observationVI: 'Hỗn hợp khí N₂ và H₂ hoàn toàn không tương tác, không ngửi thấy mùi khai đặc trưng của NH₃.',
          theoreticalExplanation: 'Liên kết ba N≡N có năng lượng liên kết khổng lồ (945 kJ/mol). Cần xúc tác Fe để hấp phụ phân ly và áp suất cao (>150 atm) theo Le Chatelier!',
          resultingPh: initialPh
        });
      } else {
        sound.playSpellCast();
        const yieldRate = (isHighP ? 25 : 5) + (isOptimalT ? 20 : 0) + (hasFe ? 30 : 0);
        setResult({
          hasReacted: true,
          balancedEquation: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH°₂₉₈ = -92.2 kJ)',
          reactionName: 'Tổng Hợp Amoniac Công Nghiệp Haber-Bosch',
          reactionType: 'Cân bằng khí thuận nghịch',
          deltaH: -92.2,
          isExothermic: true,
          leChatelierNote: `Áp suất P = ${pressureAtm} atm làm giảm 4 mol khí (1 N₂ + 3 H₂) xuống 2 mol NH₃, dịch chuyển mạnh sang phải (Hiệu suất ước tính: ${yieldRate}%).`,
          observationVI: `Hỗn hợp khí sinh ra amoniac làm quỳ tím ẩm chuyển xanh nhạt; khí thoát ra có mùi khai đặc trưng. Hiệu suất đạt ~${yieldRate}%.`,
          theoreticalExplanation: 'Theo nguyên lý Le Chatelier, tăng áp suất dịch chuyển cân bằng theo chiều giảm số mol khí (4 mol → 2 mol). Xúc tác Fe làm giảm năng lượng hoạt hóa.',
          resultingPh: 10.5
        });
      }
    } else if (pair === 'Cu+HCl') {
      sound.playErrorFizzle();
      setResult({
        hasReacted: false,
        balancedEquation: 'Cu(s) + 2HCl(aq) ↛ Không xảy ra',
        reactionName: 'Đồng Không Tác Dụng Với Axit HCl Loãng',
        reactionType: 'Kim loại đứng sau hiđro',
        deltaH: 0,
        isExothermic: false,
        leChatelierNote: 'Thế điện cực không thuận lợi về mặt nhiệt động học.',
        observationVI: 'Mảnh đồng đỏ giữ nguyên độ sáng kim loại, không sủi bọt khí H₂, dung dịch không đổi màu.',
        theoreticalExplanation: 'Đồng đứng sau hiđro trong dãy hoạt động hóa học (E° Cu²⁺/Cu = +0.34V > E° 2H⁺/H₂ = 0.00V). Ion H⁺ không đủ thế oxi hóa kim loại đồng.',
        resultingPh: initialPh
      });
    } else if (pair === 'HCl+NaOH') {
      sound.playReactionSuccess();
      setResult({
        hasReacted: true,
        balancedEquation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
        reactionName: 'Phản Ứng Chuẩn Độ Trung Hòa Axit - Bazơ',
        reactionType: 'Trao đổi ion trung hòa',
        deltaH: -57.3,
        isExothermic: true,
        leChatelierNote: 'Phản ứng tạo thành phân tử nước điện ly yếu (H⁺ + OH⁻ → H₂O), phản ứng hoàn toàn một chiều.',
        observationVI: 'Nhiệt độ dung dịch ấm lên một cách rõ rệt (tỏa nhiệt trung hòa ~57.3 kJ/mol), pH dịch chuyển nhanh về điểm trung hòa 7.0.',
        theoreticalExplanation: 'Phản ứng giữa axit mạnh và bazơ mạnh thực chất là ion H₃O⁺ kết hợp OH⁻ tạo H₂O bền vững với hằng số cân bằng cực lớn K = 10¹⁴ ở 25°C.',
        resultingPh: 7.0
      });
    } else if (pair === 'Fe+O2') {
      sound.playChemicalDetonation(true);
      setResult({
        hasReacted: true,
        balancedEquation: '3Fe(s) + 2O₂(g) → Fe₃O₄(s) (Oxit sắt từ)',
        reactionName: 'Sắt Cháy Sáng Rực Trong Oxi Tỏa Nhiệt',
        reactionType: 'Oxi hóa kim loại chuyển tiếp',
        deltaH: -1118.4,
        isExothermic: true,
        leChatelierNote: 'Tỏa nhiệt mạnh và tiêu thụ thể tích khí oxi.',
        observationVI: 'Dây sắt cháy sáng chói lòa như pháo hoa, bắn ra các tia sáng li ti màu cam đỏ, để lại những hạt chất rắn màu nâu đen nóng đỏ dính vào thành bình.',
        theoreticalExplanation: 'Sắt có nhiều trạng thái oxi hóa (+2, +3). Đốt trong khí oxi sinh ra Fe₃O₄ (FeO·Fe₂O₃), giải phóng nhiệt năng cực cao.',
        resultingPh: initialPh
      });
    } else if (pair === 'C2H5OH+CH3COOH') {
      const hasH2SO4 = selectedCatalyst === 'H2SO4' || initialPh <= 3.0;
      const hasHeat = temperatureC >= 50;

      if (hasH2SO4 && hasHeat) {
        sound.playSpellCast();
        setResult({
          hasReacted: true,
          balancedEquation: 'CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l) (H₂SO₄ đặc, t°)',
          reactionName: 'Phản Ứng Este Hóa Tạo Mùi Chuối Chín Thơm Ngát',
          reactionType: 'Este hóa thuận nghịch (Hữu cơ 12)',
          deltaH: -15.2,
          isExothermic: true,
          leChatelierNote: 'H₂SO₄ đặc vừa là chất xúc tác vừa hút nước mãnh liệt, làm chuyển dịch cân bằng mạnh sang chiều tạo este!',
          observationVI: 'Chất lỏng sau phản ứng tách thành 2 lớp rõ rệt. Lớp trên là este etyl axetat nhẹ hơn nước, không tan, tỏa mùi thơm hoa quả chín (táo / chuối) ngào ngạt.',
          theoreticalExplanation: 'Phản ứng este hóa xảy ra giữa nhóm cacboxyl -COOH của axit và nhóm -OH của ancol theo cơ chế thế nhóm OH bằng gốc alkoxyl OR\'.',
          resultingPh: 4.5
        });
      } else {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: 'CH₃COOH(l) + C₂H₅OH(l) ↛ (Cần H₂SO₄ đặc & nhiệt độ > 50°C)',
          reactionName: 'Hỗn Hợp Este Hóa Chưa Đạt Điều Kiện Phản Ứng',
          reactionType: 'Este hóa thiếu xúc tác',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Không có axit vô cơ mạnh làm xúc tác và hút nước thì vận tốc phản ứng este hóa cực kỳ chậm chạp.',
          observationVI: 'Dung dịch vẫn đồng nhất, nồng nặc mùi giấm chua của axit axetic và mùi cồn, chưa xuất hiện lớp este nổi lên.',
          theoreticalExplanation: 'Phản ứng este hóa có tốc độ rất nhỏ ở nhiệt độ phòng. Cần thêm xúc tác H₂SO₄ đặc và đun nóng cách thủy ở ~65-70°C.',
          resultingPh: 2.9
        });
      }
    } else if (pair === 'AgNO3+C6H12O6') {
      const hasAmmonia = selectedCatalyst === 'NH3' || initialPh >= 8.5;
      const hasWarmth = temperatureC >= 40;

      if (hasAmmonia && hasWarmth) {
        sound.playCrystalShatter();
        sound.playVictory();
        sound.triggerHaptic(50);
        setResult({
          hasReacted: true,
          balancedEquation: 'C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O (t°)',
          reactionName: 'Phản Ứng Tráng Bạc / Tráng Gương Khử Tollens',
          reactionType: 'Oxi hóa khử hợp chất cacbohiđrat',
          deltaH: -145.0,
          isExothermic: true,
          leChatelierNote: 'Kim loại Ag kết tủa tách khỏi dung dịch đẩy phản ứng hoàn toàn sang phải.',
          observationVI: 'Lớp kim loại bạc sáng loáng bám dính mịn màng và đều đặn lên thành ống nghiệm thủy tinh, tạo thành một bề mặt phản chiếu gương soi lộng lẫy!',
          theoreticalExplanation: 'Nhóm chức anđehit (-CH=O) ở dạng mạch hở của glucozơ khử phức chất [Ag(NH₃)₂]⁺ thành bạc kim loại Ag(0), chứng minh glucozơ có tính đường khử.',
          resultingPh: 9.2
        });
      } else {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: 'AgNO₃ + C₆H₁₂O₆ ↛ (Cần phức Amoniac Tollens NH₃ & t° > 40°C)',
          reactionName: 'Phản Ứng Tráng Bạc Thiếu Môi Trường Amoniac Kiềm',
          reactionType: 'Thiếu phức bạc Tollens',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Ion Ag⁺ tự do không đủ thế khử chọn lọc nếu thiếu phối tử NH₃ bảo vệ.',
          observationVI: 'Dung dịch trong suốt không màu, không có kết tủa bạc bám thành ống nghiệm.',
          theoreticalExplanation: 'Phản ứng tráng bạc bắt buộc phải hòa tan kết tủa AgOH bằng dung dịch NH₃ dư để tạo thuốc thử Tollens [Ag(NH₃)₂]OH trước khi đun nhẹ với glucozơ.',
          resultingPh: initialPh
        });
      }
    } else if (pair === 'CaCO3+HCl') {
      sound.playEffervescence('vigorous');
      sound.triggerHaptic([30, 20, 50]);
      setResult({
        hasReacted: true,
        balancedEquation: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g)↑ + H₂O(l)',
        reactionName: 'Axit Ăn Mòn Đá Vôi Giải Phóng Khí Cacbonic',
        reactionType: 'Axit tác dụng với muối cacbonat',
        deltaH: -15.8,
        isExothermic: true,
        leChatelierNote: 'Khí CO₂ liên tục thoát ra ngoài làm phản ứng diễn ra một chiều hoàn toàn.',
        observationVI: 'Mẩu đá vôi tan dần mãnh liệt, dung dịch sủi bọt khí CO₂ ùng ục; dẫn khí vào nước vôi trong Ca(OH)₂ sẽ xuất hiện kết tủa trắng vẩn đục.',
        theoreticalExplanation: 'Axit clohiđric là axit mạnh hơn axit cacbonic (H₂CO₃), đẩy axit yếu không bền ra khỏi muối giải phóng khí CO₂ và H₂O.',
        resultingPh: 6.0
      });
    } else if (pair === 'CuSO4+Zn') {
      sound.playPrecipitationClouding();
      sound.playVolumetricPouring('aqueous');
      sound.triggerHaptic([40, 20, 60]);
      setResult({
        hasReacted: true,
        balancedEquation: 'Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)↓',
        reactionName: 'Pin Điện Daniell — Kẽm Đẩy Đồng Khỏi Dung Dịch Muối',
        reactionType: 'Thế kim loại & Oxi hóa khử tự diễn (E° = +1.10V)',
        deltaH: -218.7,
        isExothermic: true,
        leChatelierNote: 'Phản ứng một chiều do thế điện cực chuẩn E°cell = +1.10V cực kỳ thuận lợi về mặt nhiệt động học.',
        observationVI: 'Màu xanh lam của ion Cu²⁺ nhạt dần, kim loại đồng màu đỏ gạch xốp bám đều ngoài bề mặt thanh kẽm, nhiệt độ dung dịch ấm lên rõ rệt.',
        theoreticalExplanation: 'Kẽm có thế khử chuẩn âm hơn đồng (E° Zn²⁺/Zn = -0.76V < E° Cu²⁺/Cu = +0.34V), thế pin tiêu chuẩn E°cell = 1.10V tạo động lực khử mãnh liệt.',
        resultingPh: initialPh
      });
    } else if (pair === 'HCl+Zn') {
      sound.playEffervescence('vigorous');
      sound.triggerHaptic([40, 30, 70]);
      setResult({
        hasReacted: true,
        balancedEquation: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑',
        reactionName: 'Điều Chế Khí Hiđro Trong Phòng Thí Nghiệm',
        reactionType: 'Kim loại tác dụng với Axit loãng (Thế H⁺)',
        deltaH: -153.9,
        isExothermic: true,
        leChatelierNote: 'Khí H₂ liên tục bốc lên làm cân bằng dịch chuyển hoàn toàn sang phải.',
        observationVI: 'Bọt khí H₂ không màu sủi mạnh mẽ trên bề mặt lá kẽm, lá kẽm tan dần, bình nón ấm lên; đưa que đóm cháy lại gần nghe tiếng nổ nhẹ.',
        theoreticalExplanation: 'Kẽm đứng trước hiđro trong dãy điện hóa (E° = -0.76V < 0.00V), khử proton H⁺ trong axit giải phóng khí hiđro tự do.',
        resultingPh: 5.5
      });
    } else if (pair === 'AgNO3+NaCl') {
      sound.playPrecipitationClouding();
      sound.triggerHaptic([30, 40]);
      setResult({
        hasReacted: true,
        balancedEquation: 'AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)',
        reactionName: 'Nhận Biết Ion Clorua Bằng Thuốc Thử Bạc Nitrat',
        reactionType: 'Trao đổi ion tạo kết tủa',
        deltaH: -65.7,
        isExothermic: true,
        leChatelierNote: 'Kết tủa AgCl tách khỏi dung dịch làm phản ứng hoàn toàn không thuận nghịch.',
        observationVI: 'Ngay khi nhỏ vào nhau, xuất hiện tức thì kết tủa trắng đục như váng sữa của AgCl, không tan trong axit mạnh, hóa đen dần ngoài ánh sáng.',
        theoreticalExplanation: 'Tích số tan Ksp của AgCl rất nhỏ (~1.8 × 10⁻¹⁰), nồng độ ion [Ag⁺][Cl⁻] vượt quá tích số tan tạo kết tủa trắng bền vững.',
        resultingPh: 7.0
      });
    } else if (pair === 'CuSO4+Fe') {
      sound.playPrecipitationClouding();
      sound.triggerHaptic([30, 20, 50]);
      setResult({
        hasReacted: true,
        balancedEquation: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓',
        reactionName: 'Thí Nghiệm Đinh Sắt Đẩy Đồng Khỏi Muối',
        reactionType: 'Thế kim loại chuyển tiếp (E° = +0.78V)',
        deltaH: -150.0,
        isExothermic: true,
        leChatelierNote: 'Thế chuẩn E°cell = +0.78V dương đảm bảo phản ứng tự diễn một chiều.',
        observationVI: 'Lớp kim loại màu đỏ gạch của đồng bám mịn màng lên bề mặt đinh sắt, màu xanh lam đậm của dung dịch nhạt dần và chuyển sang màu xanh lục nhạt của muối Fe²⁺.',
        theoreticalExplanation: 'Sắt có thế khử chuẩn âm hơn đồng (E° Fe²⁺/Fe = -0.44V < E° Cu²⁺/Cu = +0.34V), nhường 2e cho ion Cu²⁺ để tạo ion Fe²⁺.',
        resultingPh: initialPh
      });
    } else if (pair === 'Al+NaOH') {
      sound.playEffervescence('vigorous');
      sound.triggerHaptic([40, 30, 80]);
      setResult({
        hasReacted: true,
        balancedEquation: '2Al(s) + 2NaOH(aq) + 6H₂O(l) → 2Na[Al(OH)₄](aq) + 3H₂(g)↑',
        reactionName: 'Nhôm Hòa Tan Trong Dung Dịch Kiềm (Tính Lưỡng Tính)',
        reactionType: 'Kim loại tác dụng dung dịch kiềm mạnh giải phóng H₂',
        deltaH: -830.4,
        isExothermic: true,
        leChatelierNote: 'Khí H₂ liên tục bốc lên mãnh liệt làm cân bằng chuyển dịch hoàn toàn sang phải.',
        observationVI: 'Mảnh nhôm sủi bọt khí H₂ ùng ục, tan dần làm dung dịch nóng bừng lên và trong suốt do tạo phức natri aluminat tan.',
        theoreticalExplanation: 'Lớp màng oxit Al₂O₃ lưỡng tính bị kiềm hòa tan, phơi bày kim loại Al khử trực tiếp H₂O với sự hỗ trợ của OH⁻ tạo ion [Al(OH)₄]⁻.',
        resultingPh: 12.0
      });
    } else if (pair === 'Ba+H2O') {
      sound.playEffervescence('vigorous');
      sound.playReactionSuccess();
      sound.triggerHaptic([50, 30, 90]);
      setResult({
        hasReacted: true,
        balancedEquation: 'Ba(s) + 2H₂O(l) → Ba(OH)₂(aq) + H₂(g)↑',
        reactionName: 'Bari Kim Loại Thủy Phân Mãnh Liệt Tỏa Nhiệt',
        reactionType: 'Kim loại kiềm thổ phản ứng với nước',
        deltaH: -428.6,
        isExothermic: true,
        leChatelierNote: 'Phản ứng một chiều do thế điện cực chuẩn E° rất âm (E° Ba²⁺/Ba = -2.91V) và khí H₂ thoát ra ngoài.',
        observationVI: 'Mẩu kim loại bari phản ứng tức thì xèo xèo dữ dội, dung dịch nóng rực, bọt khí H₂ cuồn cuộn, kiềm Ba(OH)₂ làm quỳ tím hóa xanh đậm.',
        theoreticalExplanation: 'Bari có thế chuẩn âm hơn cả natri, tính khử cực mạnh nên khử proton của nước mãnh liệt tạo dung dịch bazơ mạnh Ba(OH)₂.',
        resultingPh: 13.0
      });
    } else if (pair === 'O2+SO2') {
      const hasCatalyst = selectedCatalyst === 'V2O5' || selectedCatalyst === 'Pt';
      const hasOptimalHeat = temperatureC >= 400;

      if (hasCatalyst || hasOptimalHeat) {
        sound.playSpellCast();
        sound.triggerHaptic([30, 20, 40]);
        const conversionPct = hasCatalyst && hasOptimalHeat ? 98 : hasCatalyst ? 85 : 45;
        setResult({
          hasReacted: true,
          balancedEquation: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g) (ΔH°₂₉₈ = -197.8 kJ)',
          reactionName: 'Oxi Hóa Khí Lưu Huỳnh Đioxit (Giai Đoạn Tiếp Xúc H₂SO₄)',
          reactionType: 'Cân bằng khí thuận nghịch tỏa nhiệt (GDPT 2018 Hóa 10 & 11)',
          deltaH: -197.8,
          isExothermic: true,
          leChatelierNote: `Áp suất P = ${pressureAtm} atm nén 3 mol khí (2 SO₂ + 1 O₂) thành 2 mol SO₃ làm chuyển dịch sang phải. Vì tỏa nhiệt, nhiệt độ quá cao sẽ giảm hiệu suất (Hiệu suất hiện tại: ~${conversionPct}%).`,
          observationVI: `Khí SO₂ được chuyển hóa thành lưu huỳnh trioxit SO₃ với hiệu suất ~${conversionPct}%, tỏa nhiều nhiệt, khí thoát ra gặp hơi ẩm tạo sương mù axit H₂SO₄.`,
          theoreticalExplanation: 'Xúc tác V₂O₅ (hoặc Pt) làm giảm mạnh năng lượng hoạt hóa Ea từ 190 xuống 60 kJ/mol, giúp đạt trạng thái cân bằng nhanh chóng ở 450°C.',
          resultingPh: 2.0
        });
      } else {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: '2SO₂(g) + O₂(g) ↛ (Cần xúc tác V₂O₅/Pt hoặc nhiệt độ > 400°C)',
          reactionName: 'Phản Ứng Tiếp Xúc Chưa Đạt Ngưỡng Kích Hoạt',
          reactionType: 'Phản ứng khí thiếu xúc tác / nhiệt độ',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Ở nhiệt độ thường rào cản năng lượng hoạt hóa Ea = 190 kJ/mol quá lớn khiến tốc độ phản ứng gần như bằng 0.',
          observationVI: 'Hai chất khí hòa lẫn vào nhau trong buồng phản ứng mà không có biến đổi quang học hay sinh nhiệt.',
          theoreticalExplanation: 'Phân tử SO₂ và O₂ va chạm nhưng không đủ năng lượng hoạt hóa để phá vỡ liên kết. Hãy chọn xúc tác V₂O₅ hoặc tăng nhiệt độ lên trên 400°C!',
          resultingPh: initialPh
        });
      }
    } else if (pair === 'AgNO3+Cu') {
      sound.playPrecipitationClouding();
      sound.triggerHaptic([35, 25, 60]);
      setResult({
        hasReacted: true,
        balancedEquation: 'Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓',
        reactionName: 'Cây Bạc Đâm Chồi — Đồng Đẩy Bạc Khỏi Muối',
        reactionType: 'Thế kim loại chuyển tiếp (E°cell = +0.46V)',
        deltaH: -147.2,
        isExothermic: true,
        leChatelierNote: 'Bạc kim loại kết tủa tách khỏi pha dung dịch, phản ứng tự diễn một chiều hoàn toàn.',
        observationVI: 'Bề mặt lá đồng mọc ra những nhánh tinh thể bạc sáng lấp lánh như cành cây phủ tuyết, dung dịch từ không màu dần chuyển sang màu xanh lam ngọc của ion Cu²⁺.',
        theoreticalExplanation: 'Đồng đứng trước bạc trong dãy điện hóa (E° Cu²⁺/Cu = +0.34V < E° Ag⁺/Ag = +0.80V), sức điện động tiêu chuẩn +0.46V thúc đẩy quá trình khử ion Ag⁺.',
        resultingPh: initialPh
      });
    } else if (pair === 'Cl2+Fe') {
      const hasIgnition = temperatureC >= 100;

      if (hasIgnition) {
        sound.playChemicalDetonation(true);
        sound.triggerHaptic([50, 40, 90]);
        setResult({
          hasReacted: true,
          balancedEquation: '2Fe(s) + 3Cl₂(g) → 2FeCl₃(s) (t°)',
          reactionName: 'Sắt Cháy Sáng Trong Khí Clo Sinh Khói Đỏ FeCl₃',
          reactionType: 'Oxi hóa khử kim loại chuyển tiếp lên số oxi hóa cực đại (+3)',
          deltaH: -799.0,
          isExothermic: true,
          leChatelierNote: 'Phản ứng tỏa nhiệt dữ dội (ΔH = -799 kJ), biến đơn chất thành muối sắt(III) clorua bền vững.',
          observationVI: 'Dây sắt nung nóng bùng cháy sáng chói lòa trong khí clo vàng lục, tỏa ra nhiều luồng khói màu nâu đỏ quánh đặc của các vi tinh thể muối FeCl₃.',
          theoreticalExplanation: 'Clo là phi kim oxi hóa rất mạnh (E° = +1.36V), oxi hóa sắt lên mức +3 (FeCl₃), khác với axit HCl chỉ oxi hóa lên Fe(II) (FeCl₂).',
          resultingPh: 2.5
        });
      } else {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: '2Fe(s) + 3Cl₂(g) ↛ (Cần mồi nhiệt độ t° ≥ 100°C)',
          reactionName: 'Sắt Và Khí Clo Chưa Kích Hoạt Nhiệt',
          reactionType: 'Phản ứng cần mồi nhiệt',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Cần nhiệt độ ban đầu để khơi mào phá vỡ liên kết và kích thích phản ứng dây chuyền.',
          observationVI: 'Đinh sắt nằm trong bình khí clo vàng lục mà chưa bốc cháy do nhiệt độ chưa vượt qua năng lượng hoạt hóa 85 kJ/mol.',
          theoreticalExplanation: 'Ở nhiệt độ phòng tốc độ phản ứng rất chậm do lớp oxit mỏng trên bề mặt sắt; cần nung nóng dây sắt đỏ rồi đưa vào khí clo để bùng cháy mãnh liệt.',
          resultingPh: initialPh
        });
      }
    } else if (pair === 'Cl2+H2') {
      const hasActivation = selectedCatalyst === 'LIGHT' || temperatureC >= 50;

      if (hasActivation) {
        sound.playExplosion();
        sound.triggerHaptic([60, 40, 100]);
        setResult({
          hasReacted: true,
          balancedEquation: 'H₂(g) + Cl₂(g) → 2HCl(g) (Ánh sáng hν hoặc t°)',
          reactionName: 'Phản Ứng Nổ Quang Hóa Hiđro & Clo',
          reactionType: 'Phản ứng quang hóa dây chuyền gốc tự do',
          deltaH: -184.6,
          isExothermic: true,
          leChatelierNote: 'Phản ứng không làm thay đổi số mol khí (2 mol → 2 mol), tỏa nhiệt mạnh đẩy phản ứng hoàn toàn sang phải.',
          observationVI: 'Hỗn hợp nổ vang kèm ánh chớp sáng lóe, màu vàng lục của clo biến mất hoàn toàn, tạo làn khói trắng đục của các giọt axit HCl khi tiếp xúc với không khí ẩm.',
          theoreticalExplanation: 'Photon ánh sáng phân cắt quang hóa liên kết Cl-Cl thành gốc tự do Cl•, kích hoạt phản ứng dây chuyền với tốc độ bùng nổ tức thì sinh ra HCl.',
          resultingPh: 1.0
        });
      } else {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: 'H₂(g) + Cl₂(g) ↛ (Cần ánh sáng quang hóa hoặc nhiệt độ > 50°C)',
          reactionName: 'Hỗn Hợp Khí Hiđro & Clo Trong Bóng Tối',
          reactionType: 'Phản ứng quang hóa thiếu kích hoạt photon',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Trong bóng tối và nhiệt độ phòng, liên kết Cl-Cl bền vững chưa bị bẻ gãy.',
          observationVI: 'Hỗn hợp khí giữ nguyên màu vàng lục nhạt của clo, không có tiếng nổ hay biến đổi nhiệt.',
          theoreticalExplanation: 'Phản ứng quang hóa đòi hỏi năng lượng photon hν để tạo gốc tự do Cl•. Hãy bật chất xúc tác "Ánh sáng / Quang hóa [hν]" hoặc nâng nhiệt độ!',
          resultingPh: initialPh
        });
      }
    } else {
      // Dynamic evaluation using the comprehensive DCSM Chemical Reaction Engine
      const activeConditions: EnvironmentalCondition[] = [];
      if (temperatureC >= 80) activeConditions.push('HIGH_TEMP');
      if (selectedCatalyst !== 'NONE') activeConditions.push('CATALYST');
      if (initialPh <= 5.5) activeConditions.push('ACID_DILUTE');
      if (initialPh >= 8.5) activeConditions.push('BASE_ALKALINE');
      if (reactantA === 'H2O' || reactantB === 'H2O') activeConditions.push('MOISTURE_H2O');
      if (reactantA === 'O2' || reactantB === 'O2') activeConditions.push('OXYGEN_GAS');

      const dynamicEval = defaultReactionEngine.evaluateCombination([reactantA, reactantB], activeConditions);

      if (dynamicEval.status === 'SUCCESS' && dynamicEval.matchedRule) {
        const rule = dynamicEval.matchedRule;
        const isExo = rule.thermodynamics === 'EXOTHERMIC';
        if (isExo) {
          sound.playReactionSuccess();
          sound.triggerHaptic([40, 20, 60]);
        } else {
          sound.playSpellCast();
        }

        setResult({
          hasReacted: true,
          balancedEquation: rule.equation,
          reactionName: rule.name_vi,
          reactionType: `${rule.groupCategory} (${rule.thermodynamics})`,
          deltaH: isExo ? -Math.round(rule.basePower * 4.5) : Math.round(rule.basePower * 2.5),
          isExothermic: isExo,
          leChatelierNote: pressureAtm > 5.0
            ? 'Áp suất cao thúc đẩy các phản ứng giảm thể tích khí hoặc nén pha ngưng tụ.'
            : 'Phản ứng diễn ra thuận lợi theo nguyên lý bảo toàn khối lượng và nhiệt động học.',
          observationVI: rule.observablePhenomenaVI,
          theoreticalExplanation: rule.pedagogicalExplanation,
          resultingPh: rule.groupCategory === 'GROUP_C_ACID_BASE'
            ? (rule.equation.includes('OH') ? 11.5 : rule.equation.includes('H+') ? 2.5 : 7.0)
            : initialPh
        });
      } else if (dynamicEval.status === 'TRAP_TRIGGERED' || (dynamicEval.matchedRule && dynamicEval.matchedRule.isTrap)) {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: dynamicEval.equation || `${reactantA} + ${reactantB} ↛ (Bẫy nhận thức / Không phản ứng)`,
          reactionName: `⚠️ BẪY NHẬN THỨC: ${dynamicEval.matchedRule?.name_vi || 'Phản Ứng Không Khả Thi'}`,
          reactionType: 'Cấm Kỵ Hóa Học / Vi Phạm Dãy Điện Hóa',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Thế điện cực chuẩn E° không thuận lợi (ΔG° > 0).',
          observationVI: dynamicEval.observablePhenomenaVI || 'Không có hiện tượng phản ứng diễn ra; cặp chất trơ ở điều kiện này.',
          theoreticalExplanation: dynamicEval.pedagogicalMessage || dynamicEval.matchedRule?.pedagogicalExplanation || 'Cặp chất này vi phạm quy tắc nhiệt động học hoặc dãy hoạt động hóa học kim loại.',
          resultingPh: initialPh
        });
      } else if (dynamicEval.status === 'MISSING_CONDITIONS') {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: dynamicEval.equation || `${reactantA} + ${reactantB} ↛ (Thiếu điều kiện kích hoạt)`,
          reactionName: 'Phản Ứng Bị Kìm Hãm Do Thiếu Điều Kiện Xúc Tác/Nhiệt',
          reactionType: 'Thiếu Điều Kiện Môi Trường',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Năng lượng hoạt hóa Ea cao cần nhiệt độ hoặc chất xúc tác tương ứng.',
          observationVI: 'Các chất tiếp xúc nhưng không phản ứng vì chưa đạt năng lượng kích hoạt.',
          theoreticalExplanation: dynamicEval.pedagogicalMessage,
          resultingPh: initialPh
        });
      } else {
        sound.playErrorFizzle();
        setResult({
          hasReacted: false,
          balancedEquation: `${reactantA} + ${reactantB} ↛ (Chưa phát hiện phản ứng ở điều kiện này)`,
          reactionName: 'Hỗn Hợp Đồng Nhất Chưa Xảy Ra Phản Ứng Trực Tiếp',
          reactionType: 'Tương tác vật lý / Phân tán',
          deltaH: 0,
          isExothermic: false,
          leChatelierNote: 'Không có biến thiên số mol khí hoặc enthalpy rõ rệt.',
          observationVI: 'Hai chất nằm cạnh nhau trong buồng thí nghiệm mà không có hiện tượng sủi bọt khí, đổi màu hay đổi nhiệt độ.',
          theoreticalExplanation: 'Cặp chất này không thỏa mãn điều kiện thế oxi hóa khử hoặc sản phẩm không tạo kết tủa, chất khí hay chất điện ly yếu.',
          resultingPh: initialPh
        });
      }
    }
  };

  const indicatorData: UniversalIndicatorData = ChemicalEnvironmentEngine.getUniversalIndicatorData(
    result ? result.resultingPh : initialPh
  );

  const currentPairKey = [reactantA, reactantB].sort().join('+');
  const kineticsProfile = ThermochemistryEngine.getKineticsProfile(currentPairKey);
  const vanTHoff = ThermochemistryEngine.calculateVanTHoffRateIncrease(25, temperatureC, vanTHoffGamma);

  const isCatalystActive = Boolean(
    kineticsProfile?.catalystKey && selectedCatalyst === kineticsProfile.catalystKey
  );
  const tempK = temperatureC + 273.15;
  const catalystSpeedup =
    kineticsProfile && kineticsProfile.eaCatalyzed_kJ !== undefined && isCatalystActive
      ? ThermochemistryEngine.calculateCatalystSpeedup(
          kineticsProfile.eaUncatalyzed_kJ,
          kineticsProfile.eaCatalyzed_kJ,
          tempK
        )
      : null;

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-4 max-w-7xl mx-auto flex flex-col gap-4">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-navy/80 via-slate-900 to-navy/80 border border-cyan-500/30 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-obsidian shadow-lg shadow-cyan-500/30">
            <FlaskConical className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-white">
              PHÒNG THÍ NGHIỆM HÓA HỌC ẢO (REACTION SANDBOX)
            </h1>
            <p className="text-xs text-slate-400">
              Mô phỏng phản ứng nhiệt động học IUPAC, nguyên lý Le Chatelier & động hóa học Van 't Hoff
            </p>
          </div>
        </div>

        <button
          onClick={resetToSatp}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt Về Chuẩn SATP (25°C, 1 atm, pH 7)
        </button>
      </div>

      {/* Chamber Mode Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => {
            sound.playCardSelect();
            setChamberMode('SINGLE');
          }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            chamberMode === 'SINGLE'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Beaker className="w-4 h-4" />
          <span>🧪 BUỒNG PHẢN ỨNG ĐƠN (SATP & CÂN BẰNG)</span>
        </button>

        <button
          onClick={() => {
            sound.playCardSelect();
            setChamberMode('CASCADE');
          }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            chamberMode === 'CASCADE'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>⚡ DÂY CHUYỀN HÓA HỌC ĐA BƯỚC (REACTION CASCADE)</span>
        </button>
      </div>

      {chamberMode === 'CASCADE' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Preset Cascades & Reagent Inventory (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Preset Cascades */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col gap-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Workflow className="w-4 h-4 text-amber-400" />
                <span>1. CHỌN DÂY CHUYỀN MẪU (GDPT 2018)</span>
              </div>

              <select
                value={selectedCascadePreset}
                onChange={(e) => handleSelectCascadePreset(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500"
              >
                {CASCADE_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {(() => {
                const currentPreset = CASCADE_PRESETS.find(p => p.id === selectedCascadePreset);
                return currentPreset ? (
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-400 font-mono">
                    <p className="text-amber-300 font-bold mb-1">{currentPreset.description}</p>
                    <p className="text-[11px] text-slate-500">
                      Điều kiện kích hoạt:{' '}
                      <span className="text-slate-300">{currentPreset.conditions.join(', ') || 'SATP'}</span>
                    </p>
                  </div>
                ) : null;
              })()}
            </div>

            {/* Custom Molecular Inventory Manager */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>2. BÌNH PHẢN ỨNG (HÓA CHẤT NẠP SẴN)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {Object.keys(customCascadeInventory).length} chất
                </span>
              </div>

              {/* Substance List */}
              <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                {Object.entries(customCascadeInventory).map(([formula, count]) => (
                  <div
                    key={formula}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-cyan-300 text-sm">{formula}</span>
                      <span className="text-[10px] text-slate-400">
                        {AVAILABLE_REACTANTS.find(r => r.formula === formula)?.nameVI || 'Hóa chất'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono">
                      <button
                        onClick={() => handleUpdateInventoryCount(formula, -1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-white text-sm">{count} mol</span>
                      <button
                        onClick={() => handleUpdateInventoryCount(formula, 1)}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {Object.keys(customCascadeInventory).length === 0 && (
                  <div className="text-center py-4 text-xs text-slate-500">
                    Bình phản ứng đang trống. Hãy thêm chất bên dưới.
                  </div>
                )}
              </div>

              {/* Add New Substance */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <select
                  value={newSubstanceSelect}
                  onChange={(e) => setNewSubstanceSelect(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200"
                >
                  {AVAILABLE_REACTANTS.map(r => (
                    <option key={`add_${r.formula}`} value={r.formula}>
                      {r.formula} — {r.nameVI}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleAddSubstanceToCascade}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-obsidian font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm</span>
                </button>
              </div>
            </div>

            {/* Launch Cascade Trigger */}
            <button
              onClick={handleRunCascade}
              disabled={isSimulatingCascade || Object.keys(customCascadeInventory).length === 0}
              className="py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-obsidian font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {isSimulatingCascade ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>ĐANG MÔ PHỎNG DÂY CHUYỀN...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-obsidian" />
                  <span>KHỞI CHẠY DÂY CHUYỀN PHẢN ỨNG</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Sequential Reaction Pipeline (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {!cascadeResult ? (
              <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center gap-4 min-h-[360px]">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Workflow className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-200">
                    MÔ HÌNH DÂY CHUYỀN PHẢN ỨNG HÓA HỌC TUẦN TỰ (DCSM CASCADE)
                  </h3>
                  <p className="text-xs text-slate-400 max-w-lg mt-1 leading-relaxed">
                    Mỗi phản ứng sau khi xảy ra sẽ sinh ra các sản phẩm trung gian; các sản phẩm này tiếp tục đóng vai trò là chất phản ứng cho các giai đoạn tiếp theo theo đúng định luật bảo toàn khối lượng và nguyên lý nhiệt động học IUPAC.
                  </p>
                </div>
                <div className="text-xs text-amber-400/90 font-mono bg-amber-950/40 border border-amber-500/30 px-4 py-2 rounded-xl">
                  Chọn dây chuyền mẫu bên trái và nhấn "KHỞI CHẠY DÂY CHUYỀN PHẢN ỨNG"
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Cascade Summary Banner */}
                <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-lg flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      KẾT QUẢ DÂY CHUYỀN HÓA HỌC
                    </span>
                    <h3 className="text-base font-black text-white">{cascadeResult.summaryVI}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-slate-300">
                      Giai đoạn: <span className="text-cyan-300 font-black">{cascadeResult.totalReactionsTriggered}</span>
                    </span>
                    {cascadeResult.hasTrapsEncountered && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 border border-amber-500 text-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        GẶP BẪY NHẬN THỨC
                      </span>
                    )}
                  </div>
                </div>

                {/* Cognitive Trap Card (if any) */}
                {cascadeResult.hasTrapsEncountered && cascadeResult.trapDetails && (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/60 shadow-lg flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>⚠️ DÂY CHUYỀN BỊ NGẮT DO BẪY NHẬN THỨC HÓA HỌC</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{cascadeResult.trapDetails.reactionName}</h4>
                    <p className="text-xs text-amber-200/90 leading-relaxed font-mono">
                      {cascadeResult.trapDetails.message}
                    </p>
                  </div>
                )}

                {/* Step-by-Step Reaction Cards */}
                <div className="flex flex-col gap-3">
                  {cascadeResult.steps.map((step, idx) => (
                    <div
                      key={step.stepIndex}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col gap-2.5 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/40">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-black text-white">{step.reaction.reactionName}</span>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            step.isExothermic
                              ? 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                              : 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300'
                          }`}
                        >
                          {step.isExothermic ? 'TỎA NHIỆT (ΔH < 0)' : 'THU NHIỆT (ΔH > 0)'}
                        </span>
                      </div>

                      {/* Equation */}
                      <div className="font-mono text-sm font-black px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/30 text-cyan-300 shadow-sm">
                        {step.reaction.equation}
                      </div>

                      {/* Stoichiometric Deltas */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                          <span className="text-slate-400 block mb-0.5 text-[11px]">Chất tiêu thụ:</span>
                          <span className="text-rose-400 font-bold">
                            {Object.entries(step.consumedDelta)
                              .map(([sym, amt]) => `-${amt} mol ${sym}`)
                              .join(', ')}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                          <span className="text-slate-400 block mb-0.5 text-[11px]">Sản phẩm sinh ra:</span>
                          <span className="text-emerald-400 font-bold">
                            {step.producedDelta.map(p => `+${p.count} mol ${p.formula}`).join(', ')}
                          </span>
                        </div>
                      </div>

                      {/* Phenomenon & Explanation */}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-amber-400 font-semibold">Hiện tượng: </span>
                        {step.reaction.observablePhenomenaVI}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Final Inventory in Reaction Vessel */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
                    <FlaskConical className="w-4 h-4 text-teal-400" />
                    <span>HÓA CHẤT CÒN LẠI TRONG BÌNH SAU DÂY CHUYỀN (FINAL INVENTORY)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(cascadeResult.finalInventory).map(([sym, amt]) => (
                      <div
                        key={`final_${sym}`}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center font-mono"
                      >
                        <span className="text-cyan-300 font-black text-sm block">{sym}</span>
                        <span className="text-slate-400 text-xs font-bold">{amt} mol</span>
                      </div>
                    ))}
                  </div>

                  {/* Net Synthesized Products */}
                  {cascadeResult.netProductsProduced.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">Tổng sản phẩm tổng hợp:</span>
                      <span>
                        {cascadeResult.netProductsProduced.map(p => `${p.count} mol ${p.formula}`).join(' + ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Environmental Controls & Reactants Selector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Reactants Picker */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col gap-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>1. CHỌN CẶP CHẤT THAM GIA PHẢN ỨNG</span>
            </div>

            {/* Reactant A */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block font-mono">Chất A (Reagent 1):</label>
              <select
                value={reactantA}
                onChange={(e) => {
                  sound.playVolumetricPouring('aqueous');
                  sound.triggerHaptic(15);
                  setReactantA(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {AVAILABLE_REACTANTS.map((r) => (
                  <option key={`a_${r.formula}`} value={r.formula}>
                    {r.formula} — {r.nameVI}
                  </option>
                ))}
              </select>
            </div>

            {/* Reactant B */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block font-mono">Chất B (Reagent 2):</label>
              <select
                value={reactantB}
                onChange={(e) => {
                  sound.playVolumetricPouring('aqueous');
                  sound.triggerHaptic(15);
                  setReactantB(e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {AVAILABLE_REACTANTS.map((r) => (
                  <option key={`b_${r.formula}`} value={r.formula}>
                    {r.formula} — {r.nameVI}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Environmental Conditions */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col gap-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>2. ĐIỀU KIỆN MÔI TRƯỜNG PHẢN ỨNG</span>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Nhiệt Độ (T)
                </span>
                <span className="font-mono font-bold text-rose-400">
                  {temperatureC}°C ({(temperatureC + 273.15).toFixed(0)} K)
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="1000"
                step="10"
                value={temperatureC}
                onChange={(e) => setTemperatureC(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>-50°C (Lạnh sâu)</span>
                <span>25°C (SATP)</span>
                <span>1000°C (Nung nhiệt)</span>
              </div>
            </div>

            {/* Pressure Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-purple-400" />
                  Áp Suất (P)
                </span>
                <span className="font-mono font-bold text-purple-400">
                  {pressureAtm.toFixed(1)} atm
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="250"
                step="1"
                value={pressureAtm}
                onChange={(e) => setPressureAtm(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.1 atm (Chân không)</span>
                <span>1 atm</span>
                <span>250 atm (Haber-Bosch)</span>
              </div>
            </div>

            {/* Initial pH Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                  Độ pH Ban Đầu
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  pH {initialPh.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="0.5"
                value={initialPh}
                onChange={(e) => setInitialPh(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 (Acid mạnh)</span>
                <span>7 (Trung tính)</span>
                <span>14 (Kiềm mạnh)</span>
              </div>
            </div>

            {/* Van 't Hoff Coefficient Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  Hệ Số Nhiệt Van 't Hoff (γ)
                </span>
                <span className="font-mono font-bold text-amber-400">
                  γ = {vanTHoffGamma.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="4.0"
                step="0.1"
                value={vanTHoffGamma}
                onChange={(e) => setVanTHoffGamma(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2.0 (Tối thiểu)</span>
                <span>2.5 (Chuẩn Hóa 10)</span>
                <span>4.0 (Tối đa)</span>
              </div>
            </div>

            {/* Catalysts Selector */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block font-mono flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Chất Xúc Tác (Catalyst):
              </label>
              <select
                value={selectedCatalyst}
                onChange={(e) => setSelectedCatalyst(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="NONE">Không dùng xúc tác</option>
                <option value="H2SO4">Axit Sunfuric đặc [H₂SO₄ đặc] (Xúc tác Este hóa & Hút nước)</option>
                <option value="NH3">Dung dịch Amoniac [NH₃] (Tạo phức tráng bạc Tollens)</option>
                <option value="Fe">Sắt [Fe] (Haber-Bosch)</option>
                <option value="V2O5">Vanadi(V) oxit [V₂O₅] (Tiếp xúc oxi hóa SO₂ → SO₃)</option>
                <option value="LIGHT">Ánh sáng / Quang hóa [hν] (Kích hoạt gốc clo Cl•)</option>
                <option value="Pt">Bạch kim [Pt] (Oxi hóa amoniac / Hydro hóa)</option>
                <option value="Ni">Niken [Ni] (Nhiệt phân & tổng hợp hữu cơ)</option>
                <option value="MnO2">Mangan đioxit [MnO₂] (Phân hủy H₂O₂)</option>
              </select>
            </div>

            {/* Trigger Simulate Button */}
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-obsidian font-black text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              {isSimulating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>ĐANG TÍNH TOÁN NHIỆT ĐỘNG HỌC...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-obsidian" />
                  <span>KÍCH HOẠT PHẢN ỨNG THỬ NGHIỆM</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Reaction Chamber & Thermodynamic Inspector (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Reaction Vessel / Visual Flask Canvas */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[280px]">
            {/* Ambient Background glow based on pH indicator */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(circle at center, ${indicatorData.hex} 0%, transparent 70%)`
              }}
            />

            {/* Visual Reaction Simulation Graphic */}
            <div className="relative z-10 flex flex-col items-center text-center gap-3">
              <div
                className="w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-2xl"
                style={{
                  borderColor: indicatorData.hex,
                  backgroundColor: `${indicatorData.hex}22`,
                  boxShadow: `0 0 30px ${indicatorData.glowHex}`
                }}
              >
                <FlaskConical className="w-12 h-12" style={{ color: indicatorData.hex }} />
              </div>

              {/* Status Header */}
              {result ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    {result.hasReacted ? (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-950 border border-emerald-500 text-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        PHẢN ỨNG THÀNH CÔNG
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-950 border border-amber-500 text-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        KHÔNG XẢY RA PHẢN ỨNG
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      pH: {result.resultingPh.toFixed(1)}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-white mt-1">{result.reactionName}</h2>
                  <div className="font-mono text-sm sm:text-base font-black px-4 py-1.5 rounded-lg bg-black/60 border border-cyan-500/40 text-cyan-300 shadow">
                    {result.balancedEquation}
                  </div>

                  {result.hasReacted && onExportToWorkshop && (
                    <button
                      onClick={() => {
                        sound.playCardSelect();
                        onExportToWorkshop({
                          equation: result.balancedEquation,
                          name: result.reactionName,
                          notes: result.observationVI,
                          reactants: [reactantA, reactantB]
                        });
                      }}
                      className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-obsidian font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 self-center sm:self-auto cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-obsidian" />
                      <span>Đúc Thẻ Bài Từ Phản Ứng Này (Chuyển Sang Xưởng Sáng Tạo)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-slate-400 text-xs">
                  Chọn cặp chất và nhấn <span className="text-cyan-300 font-bold">"Kích Hoạt Phản Ứng"</span> để quan sát biến thiên nhiệt động học.
                </div>
              )}
            </div>
          </div>

          {/* Detailed Scientific Data Cards */}
          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Thermodynamics (ΔH, Le Chatelier) */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2.5 shadow-md">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>Nhiệt Động Học & Cân Bằng (IUPAC)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400">Biến thiên Enthalpy (ΔᵣH°₂₉₈):</span>
                  <span className={`font-mono font-black text-sm ${result.isExothermic ? 'text-rose-400' : 'text-cyan-400'}`}>
                    {result.deltaH !== 0 ? `${result.deltaH.toFixed(1)} kJ/mol` : '0.0 kJ'}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400 font-medium">Phân loại nhiệt: </span>
                  <span className="font-bold">{result.reactionType}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                  <span className="text-amber-400 font-semibold block mb-0.5">Nguyên lý Le Chatelier:</span>
                  <p className="leading-relaxed">{result.leChatelierNote}</p>
                </div>
              </div>

              {/* Card 2: Experimental Observation & Microscopic Explanation */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2.5 shadow-md">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span>Hiện Tượng Quan Sát & Cơ Chế Vi Mô</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Hiện tượng thực nghiệm:</span>
                  <p className="leading-relaxed">{result.observationVI}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                  <span className="text-cyan-400 font-semibold block mb-0.5">Bản chất hóa học (GDPT 2018):</span>
                  <p className="leading-relaxed">{result.theoreticalExplanation}</p>
                </div>
              </div>

              {/* Card 3: Chemical Kinetics & Arrhenius Energy Diagram */}
              <div className="col-span-1 md:col-span-2 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span>ĐỘNG HÓA HỌC & GIẢN ĐỒ NĂNG LƯỢNG ARRHENIUS (GDPT 2018)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      v(T) = {vanTHoff.rateRatio} × v(25°C)
                    </span>
                    {isCatalystActive && catalystSpeedup && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Xúc tác {kineticsProfile?.catalystName} (Tốc độ: ~{catalystSpeedup.speedupFormatted}×)
                      </span>
                    )}
                  </div>
                </div>

                {/* SVG Reaction Coordinate Diagram */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 overflow-x-auto">
                  <svg
                    viewBox="0 0 520 180"
                    className="w-full h-44 select-none"
                    style={{ minWidth: '460px' }}
                  >
                    {/* Background grid lines */}
                    <line x1="40" y1="20" x2="40" y2="150" stroke="#334155" strokeWidth="1.5" />
                    <line x1="40" y1="150" x2="500" y2="150" stroke="#334155" strokeWidth="1.5" />

                    {/* Axis Labels */}
                    <text x="15" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">E (kJ)</text>
                    <text x="400" y="170" fill="#94a3b8" fontSize="10" fontWeight="bold">Tiến trình phản ứng →</text>

                    {/* Reactants Plateau (y = 100) */}
                    <line x1="40" y1="100" x2="110" y2="100" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                    <text x="45" y="92" fill="#38bdf8" fontSize="10" fontWeight="bold">Chất đầu (Reactants)</text>

                    {/* Products Plateau (exothermic: y = 125, endothermic: y = 75) */}
                    {result.isExothermic ? (
                      <>
                        <line x1="390" y1="125" x2="490" y2="125" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                        <text x="400" y="118" fill="#f43f5e" fontSize="10" fontWeight="bold">Sản phẩm (ΔH &lt; 0)</text>
                        {/* Enthalpy delta line */}
                        <line x1="440" y1="100" x2="440" y2="125" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                        <text x="446" y="115" fill="#f43f5e" fontSize="9" fontFamily="monospace">ΔH° = {result.deltaH.toFixed(1)} kJ</text>
                      </>
                    ) : (
                      <>
                        <line x1="390" y1="75" x2="490" y2="75" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
                        <text x="400" y="68" fill="#2dd4bf" fontSize="10" fontWeight="bold">Sản phẩm (ΔH &gt; 0)</text>
                        {/* Enthalpy delta line */}
                        <line x1="440" y1="100" x2="440" y2="75" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="3 3" />
                        <text x="446" y="90" fill="#2dd4bf" fontSize="9" fontFamily="monospace">ΔH° = +{result.deltaH.toFixed(1)} kJ</text>
                      </>
                    )}

                    {/* Uncatalyzed Reaction Path (Peak at y = 30) */}
                    <path
                      d={`M 110 100 C 180 100 180 30 250 30 C 320 30 320 ${result.isExothermic ? 125 : 75} 390 ${result.isExothermic ? 125 : 75}`}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2.5"
                    />
                    <circle cx="250" cy="30" r="4" fill="#f97316" />
                    <text x="220" y="22" fill="#fb923c" fontSize="10" fontWeight="bold">
                      Ea không xúc tác ({kineticsProfile?.eaUncatalyzed_kJ ?? 60} kJ)
                    </text>

                    {/* Catalyzed Reaction Path (if profile has catalyzed Ea) */}
                    {kineticsProfile?.eaCatalyzed_kJ && (
                      <>
                        <path
                          d={`M 110 100 C 180 100 180 62 250 62 C 320 62 320 ${result.isExothermic ? 125 : 75} 390 ${result.isExothermic ? 125 : 75}`}
                          fill="none"
                          stroke={isCatalystActive ? "#06b6d4" : "#475569"}
                          strokeWidth="2"
                          strokeDasharray={isCatalystActive ? "none" : "4 4"}
                        />
                        <circle cx="250" cy="62" r="3.5" fill={isCatalystActive ? "#06b6d4" : "#475569"} />
                        <text
                          x="220"
                          y="56"
                          fill={isCatalystActive ? "#22d3ee" : "#64748b"}
                          fontSize="9"
                          fontWeight={isCatalystActive ? "bold" : "normal"}
                        >
                          Ea có xúc tác ({kineticsProfile.eaCatalyzed_kJ} kJ){isCatalystActive ? " ★ Đang dùng" : ""}
                        </text>
                      </>
                    )}
                  </svg>
                </div>

                {/* Kinetics Metrics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs">
                    <span className="text-amber-400 font-semibold flex items-center gap-1 mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      Quy Tắc Van 't Hoff:
                    </span>
                    <p className="text-slate-300 leading-relaxed font-mono">
                      v({temperatureC}°C) / v(25°C) = {vanTHoffGamma}^(({temperatureC} - 25)/10) ={' '}
                      <span className="font-bold text-amber-300">{vanTHoff.rateRatio} lần</span>
                    </p>
                    <p className="text-slate-400 text-[11px] mt-1">
                      {temperatureC >= 25
                        ? `Nhiệt độ tăng ${temperatureC - 25}°C làm tăng tần số va chạm hiệu quả giữa các phân tử.`
                        : `Nhiệt độ hạ ${25 - temperatureC}°C làm giảm đáng kể tốc độ phản ứng.`}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1 mb-1">
                      <Zap className="w-3.5 h-3.5" />
                      Hạ Năng Lượng Hoạt Hóa (Ea):
                    </span>
                    {kineticsProfile ? (
                      <>
                        <div className="text-slate-300 font-mono">
                          Ea chuẩn:{' '}
                          <span className="font-bold text-rose-300">{kineticsProfile.eaUncatalyzed_kJ} kJ/mol</span>
                          {kineticsProfile.eaCatalyzed_kJ && (
                            <> → Có xúc tác: <span className="font-bold text-cyan-300">{kineticsProfile.eaCatalyzed_kJ} kJ/mol</span></>
                          )}
                        </div>
                        {isCatalystActive && catalystSpeedup ? (
                          <p className="text-emerald-400 font-semibold text-[11px] mt-1">
                            ✓ Xúc tác {kineticsProfile.catalystName} tăng tốc độ ~{catalystSpeedup.speedupFormatted} lần ở {tempK.toFixed(0)} K!
                          </p>
                        ) : kineticsProfile.catalystKey ? (
                          <p className="text-slate-400 text-[11px] mt-1">
                            Gợi ý: Chọn chất xúc tác "{kineticsProfile.catalystKey}" ở bảng điều khiển bên trái để kích hoạt hạ Ea.
                          </p>
                        ) : (
                          <p className="text-slate-400 text-[11px] mt-1">
                            Phản ứng này không cần xúc tác đặc hiệu.
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-slate-400">Chưa có hồ sơ năng lượng hoạt hóa đặc thù cho cặp chất này.</p>
                    )}
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs">
                    <span className="text-teal-400 font-semibold flex items-center gap-1 mb-1">
                      <Info className="w-3.5 h-3.5" />
                      Cơ Chế Vi Mô & Xúc Tác:
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {kineticsProfile
                        ? kineticsProfile.mechanismNoteVI
                        : 'Các chất tham gia va chạm với nhau theo định hướng không gian phù hợp và động năng lớn hơn hoặc bằng năng lượng hoạt hóa Ea để phá vỡ liên kết cũ tạo thành liên kết mới.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};
