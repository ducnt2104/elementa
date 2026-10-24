// src/components/resources/UnifiedResourcesModal.tsx
// Comprehensive Unified Knowledge & Resources Center (Cẩm Nang & Tài Nguyên Hóa Học)
// Merges: Cẩm Nang Phản Ứng + Thí Nghiệm Liên Kết + Máy Tính Hóa Học + Hướng Dẫn Luật Chơi + Nguồn Khoa Học Chuẩn

import React, { useState, useMemo } from 'react';
import { sound } from '../../audio/soundEngine';
import {
  BookOpen,
  Atom,
  Calculator,
  Compass,
  ExternalLink,
  Search,
  X,
  Sparkles,
  Flame,
  Droplets,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  ShieldCheck,
  TrendingUp,
  Layers,
  HelpCircle,
  Sword,
  BookMarked,
  FlaskConical
} from 'lucide-react';
import { VERIFIED_REDOX_DATABASE } from '../../domain/redoxEngine';
import { CANONICAL_BONDING_DATABASE, CanonicalBondingModel } from '../../domain/bondingEngine';
import { PlayerProfile } from '../../domain/types';
import { DailySrsTab } from '../DailySrsTab';
import { BondingVisualizerModal } from '../visualizations/BondingVisualizerModal';
import { apiClient } from '../../services/apiClient';
import { Maximize2 } from 'lucide-react';

export type UnifiedResourceTab = 'REACTIONS' | 'BONDING' | 'CALCULATOR' | 'RULES' | 'REFERENCES' | 'SRS';

interface UnifiedResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: UnifiedResourceTab;
  profile?: PlayerProfile;
  onUpdateProfile?: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

interface ReactionEntry {
  id: string;
  part: 'PHAN_I' | 'PHAN_II' | 'PHAN_III' | 'PHAN_IV' | 'PHAN_V' | 'PHAN_VI';
  categoryTitle: string;
  title: string;
  equation: string;
  conditions: string;
  phenomenaAndRules: string;
  tags: string[];
}

