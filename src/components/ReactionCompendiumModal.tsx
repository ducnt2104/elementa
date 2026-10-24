// src/components/ReactionCompendiumModal.tsx
// Comprehensive Chemical Reactions Compendium (Cẩm Nang Toàn Tập Phản Ứng Hóa Học)
// Integrates Parts I - VI with Instant Search, Categorization, and Formula Renderer

import React, { useState, useMemo } from 'react';
import { sound } from '../audio/soundEngine';
import {
  BookOpen,
  Search,
  X,
  Layers,
  Sparkles,
  Flame,
  Droplets,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  Filter,
  ArrowRight
} from 'lucide-react';
import { VERIFIED_REDOX_DATABASE, RedoxAnalysisResult } from '../domain/redoxEngine';

interface ReactionCompendiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReactionEntry {
  id: string;
  part: 'PHAN_I' | 'PHAN_II' | 'PHAN_III' | 'PHAN_IV' | 'PHAN_V' | 'PHAN_VI' | 'PHAN_REDOX';
  categoryTitle: string;
  title: string;
  equation: string;
  conditions: string;
  phenomenaAndRules: string;
  tags: string[];
  redoxData?: RedoxAnalysisResult;
}

const BASE_COMPENDIUM_REACTIONS: ReactionEntry[] = [
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
    tags: ['CaO', 'H2O', 'Bazơ', 'Tỏa nhiệt']
  },
  {
    id: 'c_03',
    part: 'PHAN_I',
    categoryTitle: 'Nhiệt Phân Muối Nitrat',
    title: 'Nhiệt Phân Muối Đồng(II) Nitrat',
    equation: '2Cu(NO₃)₂ → 2CuO + 4NO₂↑ + O₂↑',
    conditions: 't° cao đến khối lượng không đổi',
    phenomenaAndRules: 'Kim loại từ Mg đến Cu tạo oxit kim loại + khí NO₂ nâu đỏ mùi xốc + khí O₂.',
    tags: ['Cu(NO3)2', 'NO2', 'Nhiệt phân']
  },
  {
    id: 'c_04',
    part: 'PHAN_I',
    categoryTitle: 'Trao Đổi Ion',
    title: 'Tạo Kết Tủa Barium Sulfate Bền Axit',
    equation: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓ (trắng)',
    conditions: 'Dung dịch chứa ion Ba²⁺ và SO₄²⁻',
    phenomenaAndRules: 'Kết tủa trắng mịn BaSO₄ tuyệt đối không hòa tan trong axit mạnh HCl hay HNO₃.',
    tags: ['Ba', 'SO4', 'Kết tủa', 'Nhận biết']
  },
  {
    id: 'c_05',
    part: 'PHAN_I',
    categoryTitle: 'Điện Phân & Phức Chất',
    title: 'Điện Phân Nóng Chảy Al₂O₃ Sản Xuất Nhôm',
    equation: '2Al₂O₃ (đpnc, criolit) → 4Al + 3O₂↑',
    conditions: 'Nóng chảy ~900°C có xúc tác criolit Na₃AlF₆',
    phenomenaAndRules: 'Criolit giúp hạ nhiệt độ nóng chảy từ 2050°C xuống 900°C và dẫn điện tốt hơn.',
    tags: ['Al2O3', 'Điện phân', 'Criolit', 'Luyện kim']
  },
  {
    id: 'c_06',
    part: 'PHAN_I',
    categoryTitle: 'Điện Phân & Phức Chất',
    title: 'Phản Ứng Tạo Phức Đồng với Amoniac',
    equation: 'Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄](OH)₂',
    conditions: 'Dung dịch NH₃ dư',
    phenomenaAndRules: 'Kết tủa xanh lam Cu(OH)₂ tan hoàn toàn tạo dung dịch phức đồng tetramin màu xanh thẫm đặc trưng.',
    tags: ['Cu(OH)2', 'NH3', 'Phức chất']
  },

  // PHẦN II & III
  {
    id: 'c_07',
    part: 'PHAN_III',
    categoryTitle: 'Halogen (Nhóm VIIA)',
    title: 'Tác Dụng của Clo với Dung Dịch Kiềm (Nước Gia-ven)',
    equation: 'Cl₂ + 2NaOH → NaCl + NaClO + H₂O',
    conditions: 'Nhiệt độ phòng',
    phenomenaAndRules: 'Phản ứng tự oxi hóa - tự khử tạo nước Gia-ven có tính tẩy màu, sát trùng mạnh do ion ClO⁻.',
    tags: ['Cl2', 'NaOH', 'Gia-ven', 'Halogen']
  },
  {
    id: 'c_08',
    part: 'PHAN_III',
    categoryTitle: 'Oxi & Lưu Huỳnh (Nhóm VIA)',
    title: 'Ăn Mòn Gỉ Sắt trong Không Khí Ẩm',
    equation: '4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O',
    conditions: 'Cần đồng thời oxy O₂ và độ ẩm H₂O',
    phenomenaAndRules: 'Gỉ sắt màu nâu đỏ xốp, giòn, không bảo vệ được kim loại bên trong khỏi bị ăn mòn tiếp.',
    tags: ['Fe', 'O2', 'H2O', 'Gỉ sắt', 'Ăn mòn']
  },
  {
    id: 'c_09',
    part: 'PHAN_III',
    categoryTitle: 'Nitơ & Photpho (Nhóm VA)',
    title: 'Đồng Tác Dụng Dung Dịch Axit Nitric Loãng',
    equation: '3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O',
    conditions: 'Đun nhẹ',
    phenomenaAndRules: 'Dung dịch chuyển sang màu xanh lam Cu²⁺, thoát khí NO không màu hóa nâu đỏ ngay ngoài không khí.',
    tags: ['Cu', 'HNO3', 'NO', 'Oxi hóa khử']
  },

  // PHẦN IV
  {
    id: 'c_10',
    part: 'PHAN_IV',
    categoryTitle: 'Kim Loại Nhóm IA & IIA',
    title: 'Natri Tác Dụng Mãnh Liệt với Nước',
    equation: '2Na + 2H₂O → 2NaOH + H₂↑',
    conditions: 'Nhiệt độ thường, tỏa nhiệt lớn',
    phenomenaAndRules: 'Natri nóng chảy vo tròn chạy lướt trên mặt nước, sủi bọt khí H₂ mãnh liệt, làm phenolphthalein hóa hồng.',
    tags: ['Na', 'H2O', 'Kiềm', 'Bùng nổ']
  },
  {
    id: 'c_11',
    part: 'PHAN_IV',
    categoryTitle: 'Nhôm & Lưỡng Tính (Nhóm IIIA)',
    title: 'Phản Ứng Nhiệt Nhôm Hàn Đường Ray',
    equation: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe',
    conditions: 't° mồi cao bằng dây Magie và thuốc nổ đen',
    phenomenaAndRules: 'Tỏa nhiệt cực lớn (>2500°C) làm nóng chảy hoàn toàn kim loại sắt, ứng dụng hàn đường ray xe lửa.',
    tags: ['Al', 'Fe2O3', 'Nhiệt nhôm', 'Siêu nhiệt']
  },
  {
    id: 'c_12',
    part: 'PHAN_IV',
    categoryTitle: 'Kim Loại Chuyển Tiếp (Sắt, Crom, Đồng)',
    title: 'Sắt Cháy trong Khí Clo Lên Hóa Trị III',
    equation: '2Fe + 3Cl₂ (t°) → 2FeCl₃',
    conditions: 'Đun nóng',
    phenomenaAndRules: 'Sắt cháy sáng tạo khói màu nâu đỏ chứa các vi tinh thể sắt(III) clorua FeCl₃.',
    tags: ['Fe', 'Cl2', 'FeCl3', 'Kim loại chuyển tiếp']
  },

  // PHẦN V
  {
    id: 'c_13',
    part: 'PHAN_V',
    categoryTitle: 'Nhận Biết Khí & Ion',
    title: 'Nhận Biết Khí CO₂ Bằng Nước Vôi Trong',
    equation: 'CO₂ + Ca(OH)₂ → CaCO₃↓ (trắng) + H₂O',
    conditions: 'Nước vôi trong dư',
    phenomenaAndRules: 'Làm vẩn đục nước vôi trong; sục tiếp CO₂ dư kết tủa tan dần tạo Ca(HCO₃)₂ trong suốt.',
    tags: ['CO2', 'Ca(OH)2', 'Nhận biết']
  },
  {
    id: 'c_14',
    part: 'PHAN_V',
    categoryTitle: 'Nhận Biết Khí & Ion',
    title: 'Nhận Biết Ion Halogenua Bằng Bạc Nitrat',
    equation: 'Ag⁺ + Cl⁻ → AgCl↓ (trắng); Ag⁺ + Br⁻ → AgBr↓ (vàng nhạt); Ag⁺ + I⁻ → AgI↓ (vàng đậm)',
    conditions: 'Môi trường dung dịch HNO₃ loãng',
    phenomenaAndRules: 'AgCl trắng, AgBr vàng nhạt, AgI vàng đậm đều không hòa tan trong axit nitric loãng.',
    tags: ['Ag+', 'Cl-', 'Br-', 'I-', 'Nhận biết ion']
  },

  // PHẦN VI: HÓA HỮU CƠ
  {
    id: 'c_15',
    part: 'PHAN_VI',
    categoryTitle: 'Hiđrocacbon',
    title: 'Phản Ứng Trùng Hợp Etilen Tạo Nhựa PE',
    equation: 'nCH₂=CH₂ (t°, p, xt) → (-CH₂-CH₂-)n',
    conditions: 'Nhiệt độ cao, áp suất cao, xúc tác Ziegler-Natta',
    phenomenaAndRules: 'Phá vỡ liên kết pi (π) kém bền tạo mạch polime polyetylen (PE) làm bao bì, màng bọc nilon.',
    tags: ['Anken', 'Trùng hợp', 'Polime', 'Hữu cơ']
  },
  {
    id: 'c_16',
    part: 'PHAN_VI',
    categoryTitle: 'Ancol & Phenol',
    title: 'Phản Ứng Nhận Biết Glixerol Bằng Cu(OH)₂',
    equation: '2C₃H₅(OH)₃ + Cu(OH)₂ → [C₃H₅(OH)₂O]₂Cu + 2H₂O',
    conditions: 'Nhiệt độ thường',
    phenomenaAndRules: 'Ancol đa chức có từ 2 nhóm -OH kề nhau hòa tan kết tủa Cu(OH)₂ tạo phức đồng màu xanh lam thẫm.',
    tags: ['Glixerol', 'Cu(OH)2', 'Phức đồng', 'Hữu cơ']
  },
  {
    id: 'c_17',
    part: 'PHAN_VI',
    categoryTitle: 'Este & Lipit',
    title: 'Phản Ứng Xà Phòng Hóa Chất Béo',
    equation: '(RCOO)₃C₃H₅ + 3NaOH (t°) → 3RCOONa (xà phòng) + C₃H₅(OH)₃',
    conditions: 'Đun sôi dung dịch kiềm',
    phenomenaAndRules: 'Thủy phân trieste tạo muối natri của axit béo dùng làm xà phòng bánh và giải phóng glixerol.',
    tags: ['Lipit', 'Xà phòng hóa', 'Glixerol', 'Hữu cơ']
  },
  {
    id: 'c_18',
    part: 'PHAN_VI',
    categoryTitle: 'Cacbohiđrat & Amino Axit',
    title: 'Phản Ứng Tráng Bạc của Glucozơ',
    equation: 'CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
    conditions: 'Đun nóng cách thủy trong dung dịch amoniac',
    phenomenaAndRules: 'Nhóm anđehit -CHO bị oxi hóa, tạo lớp tráng gương bạc Ag kim loại sáng bóng bám trên thành ống nghiệm.',
    tags: ['Glucozo', 'Tráng bạc', 'Ag', 'Hữu cơ']
  }
];

