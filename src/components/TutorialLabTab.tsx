// src/components/TutorialLabTab.tsx
// Interactive Tutorial Lab & Chemistry Sandbox for ELEMENTA

import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import {
  Compass,
  Sword,
  Shield,
  Zap,
  FlaskConical,
  Flame,
  Droplets,
  HelpCircle,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Snowflake,
  Sparkles,
  Award,
  BookOpen,
  Check
} from 'lucide-react';

interface TutorialLabTabProps {
  onStartMobaMatch: () => void;
  onStartTcgDuel?: () => void;
  tutorialCompleted?: boolean;
  onCompleteTutorial?: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const TUTORIAL_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Tác nhân nào bắt buộc phải có để Sắt (Fe) bị ăn mòn tạo gỉ sét trong tự nhiên?',
    options: [
      'Chỉ cần khí Oxy (O₂)',
      'Cả khí Oxy (O₂) và độ ẩm nước (H₂O)',
      'Chỉ cần nhiệt độ cao'
    ],
    correctIndex: 1,
    explanation: 'Sắt cần cả Oxy và nước để tạo màng gỉ ngậm nước Fe₂O₃·xH₂O (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O).'
  },
  {
    id: 2,
    question: 'Đồng (Cu, E° = +0.34V) có phản ứng với dung dịch HCl loãng để giải phóng H₂ không?',
    options: [
      'Có, tạo CuCl₂ và H₂ bay lên',
      'Không, đây là bẫy nhận thức vì Cu đứng sau Hydro',
      'Có, nhưng phản ứng rất chậm cần đun sôi'
    ],
    correctIndex: 1,
    explanation: 'Đồng đứng sau Hydro trong dãy hoạt động hóa học (E° > 0), không thể khử ion H⁺ trong axit loãng.'
  },
  {
    id: 3,
    question: 'Trong Đấu Bài Chiến Thuật (TCG), Chuỗi Phản Ứng (Chain Stack) giải quyết theo thứ tự nào?',
    options: [
      'Vào trước giải quyết trước (FIFO)',
      'Vào sau giải quyết trước (LIFO)',
      'Tất cả hiệu ứng nổ cùng một lúc'
    ],
    correctIndex: 1,
    explanation: 'Chuỗi phản ứng luôn giải quyết theo ngăn xếp LIFO (Last In First Out), lá bài kích hoạt sau cùng sẽ được giải quyết đầu tiên.'
  }
];