const COMPENDIUM_REACTIONS: ReactionEntry[] = [
  // PHẦN I
  {
    id: 'c_01',
    part: 'PHAN_I',
    categoryTitle: 'Hóa Hợp & Phân Hủy',
    title: 'Đốt Sắt trong Khí Oxy',
    equation: '3Fe + 2O₂ → Fe₃O₄',
    conditions: 't° cao; bắn tia lửa sáng chói',
    phenomenaAndRules: 'Tạo oxit sắt từ Fe₃O₄ (chứa cả Fe(II) và Fe(III)) màu đen xám.',
    tags: ['Fe', 'O2', 'Oxit', 'Vô cơ']
  },
  {
    id: 'c_02',
    part: 'PHAN_I',
    categoryTitle: 'Hóa Hợp & Phân Hủy',
    title: 'Hóa Hợp Vôi Sống với Nước',
    equation: 'CaO + H₂O → Ca(OH)₂',
    conditions: 'Nhiệt độ phòng; phản ứng tỏa nhiệt dữ dội',
    phenomenaAndRules: 'Hiện tượng tôi vôi: nước sôi sùng sục, vôi sống nở ra tạo huyền phù canxi hydroxit vôi tôi.',
    tags: ['CaO', 'H2O', 'Bazo']
  },
  {
    id: 'c_03',
    part: 'PHAN_I',
    categoryTitle: 'Hóa Hợp & Phân Hủy',
    title: 'Nhiệt Phân Đá Vôi',
    equation: 'CaCO₃ → CaO + CO₂↑',
    conditions: 't° ~ 900 - 1000°C',
    phenomenaAndRules: 'Sản xuất vôi sống công nghiệp; khí CO₂ thoát ra làm đục nước vôi trong.',
    tags: ['CaCO3', 'Nhiệt phân', 'CO2']
  },
  {
    id: 'c_04',
    part: 'PHAN_I',
    categoryTitle: 'Hóa Hợp & Phân Hủy',
    title: 'Nhiệt Phân Thuốc Tím',
    equation: '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑',
    conditions: 't° nhẹ (đèn cồn)',
    phenomenaAndRules: 'Điều chế oxi trong phòng thí nghiệm; tàn đóm đỏ bùng cháy sáng khi đưa vào miệng ống nghiệm.',
    tags: ['KMnO4', 'Điều chế O2']
  },
  // PHẦN II
  {
    id: 'c_05',
    part: 'PHAN_II',
    categoryTitle: 'Thế & Dãy Hoạt Động Hóa Học',
    title: 'Sắt Đẩy Đồng Khỏi Muối Sunfat',
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
    conditions: 'Dung dịch nhiệt độ thường',
    phenomenaAndRules: 'Dung dịch xanh lam nhạt dần thành xanh lục nhạt; kim loại đồng màu đỏ bám ngoài đinh sắt.',
    tags: ['Fe', 'CuSO4', 'Kim loại']
  },
  {
    id: 'c_06',
    part: 'PHAN_II',
    categoryTitle: 'Thế & Dãy Hoạt Động Hóa Học',
    title: 'Kẽm Tác Dụng Axit Clohidric',
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    conditions: 'Nhiệt độ thường',
    phenomenaAndRules: 'Viên kẽm tan dần, bọt khí H₂ không màu sủi mạnh trên bề mặt.',
    tags: ['Zn', 'HCl', 'Axit']
  },
  {
    id: 'c_07',
    part: 'PHAN_II',
    categoryTitle: 'Thế & Dãy Hoạt Động Hóa Học',
    title: 'Bẫy Nhận Thức: Đồng và Axit HCl Loãng',
    equation: 'Cu + HCl (loãng) → KHÔNG PHẢN ỨNG',
    conditions: 'Mọi điều kiện nhiệt độ thường',
    phenomenaAndRules: 'Cu đứng sau H trong dãy hoạt động hóa học kim loại, không đẩy được H⁺ giải phóng H₂.',
    tags: ['Bẫy nhận thức', 'Cu', 'HCl']
  },
  // PHẦN III
  {
    id: 'c_08',
    part: 'PHAN_III',
    categoryTitle: 'Trao Đổi Ion & Kết Tủa',
    title: 'Nhận Biết Ion Sunfat bằng Muối Bari',
    equation: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',
    conditions: 'Dung dịch trong nước',
    phenomenaAndRules: 'Xuất hiện kết tủa trắng tinh khiết BaSO₄ không tan trong cả axit mạnh dư.',
    tags: ['BaCl2', 'Na2SO4', 'Kết tủa']
  },
  {
    id: 'c_09',
    part: 'PHAN_III',
    categoryTitle: 'Trao Đổi Ion & Kết Tủa',
    title: 'Nhận Biết Ion Clorua bằng Bạc Nitrat',
    equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    conditions: 'Dung dịch trong nước',
    phenomenaAndRules: 'Kết tủa trắng AgCl vón cục nhanh chóng; để ngoài ánh sáng chuyển dần sang xám đen.',
    tags: ['AgNO3', 'NaCl', 'Kết tủa']
  },
  {
    id: 'c_10',
    part: 'PHAN_III',
    categoryTitle: 'Trao Đổi Ion & Kết Tủa',
    title: 'Phản Ứng Trung Hòa Axit - Bazơ',
    equation: 'HCl + NaOH → NaCl + H₂O',
    conditions: 'Nhiệt độ phòng; dung dịch',
    phenomenaAndRules: 'Dung dịch phenolphtalein mất màu hồng chuyển sang không màu; tỏa nhiệt nhẹ; pH trở về 7.',
    tags: ['HCl', 'NaOH', 'Trung hòa']
  },
  // PHẦN IV
  {
    id: 'c_11',
    part: 'PHAN_IV',
    categoryTitle: 'Oxi Hóa - Khử Đột Phá',
    title: 'Nhiệt Nhôm Khử Oxit Sắt',
    equation: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe',
    conditions: 'Mồi cháy bằng dây Mg và hỗn hợp KClO₃; t° > 2000°C',
    phenomenaAndRules: 'Phản ứng nổ sáng chói lọi, tỏa nhiệt khủng khiếp sinh sắt nóng chảy dùng hàn đường ray.',
    tags: ['Al', 'Fe2O3', 'Nhiệt nhôm']
  },
  {
    id: 'c_12',
    part: 'PHAN_IV',
    categoryTitle: 'Oxi Hóa - Khử Đột Phá',
    title: 'Khí Clo Tác Dụng với Nước',
    equation: 'Cl₂ + H₂O ⇌ HCl + HClO',
    conditions: 'Nhiệt độ thường, phản ứng thuận nghịch',
    phenomenaAndRules: 'Tạo nước clo màu vàng lục nhạt, có mùi hắc đặc trưng; có tính tẩy màu do axit hipoclorơ (HClO).',
    tags: ['Cl2', 'H2O', 'Khử trùng']
  },
  // PHẦN V
  {
    id: 'c_13',
    part: 'PHAN_V',
    categoryTitle: 'Hóa Học Hữu Cơ GDPT 2018',
    title: 'Lên Men Rượu từ Glucozơ',
    equation: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑',
    conditions: 'Men rượu, 30 - 32°C',
    phenomenaAndRules: 'Sủi bọt khí CO₂ liên tục; dung dịch xuất hiện mùi cồn nồng ấm đặc trưng.',
    tags: ['Lên men', 'Hữu cơ', 'Glucozo']
  },
  {
    id: 'c_14',
    part: 'PHAN_V',
    categoryTitle: 'Hóa Học Hữu Cơ GDPT 2018',
    title: 'Phản Ứng Xà Phòng Hóa Chất Béo',
    equation: '(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃',
    conditions: 't° sôi, khuấy đều',
    phenomenaAndRules: 'Hỗn hợp đồng nhất tạo xà phòng natri stearat và glixerol, dùng sản xuất xà phòng bánh.',
    tags: ['Chất béo', 'Xà phòng']
  },
  // PHẦN VI
  {
    id: 'c_15',
    part: 'PHAN_VI',
    categoryTitle: 'Phản Ứng Ăn Mòn Điện Hóa',
    title: 'Gỉ Sắt trong Không Khí Ẩm',
    equation: '4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O',
    conditions: 'Độ ẩm không khí, oxy, nhiệt độ môi trường',
    phenomenaAndRules: 'Lớp gỉ màu nâu đỏ, xốp, không bảo vệ được kim loại bên trong khiến sắt bị ăn mòn liên tục.',
    tags: ['Gỉ sắt', 'Ăn mòn', 'Fe']
  }
];