const REDOX_ENTRIES: ReactionEntry[] = Object.values(VERIFIED_REDOX_DATABASE).map((rx, idx) => ({
  id: `c_redox_${idx + 1}`,
  part: 'PHAN_REDOX',
  categoryTitle: 'Oxi Hóa - Khử (GDPT 2018)',
  title: rx.titleVI,
  equation: rx.equation,
  conditions: rx.curriculumStandardVI,
  phenomenaAndRules: rx.pedagogicalExplanationVI,
  tags: [rx.reactionKey, 'Oxi hóa - Khử', rx.reducingAgent.split(' ')[0], `${rx.totalElectronsTransferred}e`],
  redoxData: rx
}));

export const COMPENDIUM_REACTIONS: ReactionEntry[] = [
  ...BASE_COMPENDIUM_REACTIONS,
  ...REDOX_ENTRIES
];

export const ReactionCompendiumModal: React.FC<ReactionCompendiumModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredReactions = useMemo(() => {
    return COMPENDIUM_REACTIONS.filter(r => {
      const matchPart = selectedPart === 'ALL' || r.part === selectedPart;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchPart;

      const matchText =
        r.title.toLowerCase().includes(q) ||
        r.equation.toLowerCase().includes(q) ||
        r.categoryTitle.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q));

      return matchPart && matchText;
    });
  }, [searchQuery, selectedPart]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-navy border border-navy-light/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-ion to-coral-reaction p-0.5 flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-obsidian" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-ivory tracking-wide flex items-center gap-2">
                CẨM NANG TOÀN TẬP PHẢN ỨNG HÓA HỌC
                <span className="px-2 py-0.5 rounded-full bg-cyan-ion/20 text-cyan-ion font-mono text-[10px] border border-cyan-ion/30">
                  Phần I - VI
                </span>
              </h2>
              <p className="text-xs text-ivory-muted">Tra cứu nhanh toàn bộ phương trình vô cơ, quy tắc trao đổi ion & phản ứng hữu cơ trọng tâm</p>
            </div>
          </div>

          <button onClick={onClose} className="text-ivory-muted hover:text-ivory">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ivory-muted" />
            <input
              type="text"
              placeholder="Tìm kiếm theo chất, phương trình (Fe, NaOH, Cu, Cl2, Glucozơ...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-obsidian border border-navy-light/60 text-xs text-ivory placeholder-ivory-muted/60 focus:border-cyan-ion focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { key: 'ALL', label: 'Tất cả' },
              { key: 'PHAN_REDOX', label: '⚡ Oxi Hóa - Khử' },
              { key: 'PHAN_I', label: 'Phần I: Cơ Chế' },
              { key: 'PHAN_III', label: 'Phần III: Phi Kim' },
              { key: 'PHAN_IV', label: 'Phần IV: Kim Loại' },
              { key: 'PHAN_V', label: 'Phần V: Nhận Biết' },
              { key: 'PHAN_VI', label: 'Phần VI: Hữu Cơ' }
            ].map(p => (
              <button
                key={p.key}
                onClick={() => setSelectedPart(p.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedPart === p.key
                    ? 'bg-cyan-ion text-obsidian shadow'
                    : 'bg-navy-light/40 text-ivory-muted hover:text-ivory'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reactions List */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 pr-1">
          {filteredReactions.map(r => (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-obsidian/70 border border-navy-light/60 hover:border-cyan-ion/60 transition-all flex flex-col justify-between gap-2.5 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/30">
                    {r.categoryTitle}
                  </span>
                  <div className="flex items-center gap-1">
                    {r.tags.map(t => (
                      <span key={t} className="text-[9px] font-mono text-ivory-muted bg-navy px-1.5 py-0.2 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xs font-bold text-ivory">{r.title}</h3>

                {/* Equation Display */}
                <div className="my-2 px-3 py-2 rounded-lg bg-navy font-mono text-xs font-bold text-cyan-300 border border-navy-light/80 tracking-wide">
                  {r.equation}
                </div>

                {/* Structured Redox Half-Reactions & Electron Transfer Breakdown */}
                {r.redoxData && (
                  <div className="my-2 p-2.5 rounded-lg bg-slate-950/80 border border-purple-500/30 flex flex-col gap-1.5 text-[11px]">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[10px]">
                      <span className="text-emerald-400 font-bold">
                        🟢 Chất Khử: <strong className="text-white">{r.redoxData.reducingAgent}</strong>
                      </span>
                      <span className="text-rose-400 font-bold">
                        🔴 Chất Oxi Hóa: <strong className="text-white">{r.redoxData.oxidizingAgent}</strong>
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-mono flex flex-col gap-0.5 bg-slate-900/60 p-1.5 rounded">
                      <span className="text-emerald-300">↑ {r.redoxData.oxidationProcessVI}</span>
                      <span className="text-rose-300">↓ {r.redoxData.reductionProcessVI}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 pt-1 border-t border-slate-800">
                      <span>Tổng electron trao đổi: <strong className="text-amber-400">{r.redoxData.totalElectronsTransferred}e⁻</strong></span>
                      <span className="text-purple-300">Chuẩn GDPT 2018</span>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-amber-300 font-mono">
                  ĐK: {r.conditions}
                </p>
                <p className="text-[11px] text-ivory-muted mt-1 leading-relaxed">
                  {r.phenomenaAndRules}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