export const TutorialLabTab: React.FC<TutorialLabTabProps> = ({
  onStartMobaMatch,
  onStartTcgDuel,
  tutorialCompleted = false,
  onCompleteTutorial
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [viewedSteps, setViewedSteps] = useState<Set<number>>(new Set([0]));
  const [testedDemos, setTestedDemos] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isGraduated, setIsGraduated] = useState<boolean>(tutorialCompleted);

  const [demoFeedback, setDemoFeedback] = useState<{
    equation: string;
    message: string;
    status: 'SUCCESS' | 'TRAP';
  } | null>(null);

  const steps = [
    {
      title: '1. Điều Khiển Tướng Thời Gian Thực (Controls)',
      desc: 'Sử dụng Chuột Phải hoặc phím WASD để di chuyển tướng trên đấu trường. Chuột Trái để chọn mục tiêu kẻ địch hoặc kích hoạt vùng nhắm kỹ năng. Phím Cách (Space) để đưa camera về trung tâm nhân vật.',
      keys: ['Chuột Phải: Di chuyển', 'Chuột Trái: Chọn mục tiêu', 'Q / W / E / R: Tung chiêu', 'D / F: Phép bổ trợ', 'B: Biến về căn cứ']
    },
    {
      title: '2. Luật Bản Đồ 3 Đường & Trụ Phòng Thủ (MOBA Rules)',
      desc: 'Bản đồ "Thung Lũng Liên Kết" có 3 đường chính (Top, Mid, Bot). Lính xuất hiện theo đợt mỗi 25 giây. Trụ phòng thủ sẽ ưu tiên bắn lính trước, nhưng nếu bạn tấn công tướng địch trong tầm trụ, trụ sẽ lập tức bắn bạn!',
      keys: ['Phá hủy trụ ngoài để tiến sâu vào căn cứ', 'Không lặn trụ một mình khi không có lính đồng minh', 'Hạ gục Elemental Core đối phương để GIÀNH CHIẾN THẮNG']
    },
    {
      title: '3. Phản Ứng Hóa Học Trong Giao Tranh (Chemical Synergy)',
      desc: 'Mọi kỹ năng trong ELEMENTA đều liên kết với phản ứng hóa học thật! Khi Natri (Na) dùng chiêu trên sông H₂O, phản ứng bùng nổ kiềm được kích hoạt. Khi Sắt (Fe) chém vào kẻ địch dính Clo (Cl), phản ứng 2Fe + 3Cl₂ sẽ gây sát thương chí mạng.',
      keys: ['Tận dụng sông H₂O để kích nổ kim loại kiềm', 'Tránh bẫy nhận thức như dùng Đồng (Cu) với acid loãng', 'Mỗi phản ứng thành công cộng điểm Tri Thức & EXP']
    },
    {
      title: '4. Kiểm Soát Tầm Nhìn & Bụi Rậm (Fog of War & Vision)',
      desc: 'Chiến trường có sương mù bao phủ khu vực chưa được khám phá. Bụi rậm che giấu hoàn toàn bạn trước kẻ địch trừ khi chúng bước vào cùng bụi rậm hoặc tiếp cận cận chiến (<= 110 đơn vị). Lưu ý trụ tháp đối phương có True Sight 350 đơn vị làm lộ diện bạn!',
      keys: ['Ẩn nấp trong bụi rậm để gank bất ngờ', 'Trụ tháp sở hữu radar True Sight 350 đơn vị', 'Hiđro (H) sở hữu nội tại mở rộng tầm nhìn 820 đơn vị']
    },
    {
      title: '5. Quái Rừng & Boss Giám Hộ Xúc Tác Pt (Jungle & Boss)',
      desc: 'Rừng chứa các sinh vật nguyên tố mang bùa lợi mạnh mẽ: Thằn Lằn Axit (bùa ăn mòn Cl⁻), Người Đá Tinh Thể (khiên BaSO₄), và Boss Giám Hộ Xúc Tác Bạch Kim Pt. Hạ Boss sẽ ban bùa lợi CATALYST_BUFF (+30% AP, giảm hồi chiêu, bùng nổ phản ứng) cho toàn đội!',
      keys: ['Hạ Boss Pt để lấy bùa lợi Xúc Tác toàn đội', 'Cẩn thận quái đánh trả và nổ xung lực diện rộng', 'Không kéo quái quá 420 đơn vị kẻo quái leash hồi máu']
    },
    {
      title: '6. Luật Đấu Bài TCG & Chuỗi Liên Kết (TCG Card Battles)',
      desc: 'Mỗi đấu sĩ khởi đầu với 8000 LP. Quái thú Cấp 1-4 triệu hồi thường; Cấp 5-6 cần 1 hiến tế; Cấp 7-8 cần 2 hiến tế. Kích hoạt Phép / Bẫy tạo thành Chuỗi Phản Ứng (Chain Stack LIFO), nơi Bẫy Phản Công (Spell Speed 3) có quyền ưu tiên cao nhất.',
      keys: ['Hiến tế quái thú nhỏ để gọi Quái Thú Kim Loại Nặng', 'Chuỗi Chain giải quyết từ cuối lên đầu (LIFO)', 'Môi trường Field Spell thay đổi pH và nhiệt độ toàn sân']
    }
  ];

  const handleSelectStep = (index: number) => {
    sound.playUiClick();
    setActiveStep(index);
    setViewedSteps(prev => new Set([...prev, index]));
  };

  const handleRunDemo = (demoType: string) => {
    setTestedDemos(prev => new Set([...prev, demoType]));

    switch (demoType) {
      case 'NA_WATER':
        sound.playExplosion();
        setDemoFeedback({
          equation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑',
          message: 'BÙNG NỔ KIỀM: Natri nóng chảy vo tròn chạy lướt trên mặt nước và bùng nổ tỏa nhiệt lớn ΔH = -368 kJ/mol!',
          status: 'SUCCESS'
        });
        break;

      case 'FE_RUST':
        sound.playExplosion();
        setDemoFeedback({
          equation: '4Fe(s) + 3O₂(g) + 2xH₂O(l) → 2Fe₂O₃·xH₂O(s)',
          message: 'ĂN MÒN GỈ SÉT: Cần cả oxy O₂ và độ ẩm H₂O để tạo lớp gỉ sắt xốp màu nâu đỏ gây sát thương theo thời gian.',
          status: 'SUCCESS'
        });
        break;

      case 'THERMITE':
        sound.playVictory();
        setDemoFeedback({
          equation: '2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)',
          message: 'PHẢN ỨNG NHIỆT NHÔM: Tỏa nhiệt cực lớn > 2500°C làm sắt nóng chảy, phá hủy 100% giáp của kẻ địch!',
          status: 'SUCCESS'
        });
        break;

      case 'CU_HCL_TRAP':
        sound.playErrorFizzle();
        setDemoFeedback({
          equation: 'Cu + HCl (loãng) → KHÔNG PHẢN ỨNG (BẪY NHẬN THỨC)',
          message: 'BẪY NHẬN THỨC: Đồng đứng sau Hydro trong dãy điện hóa (E° = +0.34V), không thể khử ion H⁺ trong axit loãng!',
          status: 'TRAP'
        });
        break;

      case 'CACO3_DECOMP':
        sound.playSpellCast();
        setDemoFeedback({
          equation: 'CaCO₃(s) → CaO(s) + CO₂(g) (ΔᵣH°₂₉₈ = +178.3 kJ)',
          message: 'PHẢN ỨNG THU NHIỆT (ENDOTHERMIC): Cần cung cấp nhiệt lượng liên tục ở 900-1000°C để phân hủy liên kết ion trong mạng tinh thể đá vôi.',
          status: 'SUCCESS'
        });
        break;

      case 'PT_CATALYST':
        sound.playVictory();
        setDemoFeedback({
          equation: '2SO₂(g) + O₂(g) --[Pt, t°]--> 2SO₃(g)',
          message: 'CƠ CHẾ XÚC TÁC BẠCH KIM (Pt): Làm giảm năng lượng hoạt hóa Eₐ, tăng tốc độ phản ứng tổng hợp lưu huỳnh trioxit hàng trăm ngàn lần mà không bị tiêu hao.',
          status: 'SUCCESS'
        });
        break;
    }
  };

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    sound.playUiClick();
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const isAllQuizAnswered = TUTORIAL_QUIZ.every(q => quizAnswers[q.id] !== undefined);
  const isAllQuizCorrect = TUTORIAL_QUIZ.every(q => quizAnswers[q.id] === q.correctIndex);

  const handleGraduate = () => {
    setQuizSubmitted(true);
    if (isAllQuizCorrect) {
      sound.playVictory();
      setIsGraduated(true);
      if (onCompleteTutorial) {
        onCompleteTutorial();
      }
    } else {
      sound.playErrorFizzle();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Header with Graduate Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-ion to-coral-reaction p-0.5 flex items-center justify-center shadow-md">
            <Compass className="w-6 h-6 text-obsidian" />
          </div>
          <div>
            <h1 className="font-serif font-black text-2xl text-ivory tracking-wide flex items-center gap-2">
              PHÒNG THÍ NGHIỆM HUẤN LUYỆN & HƯỚNG DẪN TÂN THỦ
            </h1>
            <p className="text-xs text-ivory-muted">Nắm vững thao tác MOBA, chiến thuật 3 đường, đấu bài TCG và các quy tắc phản ứng hóa học</p>
          </div>
        </div>

        {isGraduated && (
          <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center gap-2 text-amber-300 font-mono text-xs font-bold shadow-lg shadow-amber-500/20">
            <Award className="w-4 h-4 text-amber-400" />
            <span>ĐÃ TỐT NGHIỆP: HỌC GIẢ KHỞI NGUYÊN</span>
          </div>
        )}
      </div>

      {/* Tutorial Progress Bar */}
      <div className="p-4 rounded-xl bg-navy/60 border border-navy-light/60 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-ivory-muted flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-ion" />
            Tiến độ hoàn thành bài học:
          </span>
          <span className="text-cyan-ion font-bold">
            {viewedSteps.size}/6 bài học ({Math.round((viewedSteps.size / 6) * 100)}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-obsidian overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-ion to-emerald-400 transition-all duration-300"
            style={{ width: `${(viewedSteps.size / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((st, i) => (
          <div
            key={i}
            onClick={() => handleSelectStep(i)}
            className={`p-4 rounded-xl cursor-pointer border transition-all ${
              activeStep === i
                ? 'bg-navy border-cyan-ion shadow-lg shadow-cyan-ion/20'
                : 'bg-navy/50 border-navy-light/50 hover:bg-navy-light/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-cyan-ion">BƯỚC {i + 1}</span>
              {viewedSteps.has(i) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <h3 className="text-xs font-bold text-ivory line-clamp-2">{st.title}</h3>
          </div>
        ))}
      </div>

      {/* Step Detail Card */}
      <div className="p-6 rounded-2xl bg-navy/80 border border-navy-light/80 shadow-xl flex flex-col gap-4">
        <h2 className="font-serif font-bold text-base text-ivory flex items-center gap-2">
          {steps[activeStep].title}
        </h2>
        <p className="text-xs text-ivory-muted leading-relaxed">{steps[activeStep].desc}</p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-navy-light/50">
          {steps[activeStep].keys.map((k, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-obsidian text-xs font-mono text-cyan-ion border border-cyan-ion/30">
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Reaction Testing Chamber */}
      <div className="p-6 rounded-2xl bg-obsidian/70 border border-cyan-ion/50 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-sm text-ivory flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-cyan-ion" />
            THỬ NGHIỆM PHẢN ỨNG THỰC NGHIỆM TRƯỚC TRẬN ĐẤU
          </h3>
          <span className="text-xs font-mono text-cyan-300">
            Đã thử: {testedDemos.size}/6 phản ứng
          </span>
        </div>
        <p className="text-xs text-ivory-muted">
          Nhấp thử 6 phản ứng chiến thuật kinh điển (bao gồm Nhiệt hóa & Động học xúc tác) để quan sát hiện tượng và thông điệp sư phạm:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => handleRunDemo('NA_WATER')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
              testedDemos.has('NA_WATER')
                ? 'bg-amber-500/30 border-amber-400 text-yellow-200'
                : 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-yellow-300'
            }`}
          >
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>Na + Nước H₂O</span>
          </button>

          <button
            onClick={() => handleRunDemo('FE_RUST')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
              testedDemos.has('FE_RUST')
                ? 'bg-orange-500/30 border-orange-400 text-orange-200'
                : 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/40 text-orange-300'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Fe + O₂ (Gỉ)</span>
          </button>

          <button
            onClick={() => handleRunDemo('THERMITE')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
              testedDemos.has('THERMITE')
                ? 'bg-red-500/30 border-red-400 text-red-200'
                : 'bg-red-500/20 hover:bg-red-500/30 border-red-500/40 text-red-300'
            }`}
          >
            <Zap className="w-4 h-4 text-red-400" />
            <span>Nhiệt Nhôm (Al)</span>
          </button>

          <button
            onClick={() => handleRunDemo('CU_HCL_TRAP')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
              testedDemos.has('CU_HCL_TRAP')
                ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                : 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/40 text-purple-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-purple-400" />
            <span>Cu + HCl (Bẫy)</span>
          </button>

          <button
            onClick={() => handleRunDemo('CACO3_DECOMP')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
              testedDemos.has('CACO3_DECOMP')
                ? 'bg-teal-500/30 border-teal-400 text-teal-200'
                : 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-500/40 text-teal-300'
            }`}
          >
            <Snowflake className="w-4 h-4 text-teal-300" />
            <span>Nung Vôi (Thu nhiệt)</span>
          </button>

          <button
            onClick={() => handleRunDemo('PT_CATALYST')}
            className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
              testedDemos.has('PT_CATALYST')
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 text-emerald-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Xúc tác Pt (Tốc độ)</span>
          </button>
        </div>

        {/* Demo Feedback Card */}
        {demoFeedback && (
          <div
            className={`p-4 rounded-xl border flex flex-col gap-2 animate-fadeIn ${
              demoFeedback.status === 'SUCCESS'
                ? 'bg-navy/80 border-cyan-ion/70'
                : 'bg-red-950/40 border-red-500/60'
            }`}
          >
            <div className="flex items-center gap-2">
              {demoFeedback.status === 'SUCCESS' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              )}
              <span className="font-mono text-xs font-bold text-cyan-300 tracking-wide">
                {demoFeedback.equation}
              </span>
            </div>
            <p className="text-xs text-ivory leading-relaxed">{demoFeedback.message}</p>
          </div>
        )}
      </div>

      {/* Mini-Quiz & Graduation Chamber */}
      <div className="p-6 rounded-2xl bg-navy/70 border border-navy-light/80 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-sm text-ivory flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            BÀI KIỂM TRA TỐT NGHIỆP TÂN THỦ (3 CÂU HỎI TRỌNG TÂM)
          </h3>
          <span className="text-xs font-mono text-amber-300">
            Phần thưởng: +200 Tokens, +50 Shards, +150 XP
          </span>
        </div>
        <p className="text-xs text-ivory-muted">
          Trả lời đúng cả 3 câu hỏi để hoàn thành khóa huấn luyện và nhận danh hiệu chính thức:
        </p>

        <div className="flex flex-col gap-4">
          {TUTORIAL_QUIZ.map((q) => {
            const selectedIdx = quizAnswers[q.id];
            const isCorrect = selectedIdx === q.correctIndex;
            return (
              <div key={q.id} className="p-4 rounded-xl bg-obsidian/60 border border-navy-light/50 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-ivory font-serif">
                  Câu {q.id}: {q.question}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectAnswer(q.id, oIdx)}
                      className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                        selectedIdx === oIdx
                          ? quizSubmitted
                            ? isCorrect
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                              : 'bg-red-950/60 border-red-500 text-red-300 font-bold'
                            : 'bg-cyan-950/60 border-cyan-ion text-cyan-300 font-bold'
                          : 'bg-navy/40 border-navy-light/40 text-ivory-muted hover:bg-navy-light/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quizSubmitted && (
                  <p className={`text-xs font-mono ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isCorrect ? '✓ Đúng: ' : '✗ Sai: '} {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Graduation Button */}
        {!isGraduated ? (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleGraduate}
              disabled={!isAllQuizAnswered}
              className={`px-6 py-2.5 rounded-xl font-serif font-bold text-xs tracking-wide shadow-md transition-all ${
                isAllQuizAnswered
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-obsidian hover:scale-105 active:scale-95'
                  : 'bg-navy-light/30 text-ivory-muted/40 cursor-not-allowed border border-navy-light/40'
              }`}
            >
              NỘP BÀI & NHẬN THƯỞNG TỐT NGHIỆP
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/50 flex items-center gap-2 text-emerald-300 text-xs font-mono">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Bạn đã tốt nghiệp khóa huấn luyện tân thủ và nhận phần thưởng thành công!</span>
          </div>
        )}
      </div>

      {/* CTA: Enter MOBA Match or TCG Duel */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={() => {
            sound.playVictory();
            onStartMobaMatch();
          }}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-ion to-coral-reaction text-obsidian font-serif font-black text-sm tracking-wider shadow-lg shadow-cyan-ion/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Play className="w-5 h-5 fill-obsidian" />
          ĐẤU TRƯỜNG MOBA (60 FPS)
        </button>

        {onStartTcgDuel && (
          <button
            onClick={() => {
              sound.playVictory();
              onStartTcgDuel();
            }}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-white font-serif font-black text-sm tracking-wider shadow-lg shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sword className="w-5 h-5" />
            ĐẤU BÀI CHIẾN THUẬT TCG (8000 LP)
          </button>
        )}
      </div>
    </div>
  );
};