export const UnifiedResourcesModal: React.FC<UnifiedResourcesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'REACTIONS',
  profile,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<UnifiedResourceTab>(initialTab);

  // Sub-state for Reactions tab
  const [reactionSearch, setReactionSearch] = useState('');
  const [reactionPartFilter, setReactionPartFilter] = useState<string>('ALL');

  // Sub-state for Bonding tab
  const [selectedBondId, setSelectedBondId] = useState<string>('bond_h2o');
  const [bondingSubTab, setBondingSubTab] = useState<'VISUAL' | 'VSEPR' | 'THEORY'>('VISUAL');
  const [showDedicatedBondingModal, setShowDedicatedBondingModal] = useState<boolean>(false);

  // Sub-state for Calculator tab
  const [soluteMass, setSoluteMass] = useState<number>(5.85); // g NaCl
  const [molarMass, setMolarMass] = useState<number>(58.5); // g/mol
  const [solutionVolume, setSolutionVolume] = useState<number>(500); // mL
  const [acidHPlus, setAcidHPlus] = useState<number>(0.01); // M

  // Nernst Equation State (Pin Điện Hóa)
  const [e0Cell, setE0Cell] = useState<number>(1.10); // Daniell Cell Zn-Cu
  const [electronCount, setElectronCount] = useState<number>(2); // n
  const [reactionQuotientQ, setReactionQuotientQ] = useState<number>(0.01); // [Zn2+]/[Cu2+]

  // Henderson-Hasselbalch Buffer State (Dung Dịch Đệm)
  const [pKa, setPKa] = useState<number>(4.76); // CH3COOH
  const [concAcid, setConcAcid] = useState<number>(0.1); // [HA]
  const [concConjugateBase, setConcConjugateBase] = useState<number>(0.1); // [A-]

  // Sync initial tab when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const filteredReactions = useMemo(() => {
    return COMPENDIUM_REACTIONS.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(reactionSearch.toLowerCase()) ||
        r.equation.toLowerCase().includes(reactionSearch.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(reactionSearch.toLowerCase()));
      const matchesPart = reactionPartFilter === 'ALL' || r.part === reactionPartFilter;
      return matchesSearch && matchesPart;
    });
  }, [reactionSearch, reactionPartFilter]);

  const currentBond: CanonicalBondingModel =
    CANONICAL_BONDING_DATABASE.find((b) => b.id === selectedBondId) || CANONICAL_BONDING_DATABASE[0];

  // Calculator outputs
  const calculatedMolarity = useMemo(() => {
    if (solutionVolume <= 0 || molarMass <= 0) return 0;
    const moles = soluteMass / molarMass;
    return moles / (solutionVolume / 1000);
  }, [soluteMass, molarMass, solutionVolume]);

  const calculatedPH = useMemo(() => {
    if (acidHPlus <= 0) return 7;
    return -Math.log10(acidHPlus);
  }, [acidHPlus]);

  const calculatedNernstE = useMemo(() => {
    if (electronCount <= 0 || reactionQuotientQ <= 0) return e0Cell;
    return e0Cell - (0.0592 / electronCount) * Math.log10(reactionQuotientQ);
  }, [e0Cell, electronCount, reactionQuotientQ]);

  const calculatedBufferPH = useMemo(() => {
    if (concAcid <= 0 || concConjugateBase <= 0) return pKa;
    return pKa + Math.log10(concConjugateBase / concAcid);
  }, [pKa, concAcid, concConjugateBase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-navy/95 border border-cyan-ion/40 rounded-2xl shadow-2xl overflow-hidden text-ivory">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-navy-light/60 bg-obsidian/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-ion via-navy to-coral-reaction p-0.5 shadow-md shadow-cyan-ion/30">
              <div className="w-full h-full bg-obsidian rounded-[10px] flex items-center justify-center text-cyan-ion">
                <BookMarked className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-black text-base sm:text-lg text-ivory tracking-wide">
                  CẨM NANG & TÀI NGUYÊN HÓA HỌC
                </h2>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 font-bold">
                  Hợp Nhất
                </span>
              </div>
              <p className="text-xs text-ivory-muted hidden sm:block">
                Tra cứu phản ứng, cấu trúc phân tử VSEPR, tính toán dung dịch & chuẩn GDPT 2018
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playUiClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-navy hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light/60 transition-all"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-navy-light/50 bg-navy/90 overflow-x-auto shrink-0 select-none">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('REACTIONS');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'REACTIONS'
                ? 'bg-amber-500 text-obsidian shadow-sm shadow-amber-500/30'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Cẩm Nang Phản Ứng</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('BONDING');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'BONDING'
                ? 'bg-cyan-ion text-obsidian shadow-sm shadow-cyan-ion/30'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/50'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>2. Thí Nghiệm Liên Kết & VSEPR</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CALCULATOR');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'CALCULATOR'
                ? 'bg-teal-400 text-obsidian shadow-sm shadow-teal-400/30'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/50'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>3. Máy Tính Dung Dịch & pH</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('RULES');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'RULES'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/50'
            }`}
          >
            <Sword className="w-3.5 h-3.5" />
            <span>4. Quy Tắc TCG & MOBA</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('REFERENCES');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'REFERENCES'
                ? 'bg-purple-500 text-white shadow-sm shadow-purple-500/30'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>5. Tài Liệu IUPAC & GDPT 2018</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('SRS');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'SRS'
                ? 'bg-emerald-500 text-obsidian shadow-sm shadow-emerald-500/30'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>6. Thẻ Ghi Nhớ Ôn Tập (CA-SRS)</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-obsidian/40">
          {/* TAB 1: REACTIONS COMPENDIUM */}
          {activeTab === 'REACTIONS' && (
            <div className="space-y-4">
              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={reactionSearch}
                    onChange={(e) => setReactionSearch(e.target.value)}
                    placeholder="Tìm theo chất tham gia, sản phẩm (Fe, HCl, BaSO4, O2...)"
                    className="w-full bg-navy border border-navy-light/80 rounded-xl pl-9 pr-4 py-2 text-xs text-ivory placeholder-ivory-muted/60 focus:border-cyan-ion focus:outline-none transition-all"
                  />
                  {reactionSearch && (
                    <button
                      onClick={() => setReactionSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-ivory"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 overflow-x-auto text-xs shrink-0">
                  {['ALL', 'PHAN_I', 'PHAN_II', 'PHAN_III', 'PHAN_IV', 'PHAN_V', 'PHAN_VI'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setReactionPartFilter(p)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all ${
                        reactionPartFilter === p
                          ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 font-bold'
                          : 'bg-navy text-ivory-muted hover:text-ivory border border-navy-light/40'
                      }`}
                    >
                      {p === 'ALL' ? 'Tất Cả' : p.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reaction Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredReactions.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-navy/70 border border-navy-light/60 hover:border-amber-400/50 transition-all flex flex-col justify-between gap-2.5 shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-amber-400 font-bold">{item.categoryTitle}</span>
                        <span className="px-1.5 py-0.5 rounded bg-obsidian border border-navy-light/60 text-ivory-muted text-[10px]">
                          {item.part}
                        </span>
                      </div>
                      <h4 className="font-serif font-black text-sm text-ivory mt-1">{item.title}</h4>
                      <div className="mt-2 p-2 rounded-lg bg-obsidian/80 border border-navy-light font-mono text-xs text-cyan-ion font-bold tracking-wide">
                        {item.equation}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-ivory-muted border-t border-navy-light/30 pt-2">
                      <div className="flex items-start gap-1.5 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-ivory">Điều kiện:</strong> {item.conditions}
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[11px]">
                        <Beaker className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-ivory">Hiện tượng:</strong> {item.phenomenaAndRules}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded bg-navy-light/40 text-slate-300 text-[10px] font-mono"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BONDING & VSEPR LAB */}
          {activeTab === 'BONDING' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-navy/80 border border-cyan-ion/30">
                <div className="flex items-center gap-2">
                  <Atom className="w-5 h-5 text-cyan-ion" />
                  <span className="text-xs font-semibold text-ivory">Chọn Phân Tử Thử Nghiệm:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setShowDedicatedBondingModal(true);
                    }}
                    className="ml-2 px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-ion/50 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1 shadow-sm transition-all"
                    title="Mở toàn màn hình VSEPR 3D"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-ion" />
                    Phóng To VSEPR 3D
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CANONICAL_BONDING_DATABASE.map((bond) => (
                    <button
                      key={bond.id}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedBondId(bond.id);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedBondId === bond.id
                          ? 'bg-cyan-ion text-obsidian shadow-sm'
                          : 'bg-obsidian/70 text-ivory-muted hover:text-ivory border border-navy-light'
                      }`}
                    >
                      {bond.formula}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonding Details Presentation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 p-5 rounded-xl bg-navy/60 border border-navy-light/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-black text-xl text-ivory">{currentBond.name_vi}</h3>
                      <p className="text-xs font-mono text-cyan-ion mt-0.5">{currentBond.formula} ({currentBond.name_iupac})</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-ion/10 border border-cyan-ion/30 text-cyan-ion text-xs font-mono font-bold">
                      {currentBond.bondType === 'POLAR_COVALENT'
                        ? 'Cộng hóa trị phân cực'
                        : currentBond.bondType === 'NONPOLAR_COVALENT'
                        ? 'Cộng hóa trị không phân cực'
                        : 'Liên kết ion'}
                    </span>
                  </div>

                  <p className="text-xs text-ivory-muted leading-relaxed">
                    {currentBond.descriptionVI}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    <div className="p-2.5 rounded-lg bg-obsidian/60 border border-navy-light text-center">
                      <div className="text-[10px] text-ivory-muted font-mono">Hiệu độ âm điện Δχ</div>
                      <div className="text-base font-black text-amber-400 font-mono mt-0.5">
                        {currentBond.deltaChi.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-obsidian/60 border border-navy-light text-center">
                      <div className="text-[10px] text-ivory-muted font-mono">Hình học VSEPR</div>
                      <div className="text-xs font-bold text-cyan-ion mt-1">
                        {currentBond.geometryVI || 'Thẳng'}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-obsidian/60 border border-navy-light text-center">
                      <div className="text-[10px] text-ivory-muted font-mono">Góc liên kết</div>
                      <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                        {currentBond.vsepr?.bondAngle || '180°'}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-obsidian/60 border border-navy-light text-center">
                      <div className="text-[10px] text-ivory-muted font-mono">Phân cực phân tử</div>
                      <div className="text-xs font-bold text-rose-300 mt-1">
                        {currentBond.vsepr?.dipoleMomentNet || 'Không cực'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-navy via-navy-dark to-obsidian border border-navy-light/60 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-ivory flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Ý Nghĩa Chiến Thuật Trong Game</span>
                    </h4>
                    <p className="text-xs text-ivory-muted mt-2 leading-relaxed">
                      Trong ELEMENTA TCG, phân tử này đại diện cho một Thẻ Hợp Chất / Fusion Monster hoặc Thẻ Môi Trường có khả năng kháng hiệu ứng dựa trên độ bền liên kết nội tại.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-obsidian/80 border border-navy-light text-xs font-mono space-y-1">
                    <div className="text-cyan-ion font-bold">Thang Pauling:</div>
                    <div className="text-ivory-muted text-[11px]">• Δχ &lt; 0.4: Không phân cực</div>
                    <div className="text-ivory-muted text-[11px]">• 0.4 ≤ Δχ &lt; 1.7: Phân cực</div>
                    <div className="text-ivory-muted text-[11px]">• Δχ ≥ 1.7: Liên kết Ion</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CALCULATOR */}
          {activeTab === 'CALCULATOR' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Molarity Calculator */}
                <div className="p-5 rounded-xl bg-navy/70 border border-navy-light/60 space-y-4">
                  <div className="flex items-center gap-2 border-b border-navy-light/40 pb-2.5">
                    <Beaker className="w-5 h-5 text-teal-400" />
                    <h3 className="font-serif font-black text-sm text-ivory">
                      Tính Nồng Độ Mol Dung Dịch (C_M = n / V)
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-ivory-muted block mb-1">Khối lượng chất tan m (gam):</label>
                      <input
                        type="number"
                        value={soluteMass}
                        onChange={(e) => setSoluteMass(parseFloat(e.target.value) || 0)}
                        className="w-full bg-obsidian border border-navy-light rounded-lg px-3 py-1.5 text-ivory font-mono focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-ivory-muted block mb-1">Khối lượng mol phân tử M (g/mol):</label>
                      <input
                        type="number"
                        value={molarMass}
                        onChange={(e) => setMolarMass(parseFloat(e.target.value) || 1)}
                        className="w-full bg-obsidian border border-navy-light rounded-lg px-3 py-1.5 text-ivory font-mono focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-ivory-muted block mb-1">Thể tích dung dịch V (mL):</label>
                      <input
                        type="number"
                        value={solutionVolume}
                        onChange={(e) => setSolutionVolume(parseFloat(e.target.value) || 1)}
                        className="w-full bg-obsidian border border-navy-light rounded-lg px-3 py-1.5 text-ivory font-mono focus:border-teal-400 focus:outline-none"
                      />
                    </div>

                    <div className="p-3.5 rounded-lg bg-teal-950/40 border border-teal-500/30 text-center">
                      <span className="text-[11px] text-ivory-muted font-mono block">Nồng Độ Mol Tính Được:</span>
                      <span className="text-2xl font-black text-teal-300 font-mono">
                        {calculatedMolarity.toFixed(4)} M
                      </span>
                    </div>
                  </div>
                </div>

                {/* pH Calculator */}
                <div className="p-5 rounded-xl bg-navy/70 border border-navy-light/60 space-y-4">
                  <div className="flex items-center gap-2 border-b border-navy-light/40 pb-2.5">
                    <Droplets className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-serif font-black text-sm text-ivory">
                      Tính pH Dung Dịch Axit / Bazơ (pH = -log[H⁺])
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-ivory-muted block mb-1">Nồng độ ion [H⁺] (mol/L):</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={acidHPlus}
                        onChange={(e) => setAcidHPlus(parseFloat(e.target.value) || 0.0001)}
                        className="w-full bg-obsidian border border-navy-light rounded-lg px-3 py-1.5 text-ivory font-mono focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-center">
                      <span className="text-[11px] text-ivory-muted font-mono block">Chỉ số pH Tương Ứng:</span>
                      <span className="text-2xl font-black text-cyan-300 font-mono">
                        {calculatedPH.toFixed(2)}
                      </span>
                      <div className="text-xs text-ivory-muted mt-1">
                        {calculatedPH < 7 ? (
                          <span className="text-coral-reaction font-bold">Môi trường Axit (pH &lt; 7)</span>
                        ) : calculatedPH === 7 ? (
                          <span className="text-emerald-400 font-bold">Môi trường Trung tính (pH = 7)</span>
                        ) : (
                          <span className="text-cyan-400 font-bold">Môi trường Kiềm / Bazơ (pH &gt; 7)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nernst Equation Electrochemical Calculator */}
                <div className="p-5 rounded-xl bg-navy/70 border border-navy-light/60 space-y-4">
                  <div className="flex items-center gap-2 border-b border-navy-light/40 pb-2.5">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h3 className="font-serif font-black text-sm text-ivory">
                      Phương Trình Nernst — Thế Pin Điện Hóa (E_pin)
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-ivory-muted block mb-1">E° pin (V):</label>
                        <input
                          type="number"
                          step="0.01"
                          value={e0Cell}
                          onChange={(e) => setE0Cell(parseFloat(e.target.value) || 0)}
                          className="w-full bg-obsidian border border-navy-light rounded-lg px-2.5 py-1.5 text-ivory font-mono focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-ivory-muted block mb-1">Số e trao đổi n:</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={electronCount}
                          onChange={(e) => setElectronCount(parseInt(e.target.value) || 1)}
                          className="w-full bg-obsidian border border-navy-light rounded-lg px-2.5 py-1.5 text-ivory font-mono focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-ivory-muted block mb-1">Thương số Q:</label>
                        <input
                          type="number"
                          step="0.001"
                          value={reactionQuotientQ}
                          onChange={(e) => setReactionQuotientQ(parseFloat(e.target.value) || 0.001)}
                          className="w-full bg-obsidian border border-navy-light rounded-lg px-2.5 py-1.5 text-ivory font-mono focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-center">
                      <span className="text-[11px] text-ivory-muted font-mono block">Sức Điện Động Thực Tế E_pin:</span>
                      <span className="text-2xl font-black text-amber-300 font-mono">
                        {calculatedNernstE.toFixed(4)} V
                      </span>
                      <div className="text-xs text-ivory-muted mt-1">
                        {calculatedNernstE > 0 ? (
                          <span className="text-emerald-400 font-bold">Phản ứng tự diễn biến phát điện (ΔG &lt; 0)</span>
                        ) : calculatedNernstE === 0 ? (
                          <span className="text-amber-400 font-bold">Pin đạt trạng thái cân bằng (Hết điện)</span>
                        ) : (
                          <span className="text-coral-reaction font-bold">Cần đặt thế điện phân bên ngoài</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Henderson-Hasselbalch Buffer Calculator */}
                <div className="p-5 rounded-xl bg-navy/70 border border-navy-light/60 space-y-4">
                  <div className="flex items-center gap-2 border-b border-navy-light/40 pb-2.5">
                    <FlaskConical className="w-5 h-5 text-purple-400" />
                    <h3 className="font-serif font-black text-sm text-ivory">
                      Dung Dịch Đệm — Henderson-Hasselbalch
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-ivory-muted block mb-1">Hằng số pKa:</label>
                        <input
                          type="number"
                          step="0.01"
                          value={pKa}
                          onChange={(e) => setPKa(parseFloat(e.target.value) || 0)}
                          className="w-full bg-obsidian border border-navy-light rounded-lg px-2.5 py-1.5 text-ivory font-mono focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-ivory-muted block mb-1">[HA] Axit (M):</label>
                        <input
                          type="number"
                          step="0.01"
                          value={concAcid}
                          onChange={(e) => setConcAcid(parseFloat(e.target.value) || 0.01)}
                          className="w-full bg-obsidian border border-navy-light rounded-lg px-2.5 py-1.5 text-ivory font-mono focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-ivory-muted block mb-1">[A⁻] Muối (M):</label>
                        <input
                          type="number"
                          step="0.01"
                          value={concConjugateBase}
                          onChange={(e) => setConcConjugateBase(parseFloat(e.target.value) || 0.01)}
                          className="w-full bg-obsidian border border-navy-light rounded-lg px-2.5 py-1.5 text-ivory font-mono focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-center">
                      <span className="text-[11px] text-ivory-muted font-mono block">Chỉ Số pH Dung Dịch Đệm:</span>
                      <span className="text-2xl font-black text-purple-300 font-mono">
                        {calculatedBufferPH.toFixed(2)}
                      </span>
                      <div className="text-xs text-ivory-muted mt-1">
                        Dung lượng đệm: [A⁻]/[HA] = {(concConjugateBase / concAcid).toFixed(2)} (Kháng sốc pH tối ưu)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GAME RULES */}
          {activeTab === 'RULES' && (
            <div className="space-y-6 text-xs text-ivory-muted">
              <div className="p-4 rounded-xl bg-navy/60 border border-navy-light space-y-2">
                <h3 className="font-serif font-bold text-base text-ivory flex items-center gap-2">
                  <Sword className="w-4 h-4 text-amber-400" />
                  <span>Quy Tắc Đấu Bài Chiến Thuật TCG (8000 LP)</span>
                </h3>
                <p className="leading-relaxed">
                  Trận đấu tuân theo thể thức Yu-Gi-Oh! Master Rule 2020 kết hợp tri thức Hóa học GDPT 2018:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light">
                    <strong className="text-amber-400 block mb-1">Cấu Trúc Lượt:</strong>
                    Draw Phase → Standby Phase → Main Phase 1 → Battle Phase → Main Phase 2 → End Phase.
                  </div>
                  <div className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light">
                    <strong className="text-cyan-400 block mb-1">Chuỗi Phản Ứng Chain:</strong>
                    Tốc độ Speed 1 (Phép thường, Quái), Speed 2 (Phép nhanh, Bẫy), Speed 3 (Bẫy phản công cân bằng).
                  </div>
                  <div className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light">
                    <strong className="text-emerald-400 block mb-1">Combo Hóa Học Thật:</strong>
                    Tung Na + H2O tạo Nổ nhiệt kiềm; tung Fe + O2 + t° tạo Fe3O4; ghép Cu + HCl loãng bị phạt Mana!
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy/60 border border-navy-light space-y-2">
                <h3 className="font-serif font-bold text-base text-ivory flex items-center gap-2">
                  <Flame className="w-4 h-4 text-cyan-400" />
                  <span>Quy Tắc Đấu Trường MOBA 60 FPS</span>
                </h3>
                <p className="leading-relaxed">
                  Đấu trường Khe Nứt Tuần Hoàn thời gian thực với điều khiển bàn phím WASD / Chuột:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light">
                    <strong className="text-cyan-ion block mb-1">Điều Khiển:</strong>
                    Phím WASD / Chuột di chuyển, phím Q/W/E kích hoạt kỹ năng, phím R thi triển Tuyệt kỹ Nguyên tố.
                  </div>
                  <div className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light">
                    <strong className="text-rose-400 block mb-1">Mục Tiêu Trận Đấu:</strong>
                    Đẩy lính, hạ gục Trụ phòng thủ nguyên tố đối phương và phá hủy Nhà chính Base đối thủ để chiến thắng.
                  </div>
                  <div className="p-2.5 rounded-lg bg-obsidian/70 border border-navy-light">
                    <strong className="text-teal-400 block mb-1">Tương Tác Nguyên Tố:</strong>
                    Kỹ năng axit làm mềm giáp kim loại, kỹ năng nước dập lửa và kích hoạt bùng nổ kim loại kiềm.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REFERENCES */}
          {activeTab === 'REFERENCES' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-2">
                <h3 className="font-serif font-bold text-sm text-ivory flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-400" />
                  <span>Danh Mục Nguồn Tài Liệu Khoa Học Chuẩn Hóa</span>
                </h3>
                <p className="text-ivory-muted leading-relaxed">
                  Toàn bộ hằng số hóa lý, độ âm điện Pauling, năng lượng ion hóa thứ nhất và danh pháp quốc tế trong ELEMENTA đều được trích xuất và đối chiếu từ các nguồn sơ cấp uy tín:
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    title: 'IUPAC Periodic Table of the Elements & Atomic Weights (CIAAW)',
                    source: 'International Union of Pure and Applied Chemistry',
                    url: 'https://iupac.org/what-we-do/periodic-table-of-elements/',
                    desc: 'Cơ sở dữ liệu nguyên tử khối, số hiệu Z và danh pháp IUPAC chính thức.'
                  },
                  {
                    title: 'PubChem Periodic Table: Electronegativity & Ionization Energy',
                    source: 'National Institutes of Health (NIH / NCBI)',
                    url: 'https://pubchem.ncbi.nlm.nih.gov/ptable/',
                    desc: 'Dữ liệu độ âm điện Pauling (0.79 - 3.98) và năng lượng ion hóa thứ nhất I1 (375.7 - 2372.3 kJ/mol).'
                  },
                  {
                    title: 'Chương Trình GDPT 2018 Môn Khoa Học Tự Nhiên & Hóa Học',
                    source: 'Bộ Giáo dục và Đào tạo (Thông tư 32/2018/TT-BGDĐT)',
                    url: 'https://luatvietnam.vn/giao-duc/thong-tu-32-2018-tt-bgddt-ban-hanh-chuong-trinh-giao-duc-pho-thong-moi-169745-d1.html',
                    desc: 'Mạch kiến thức nguyên tố, bảng tuần hoàn, phản ứng hóa học từ lớp 7 đến lớp 10.'
                  },
                  {
                    title: 'Research on Intrinsic Integration in Educational Games (Habgood & Ainsworth)',
                    source: 'Journal of the Learning Sciences, 20(2), 169–206',
                    url: 'https://www.tandfonline.com/doi/abs/10.1080/10508406.2010.508029',
                    desc: 'Cơ sở lý thuyết tích hợp nội tại tri thức vào cơ chế cốt lõi trò chơi.'
                  }
                ].map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/50 flex items-center justify-between gap-3 hover:border-cyan-ion/40 transition-all"
                  >
                    <div>
                      <h4 className="font-semibold text-ivory text-xs">{ref.title}</h4>
                      <div className="text-[11px] text-cyan-ion font-mono mt-0.5">{ref.source}</div>
                      <p className="text-[11px] text-ivory-muted mt-1">{ref.desc}</p>
                    </div>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-navy hover:bg-navy-light text-cyan-ion border border-cyan-ion/30 transition-all shrink-0"
                      title="Mở liên kết tham khảo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CA-SRS FLASHCARD REVIEW & DIAGNOSTIC */}
          {activeTab === 'SRS' && profile && (
            <div className="space-y-4">
              <DailySrsTab
                profile={profile}
                onUpdateSrsItems={(newItems, xpEarned) => {
                  if (onUpdateProfile) {
                    onUpdateProfile((prev) => ({
                      ...prev,
                      srsItems: newItems,
                      xp: prev.xp + (xpEarned || 0),
                      stats: {
                        ...prev.stats,
                        srsReviewsCompleted: (prev.stats?.srsReviewsCompleted || 0) + 1
                      }
                    }));
                  }
                  // Seamlessly sync progression with authoritative online backend if connected
                  if (apiClient.getToken()) {
                    apiClient.syncProgression(xpEarned || 0).catch(() => {});
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen VSEPR 3D Chemical Bonding Modal */}
      <BondingVisualizerModal
        isOpen={showDedicatedBondingModal}
        onClose={() => setShowDedicatedBondingModal(false)}
      />
    </div>
  );
};
