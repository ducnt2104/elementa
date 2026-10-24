// src/components/DailySrsTab.tsx
import React, { useState } from 'react';
import { SrsItem, PlayerProfile } from '../domain/types';
import { SpacedRepetitionService } from '../domain/spacedRepetition';
import { sound } from '../audio/soundEngine';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCw,
  Sparkles,
  Award,
  BookOpen,
  Users,
  BarChart3,
  Vote,
  ShieldAlert,
  Lock,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  GraduationCap,
  Target,
  ArrowRight
} from 'lucide-react';
import {
  CurriculumDiagnosticService,
  DiagnosticQuestion,
  CurriculumGrade,
  DiagnosticEvaluationResult
} from '../domain/curriculumDiagnostic';

interface DailySrsTabProps {
  profile: PlayerProfile;
  onUpdateSrsItems: (items: SrsItem[], xpEarned: number) => void;
}

type TabMode = 'student' | 'teacher' | 'governance';

interface Proposal {
  id: string;
  title: string;
  proposer: string;
  category: 'gameplay' | 'scientific_attempt';
  description: string;
  isScientificLaw: boolean;
  scientificExplanation: string;
  votesFor: number;
  votesAgainst: number;
  userVoted?: 'for' | 'against';
  status: 'active' | 'approved' | 'rejected_immutable';
}

export const DailySrsTab: React.FC<DailySrsTabProps> = ({
  profile,
  onUpdateSrsItems
}) => {
  const [activeMode, setActiveMode] = useState<TabMode>('student');
  const [items, setItems] = useState<SrsItem[]>(profile.srsItems);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [reviewedTodayCount, setReviewedTodayCount] = useState<number>(0);

  // Diagnostic Placement Test States
  const [isDiagnosticActive, setIsDiagnosticActive] = useState<boolean>(false);
  const [diagGradeFilter, setDiagGradeFilter] = useState<'ALL' | CurriculumGrade>('ALL');
  const [diagnosticQuestions, setDiagnosticQuestions] = useState<DiagnosticQuestion[]>([]);
  const [diagCurrentIdx, setDiagCurrentIdx] = useState<number>(0);
  const [diagAnswers, setDiagAnswers] = useState<Record<string, string>>({});
  const [diagResult, setDiagResult] = useState<DiagnosticEvaluationResult | null>(null);

  // Mock community proposals illustrating Scientific Invariance
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 'prop_01',
      title: 'Giảm thời gian hồi chiêu thẻ H₂O từ 10s xuống 8s',
      proposer: 'ChiếnBinhHóaHọc_HN',
      category: 'gameplay',
      description: 'Hiện tại combo gỉ sét cần H₂O nhưng thời gian chờ 10s khiến nhịp combat hơi chậm. Đề xuất giảm 2s để tăng tốc độ combo.',
      isScientificLaw: false,
      scientificExplanation: 'Biến số gameplay (cooldown, mana, animation) thuộc quyền quyết định cân bằng trò chơi và có thể điều chỉnh qua biểu quyết.',
      votesFor: 142,
      votesAgainst: 18,
      status: 'active'
    },
    {
      id: 'prop_02',
      title: 'Cho phép Cu phản ứng với dung dịch HCl loãng để tạo CuCl₂ và H₂',
      proposer: 'HọcSinhLop9_Pro',
      category: 'scientific_attempt',
      description: 'Đồng là kim loại đẹp và phổ biến, đề xuất cho Cu tan trong HCl để người chơi dễ tạo phản ứng sinh khí H₂ hơn trong trận.',
      isScientificLaw: true,
      scientificExplanation: 'VI PHẠM BẤT BIẾN KHOA HỌC: Thế khử chuẩn E°(Cu²⁺/Cu) = +0.34V > E°(2H⁺/H₂) = 0.00V. Kim loại đứng sau Hydro trong dãy hoạt động hóa học KHÔNG THỂ khử ion H⁺ trong axit không có tính oxi hóa mạnh. Dữ kiện này bị KHÓA CỨNG, biểu quyết bị bác bỏ tự động.',
      votesFor: 12,
      votesAgainst: 389,
      status: 'rejected_immutable'
    },
    {
      id: 'prop_03',
      title: 'Thêm hiệu ứng lóe sáng xanh lơ khi kết tủa Cu(OH)₂ hình thành',
      proposer: 'ThầyMinh_VatlyHoa',
      category: 'gameplay',
      description: 'Bổ sung hạt bụi huỳnh quang màu xanh lam đặc trưng khi xảy ra phản ứng Cu²⁺ + 2OH⁻ -> Cu(OH)₂↓ để tăng tính nhận diện thị giác.',
      isScientificLaw: false,
      scientificExplanation: 'Cải tiến giao diện mỹ thuật không làm sai lệch tính chất hóa học thực của kết tủa Cu(OH)₂ màu xanh lam.',
      votesFor: 256,
      votesAgainst: 4,
      status: 'approved'
    },
    {
      id: 'prop_04',
      title: 'Đổi công thức gỉ sắt thành FeO để dễ nhớ hơn 4Fe + 3O₂ + 2xH₂O',
      proposer: 'GamerChemist_007',
      category: 'scientific_attempt',
      description: 'Công thức Fe₂O₃·xH₂O và hệ số 2xH₂O quá khó nhớ, đề xuất sửa thành Fe + O₂ -> FeO cho đơn giản.',
      isScientificLaw: true,
      scientificExplanation: 'VI PHẠM BẤT BIẾN KHOA HỌC: Quá trình ăn mòn điện hóa học của sắt trong không khí ẩm tạo thành oxit sắt (III) ngậm nước có cấu trúc xốp. Đơn giản hóa sai lệch thực tế bị cấm theo nguyên tắc Zero-Hallucination.',
      votesFor: 5,
      votesAgainst: 412,
      status: 'rejected_immutable'
    }
  ]);

  const dueItems = SpacedRepetitionService.getDueItems(items);
  const currentCard = dueItems[0] || null;

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    sound.playUiClick();
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!currentCard || !selectedAnswer || isAnswerSubmitted) return;

    const isCorrect = selectedAnswer === currentCard.correctAnswer;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sound.playVictory();
    } else {
      sound.playErrorFizzle();
    }

    const updatedItem = SpacedRepetitionService.processReview(currentCard, isCorrect);
    const nextItems = items.map(it => it.id === updatedItem.id ? updatedItem : it);

    setItems(nextItems);
    setReviewedTodayCount(c => c + 1);
    onUpdateSrsItems(nextItems, isCorrect ? 25 : 5);
  };

  const handleNextCard = () => {
    sound.playUiClick();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  const handleStartDiagnostic = (grade: 'ALL' | CurriculumGrade = 'ALL') => {
    sound.playUiClick();
    setDiagGradeFilter(grade);
    const qs = CurriculumDiagnosticService.generateDiagnosticSession(grade, 6);
    setDiagnosticQuestions(qs);
    setDiagCurrentIdx(0);
    setDiagAnswers({});
    setDiagResult(null);
    setIsDiagnosticActive(true);
  };

  const handleSelectDiagOption = (option: string) => {
    sound.playUiClick();
    const currQ = diagnosticQuestions[diagCurrentIdx];
    if (!currQ) return;
    setDiagAnswers(prev => ({ ...prev, [currQ.id]: option }));
  };

  const handleNextDiagQuestion = () => {
    sound.playUiClick();
    if (diagCurrentIdx < diagnosticQuestions.length - 1) {
      setDiagCurrentIdx(prev => prev + 1);
    } else {
      // Evaluate session
      const result = CurriculumDiagnosticService.evaluateDiagnosticSession(diagAnswers, diagnosticQuestions);
      setDiagResult(result);
      if (result.score >= 60) {
        sound.playVictory();
      } else {
        sound.playErrorFizzle();
      }

      // If new SRS items were generated from gaps, seed them
      if (result.generatedSrsItems.length > 0) {
        const nextItems = [...items, ...result.generatedSrsItems];
        setItems(nextItems);
        onUpdateSrsItems(nextItems, result.earnedXp);
      } else {
        onUpdateSrsItems(items, result.earnedXp);
      }
    }
  };

  const handleCloseDiagnostic = () => {
    sound.playUiClick();
    setIsDiagnosticActive(false);
    setDiagResult(null);
  };

  const handleVote = (proposalId: string, direction: 'for' | 'against') => {
    sound.playUiClick();
    setProposals(prev =>
      prev.map(p => {
        if (p.id !== proposalId) return p;
        if (p.userVoted === direction) return p;

        const deltaFor = direction === 'for' ? 1 : p.userVoted === 'for' ? -1 : 0;
        const deltaAgainst = direction === 'against' ? 1 : p.userVoted === 'against' ? -1 : 0;

        return {
          ...p,
          votesFor: p.votesFor + deltaFor,
          votesAgainst: p.votesAgainst + deltaAgainst,
          userVoted: direction
        };
      })
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Navigation Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy/90 p-4 rounded-2xl border border-navy-light/60 backdrop-blur shadow-lg">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ivory flex items-center gap-2">
            <span>Trung Tâm Trí Nhớ & Sư Phạm Thích Ứng</span>
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Mô hình toán học CA-SRS (Ebbinghaus & Settles) kết hợp phân tích lớp học và cơ chế Bất Biến Khoa Học.
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian border border-navy-light self-start sm:self-auto">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('student');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'student'
                ? 'bg-cyan-ion text-obsidian shadow'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Học Sinh ({dueItems.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('teacher');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'teacher'
                ? 'bg-copper text-obsidian shadow'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Giáo Viên & Lớp Học</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('governance');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'governance'
                ? 'bg-lime-mineral text-obsidian shadow'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            <span>Bất Biến Khoa Học</span>
          </button>
        </div>
      </div>

      {/* MODE 1: STUDENT DAILY CA-SRS REVIEW */}
      {activeMode === 'student' && (
        <div className="space-y-6">
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-navy/60 px-5 py-3 rounded-xl border border-navy-light/40 text-xs font-mono">
            <span className="text-ivory-muted">
              Chu kỳ ôn tập: <strong className="text-cyan-ion">1 ngày → 3 ngày → 7 ngày → 14 ngày</strong>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartDiagnostic('ALL')}
                className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-ion text-cyan-200 hover:bg-cyan-900 transition-all font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Target className="w-3.5 h-3.5 text-cyan-ion" />
                <span>Khảo Sát Chẩn Đoán</span>
              </button>
              <span className="text-copper">Đã ôn hôm nay: {reviewedTodayCount}</span>
              <span className="text-lime-mineral">Tổng thẻ: {items.length}</span>
            </div>
          </div>

          {/* Main Review Card Section */}
          <div className="max-w-3xl mx-auto">
            {!currentCard ? (
              /* All Done State */
              <div className="rounded-2xl border border-lime-mineral/40 bg-gradient-to-b from-navy to-obsidian p-8 text-center space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-lime-mineral/20 text-lime-mineral flex items-center justify-center mx-auto border border-lime-mineral/50 shadow-lg shadow-lime-mineral/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  Hoàn Thành Xuất Sắc Mục Tiêu Hôm Nay!
                </h3>
                <p className="text-xs text-ivory-muted max-w-md mx-auto leading-relaxed">
                  Bạn không còn câu hỏi hóa học nào đến hạn cần ôn tập hôm nay. Toàn bộ kiến thức đã được ghi nhận vào chu kỳ trí nhớ dài hạn. Hãy quay lại vào ngày mai hoặc tham gia đấu trường để tiếp tục rèn luyện!
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy border border-copper/40 text-copper text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    Chu kỳ kế tiếp: 3 ngày • 7 ngày • 14 ngày
                  </span>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col items-center gap-3">
                  <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-cyan-ion" />
                    Khảo Sát Năng Lực & Tự Động Tạo Thẻ Ôn Tập GDPT 2018
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => handleStartDiagnostic('ALL')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-obsidian font-bold text-xs transition-all shadow"
                    >
                      Tổng Hợp Toàn Bộ
                    </button>
                    <button
                      onClick={() => handleStartDiagnostic('KHTN_8')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
                    >
                      KHTN Lớp 8
                    </button>
                    <button
                      onClick={() => handleStartDiagnostic('KHTN_9')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
                    >
                      KHTN Lớp 9
                    </button>
                    <button
                      onClick={() => handleStartDiagnostic('HOA_10')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
                    >
                      Hóa Học 10
                    </button>
                    <button
                      onClick={() => handleStartDiagnostic('HOA_11_12')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
                    >
                      Hóa 11 - 12
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Review Question Card */
              <div className="rounded-2xl border border-navy-light bg-gradient-to-b from-navy to-obsidian p-6 shadow-2xl space-y-5">
                {/* Top Info Bar */}
                <div className="flex items-center justify-between border-b border-navy-light/40 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-copper">{currentCard.title}</span>
                    <span className="px-2 py-0.5 rounded bg-coral-reaction/20 text-coral-reaction text-[10px] font-mono font-bold">
                      {currentCard.errorLevel === 1 ? 'Mức 1: Nhận biết' : currentCard.errorLevel === 2 ? 'Mức 2: Thông hiểu' : 'Mức 3: Vận dụng'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-ivory-muted">
                    Chu kỳ hiện tại: {currentCard.intervalDays} ngày
                  </span>
                </div>

                {/* Question Text */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-cyan-ion tracking-wider font-bold">CÂU HỎI TỔNG HỢP:</span>
                  <h3 className="font-serif text-lg font-bold text-ivory leading-relaxed">
                    {currentCard.question}
                  </h3>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {currentCard.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === currentCard.correctAnswer;
                    let optClass = 'bg-navy/70 border-navy-light hover:border-cyan-ion/60 text-ivory';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        optClass = 'bg-lime-mineral/20 border-lime-mineral text-lime-mineral font-bold';
                      } else if (isSelected) {
                        optClass = 'bg-coral-reaction/20 border-coral-reaction text-coral-reaction';
                      } else {
                        optClass = 'opacity-40 border-navy-light/30 text-ivory-muted';
                      }
                    } else if (isSelected) {
                      optClass = 'bg-cyan-ion/20 border-cyan-ion text-cyan-ion font-semibold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${optClass}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer Explanation Box */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-navy-dark/90 border border-navy-light/60 text-xs font-mono space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold">
                      {selectedAnswer === currentCard.correctAnswer ? (
                        <span className="text-lime-mineral flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác! (+25 Knowledge XP)
                        </span>
                      ) : (
                        <span className="text-coral-reaction flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Chưa chính xác! Lịch ôn tập đã được đặt lại 1 ngày.
                        </span>
                      )}
                    </div>
                    <p className="text-ivory-muted font-sans leading-relaxed border-t border-navy-light/30 pt-2">
                      <strong className="text-ivory">Giải thích khoa học: </strong>
                      {currentCard.explanation}
                    </p>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {!isAnswerSubmitted ? (
                    <button
                      disabled={!selectedAnswer}
                      onClick={handleSubmitAnswer}
                      className="px-6 py-2.5 rounded-xl bg-cyan-ion text-obsidian font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all hover:scale-105"
                    >
                      Kiểm Tra Đáp Án
                    </button>
                  ) : (
                    <button
                      onClick={handleNextCard}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-copper to-coral-reaction text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
                    >
                      Câu Hỏi Tiếp Theo
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Forgetting Curve Theoretical Basis */}
          <div className="rounded-xl border border-navy-light/40 bg-navy/30 p-4 text-xs space-y-2">
            <h4 className="font-serif font-bold text-copper flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Cơ Sở Khoa Học Của Thuật Toán CA-SRS:</span>
            </h4>
            <p className="text-ivory-muted leading-relaxed">
              Được xây dựng từ mô hình đường cong quên lãng Hermann Ebbinghaus (1885) và nghiên cứu hồi quy chu kỳ bán rã (Half-Life Regression, Settles & Meeder ACL 2016). Thay vì kiểm tra ngẫu nhiên, hệ thống tự động giãn khoảng cách ôn tập (1 ngày → 3 ngày → 7 ngày → 14 ngày) dựa trên mức độ nghiêm trọng của lỗi sai, biến sai lầm trên bàn đấu thành phản xạ bản năng.
            </p>
          </div>
        </div>
      )}

      {/* MODE 2: TEACHER & CLASS ANALYTICS DASHBOARD */}
      {activeMode === 'teacher' && (
        <div className="space-y-6">
          {/* Header Tag */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-copper/15 border border-copper/30 text-xs">
            <div className="flex items-center gap-2 text-copper font-bold">
              <Users className="w-4 h-4" />
              <span>BẢNG ĐIỀU KHIỂN SƯ PHẠM — DỮ LIỆU ĐÁNH GIÁ LỚP HỌC</span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-copper/20 text-copper border border-copper/40 font-bold">
              [SIMULATED DATA: LỚP 10A1 — 35 HỌC SINH]
            </span>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-navy border border-navy-light/60 space-y-1">
              <span className="text-[10px] font-mono text-ivory-muted uppercase">Tỷ Lệ Duy Trì Trí Nhớ (Retention Rate)</span>
              <div className="text-2xl font-bold font-mono text-lime-mineral">81.4%</div>
              <span className="text-[10px] text-ivory-muted block">+14.2% so với học truyền thống</span>
            </div>

            <div className="p-4 rounded-xl bg-navy border border-navy-light/60 space-y-1">
              <span className="text-[10px] font-mono text-ivory-muted uppercase">Khái Niệm Đạt Vững Chắc (&gt;14 ngày)</span>
              <div className="text-2xl font-bold font-mono text-cyan-ion">428</div>
              <span className="text-[10px] text-ivory-muted block">Trung bình 12.2 khái niệm / học sinh</span>
            </div>

            <div className="p-4 rounded-xl bg-navy border border-navy-light/60 space-y-1">
              <span className="text-[10px] font-mono text-ivory-muted uppercase">Cạm Bẫy Phổ Biến Nhất</span>
              <div className="text-2xl font-bold font-mono text-coral-reaction">Cu + HCl</div>
              <span className="text-[10px] text-coral-reaction/80 block">68% học sinh mắc lỗi ở lần đầu</span>
            </div>

            <div className="p-4 rounded-xl bg-navy border border-navy-light/60 space-y-1">
              <span className="text-[10px] font-mono text-ivory-muted uppercase">Thời Lượng Luyện Tập / Tuần</span>
              <div className="text-2xl font-bold font-mono text-copper">42 phút</div>
              <span className="text-[10px] text-ivory-muted block">Phân bổ 6 phút / ngày (Micro-learning)</span>
            </div>
          </div>

          {/* 5 Core Curriculum Competency Bars */}
          <div className="p-5 rounded-2xl bg-navy/80 border border-navy-light/60 space-y-4">
            <h3 className="font-serif text-sm font-bold text-ivory uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-copper" />
                <span>Mức Độ Nắm Vững 5 Cụm Năng Lực Cốt Lõi (GDPT 2018)</span>
              </span>
              <span className="text-xs font-mono text-ivory-muted">Ngưỡng đạt chuẩn: ≥ 70%</span>
            </h3>

            <div className="space-y-3.5">
              {[
                {
                  title: '1. Phản ứng Oxi hóa - Khử & Dãy Hoạt Động Hóa Học',
                  desc: 'Zn + Cu²⁺, Fe + Cu²⁺, thế điện cực chuẩn E°, quy tắc alpha',
                  rate: 84,
                  status: 'Tốt',
                  color: 'bg-lime-mineral'
                },
                {
                  title: '2. Phản ứng Trao Đổi Ion & Điều Kiện Tạo Kết Tủa',
                  desc: 'Ba²⁺ + SO₄²⁻ -> BaSO₄↓, Ag⁺ + Cl⁻ -> AgCl↓, bảng tính tan',
                  rate: 78,
                  status: 'Khá',
                  color: 'bg-cyan-ion'
                },
                {
                  title: '3. Phản ứng Axit - Bazơ & Thang Đo pH',
                  desc: 'H⁺ + OH⁻ -> H₂O, tính lưỡng tính của Al(OH)₃, trung hòa',
                  rate: 89,
                  status: 'Rất Tốt',
                  color: 'bg-lime-mineral'
                },
                {
                  title: '4. Cơ Chế Ăn Mòn Điện Hóa & Gỉ Kim Loại',
                  desc: '4Fe + 3O₂ + 2xH₂O -> 2Fe₂O₃·xH₂O, vai trò màng điện ly',
                  rate: 64,
                  status: 'Cần củng cố',
                  color: 'bg-coral-reaction'
                },
                {
                  title: '5. Xu Hướng Biến Đổi Bảng Tuần Hoàn',
                  desc: 'Độ âm điện χ, năng lượng ion hóa I₁, bán kính nguyên tử r',
                  rate: 72,
                  status: 'Đạt',
                  color: 'bg-copper'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-obsidian/70 border border-navy-light/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-ivory block">{item.title}</strong>
                      <span className="text-[11px] text-ivory-muted font-mono">{item.desc}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-ivory text-sm">{item.rate}%</span>
                      <span className={`block text-[10px] font-bold ${
                        item.rate >= 80 ? 'text-lime-mineral' : item.rate >= 70 ? 'text-copper' : 'text-coral-reaction'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-navy overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Actionable Insights */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-navy to-obsidian border border-navy-light/60 space-y-3">
            <h4 className="font-serif font-bold text-copper flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-copper" />
              <span>Khuyến Nghị Sư Phạm Tự Động Dành Cho Giáo Viên:</span>
            </h4>
            <div className="space-y-2 text-xs text-ivory leading-relaxed">
              <div className="p-3 rounded-xl bg-navy/60 border border-coral-reaction/30">
                <strong className="text-coral-reaction block mb-1">
                  1. Điểm nghẽn nhận thức: Điều kiện ẩm trong ăn mòn điện hóa (Tỷ lệ sai 36%)
                </strong>
                <p className="text-ivory-muted text-[11px]">
                  Học sinh thường quên thẻ H₂O khi thực hiện phản ứng gỉ sắt trên đấu trường, chỉ ghép Fe + O₂ dẫn đến phản ứng cháy khan tạo oxit sắt từ Fe₃O₄ chứ không tạo gỉ xốp Fe₂O₃·xH₂O.
                  <br />
                  <span className="text-copper font-semibold">Hành động đề xuất:</span> Tổ chức 10 phút thảo luận đầu giờ về sự khác biệt giữa đốt sắt trong oxi tinh khiết và để đinh sắt ngoài không khí ẩm.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-navy/60 border border-lime-mineral/30">
                <strong className="text-lime-mineral block mb-1">
                  2. Điểm mạnh vượt trội: Quy tắc Alpha và Phản ứng trao đổi
                </strong>
                <p className="text-ivory-muted text-[11px]">
                  Nhờ cơ chế tương tác trực quan kéo thả trong ELEMENTA, 92% học sinh giải thích chính xác tại sao BaSO₄ và AgCl kết tủa dựa trên liên kết tĩnh điện ion mà không cần học vẹt bảng tính tan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: COMMUNITY GOVERNANCE & SCIENTIFIC INVARIANCE */}
      {activeMode === 'governance' && (
        <div className="space-y-6">
          {/* Scientific Invariance Manifesto Header */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-dark via-navy to-obsidian border border-lime-mineral/40 space-y-3">
            <div className="flex items-center gap-2.5 text-lime-mineral font-bold">
              <ShieldAlert className="w-5 h-5 text-lime-mineral" />
              <span className="font-serif text-base uppercase">Hiến Chương Bất Biến Khoa Học (Scientific Invariance Principle)</span>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Trong ELEMENTA, cộng đồng người chơi và giáo viên có toàn quyền biểu quyết dân chủ về <strong className="text-ivory">thông số gameplay</strong> (thời gian hồi chiêu, hoạt ảnh VFX, màu sắc, âm thanh, cân bằng thẻ bài). Tuy nhiên, <strong className="text-coral-reaction">chân lý khoa học</strong> (thế điện cực chuẩn E°, quy tắc bảo toàn khối lượng và điện tích, định luật tuần hoàn Mendeleev, tính trơ của khí hiếm) là <strong className="text-coral-reaction">BẤT BIẾN</strong> và <strong className="text-coral-reaction">TUYỆT ĐỐI KHÔNG THỂ BỊ THAY ĐỔI QUA BỎ PHIẾU</strong>.
            </p>
          </div>

          {/* Proposals List */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold text-ivory uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Vote className="w-4 h-4 text-copper" />
                <span>Danh Sách Đề Xuất Cân Bằng & Sửa Đổi Từ Cộng Đồng ({proposals.length})</span>
              </span>
              <span className="text-xs font-mono text-ivory-muted">Quy chế: Quyết định bởi AI Thẩm Định + Biểu Quyết</span>
            </h3>

            <div className="space-y-4">
              {proposals.map((prop) => (
                <div
                  key={prop.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    prop.isScientificLaw
                      ? 'bg-navy/40 border-coral-reaction/40 hover:border-coral-reaction/70'
                      : 'bg-navy/70 border-navy-light/60 hover:border-cyan-ion/60'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-light/30 pb-2.5">
                    <div className="flex items-center gap-2">
                      {prop.isScientificLaw ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-coral-reaction/20 text-coral-reaction border border-coral-reaction/40 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> BẤT BIẾN KHOA HỌC (LOCKED)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Vote className="w-3 h-3" /> GAMEPLAY VARIABLE (OPEN)
                        </span>
                      )}

                      <span className="text-xs font-bold text-ivory">{prop.title}</span>
                    </div>

                    <span className="text-[10px] font-mono text-ivory-muted">
                      Đề xuất bởi: <span className="text-copper">{prop.proposer}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ivory-muted leading-relaxed">
                    {prop.description}
                  </p>

                  {/* AI Scientific Verification Verdict */}
                  <div className={`p-3 rounded-xl text-xs font-mono space-y-1 ${
                    prop.isScientificLaw
                      ? 'bg-coral-reaction/10 border border-coral-reaction/30 text-coral-reaction'
                      : 'bg-navy-dark/80 border border-navy-light/40 text-ivory'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      {prop.isScientificLaw ? (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>HỆ THỐNG TỪ CHỐI TỰ ĐỘNG THEO NGUYÊN TẮC BẤT BIẾN:</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime-mineral" />
                          <span className="text-lime-mineral">HỢP LỆ VỚI NGUYÊN TẮC BẤT BIẾN KHOA HỌC:</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] font-sans leading-relaxed text-ivory-muted">
                      {prop.scientificExplanation}
                    </p>
                  </div>

                  {/* Voting Actions */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-lime-mineral font-bold flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5" /> {prop.votesFor} Tán thành
                      </span>
                      <span className="text-coral-reaction font-bold flex items-center gap-1">
                        <ThumbsDown className="w-3.5 h-3.5" /> {prop.votesAgainst} Phản đối
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={prop.isScientificLaw}
                        onClick={() => handleVote(prop.id, 'for')}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1 ${
                          prop.userVoted === 'for'
                            ? 'bg-lime-mineral text-obsidian border-lime-mineral font-bold'
                            : 'bg-obsidian border-navy-light text-ivory hover:border-lime-mineral disabled:opacity-30'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" /> Tán thành
                      </button>

                      <button
                        disabled={prop.isScientificLaw}
                        onClick={() => handleVote(prop.id, 'against')}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1 ${
                          prop.userVoted === 'against'
                            ? 'bg-coral-reaction text-white border-coral-reaction font-bold'
                            : 'bg-obsidian border-navy-light text-ivory hover:border-coral-reaction disabled:opacity-30'
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" /> Bác bỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIAGNOSTIC PLACEMENT TEST MODAL */}
      {isDiagnosticActive && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border-2 border-cyan-500 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <h3 className="font-serif font-black text-lg text-cyan-200">
                  Khảo Sát Năng Lực & Chẩn Đoán Khái Niệm GDPT 2018
                </h3>
              </div>
              <button
                onClick={handleCloseDiagnostic}
                className="text-slate-400 hover:text-white font-mono font-bold px-2 py-1"
              >
                ✕ ĐÓNG
              </button>
            </div>

            {!diagResult ? (
              /* Active Test Taking View */
              (() => {
                const currentQ = diagnosticQuestions[diagCurrentIdx];
                if (!currentQ) return null;
                const userPicked = diagAnswers[currentQ.id];

                return (
                  <div className="space-y-4">
                    {/* Progress Bar & Badges */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-400 text-blue-200 font-bold">
                          {currentQ.gradeNameVI}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-400/60 text-amber-300 font-bold">
                          {currentQ.errorLevel === 1 ? 'Mức 1: Nhận Biết' : currentQ.errorLevel === 2 ? 'Mức 2: Thông Hiểu' : 'Mức 3: Vận Dụng'}
                        </span>
                      </div>
                      <span className="text-slate-400">
                        Câu {diagCurrentIdx + 1} / {diagnosticQuestions.length}
                      </span>
                    </div>

                    {/* Topic & Question */}
                    <div className="space-y-1 bg-black/40 p-4 rounded-xl border border-white/5">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                        Chủ đề: {currentQ.topicVI}
                      </span>
                      <p className="text-sm text-slate-100 font-bold leading-relaxed">
                        {currentQ.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {currentQ.options.map((opt: string, idx: number) => {
                        const isPicked = userPicked === opt;
                        return (
                          <button
                            key={`diag_opt_${idx}`}
                            onClick={() => handleSelectDiagOption(opt)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                              isPicked
                                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-md ring-1 ring-cyan-400'
                                : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-cyan-500'
                            }`}
                          >
                            <span>{opt}</span>
                            {isPicked && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-[11px] font-mono text-slate-400">
                        {userPicked ? '✓ Đã chọn đáp án' : 'Chọn 1 phương án để tiếp tục'}
                      </span>
                      <button
                        disabled={!userPicked}
                        onClick={handleNextDiagQuestion}
                        className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow ${
                          userPicked
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <span>{diagCurrentIdx < diagnosticQuestions.length - 1 ? 'Câu Tiếp Theo' : 'Nộp Bài Khảo Sát'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Diagnostic Result & Competency Report View */
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-b from-navy to-black border border-cyan-500/50 flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-400 text-cyan-300 font-serif font-black text-2xl flex items-center justify-center shadow-lg shadow-cyan-950/50">
                    {diagResult.score}%
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white">
                    {diagResult.competencyTitleVI}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                    {diagResult.pedagogicalAdviceVI}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-400 text-amber-300 font-bold">
                      +{diagResult.earnedXp} EXP
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold">
                      +{diagResult.earnedTokens} Knowledge Tokens
                    </span>
                  </div>
                </div>

                {/* GDPT 2018 Recommended Curriculum Tier Badge */}
                {(() => {
                  const recommendation = CurriculumDiagnosticService.recommendStartingTier(diagResult);
                  return (
                    <div className="p-3.5 rounded-xl bg-sky-950/60 border border-sky-500/40 text-xs flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <strong className="text-sky-200">
                            {recommendation.titleVI}
                          </strong>
                          <span className="px-2 py-0.5 rounded-full bg-sky-900 border border-sky-400 text-sky-200 font-mono text-[10px] font-bold">
                            {recommendation.gradeNameVI}
                          </span>
                        </div>
                        <span className="text-slate-300 text-[11px] leading-relaxed block">
                          {recommendation.reasoningVI}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Newly Seeded SRS Flashcards Notice */}
                {diagResult.generatedSrsItems.length > 0 ? (
                  <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-purple-200 block mb-0.5">
                        Đã bổ sung {diagResult.generatedSrsItems.length} thẻ bài chẩn đoán vào hàng đợi ôn tập CA-SRS!
                      </strong>
                      <span className="text-slate-300 text-[11px] leading-relaxed block">
                        Các lỗ hổng kiến thức phát hiện trong bài khảo sát đã được gán trọng số suy giảm trí nhớ Ebbinghaus theo thang Bloom để bạn ôn luyện ngay trong tab Học Sinh.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-lime-950/60 border border-lime-500/40 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lime-400 flex-shrink-0" />
                    <span className="text-lime-200 font-bold">
                      Hoàn hảo! Bạn trả lời đúng 100% tất cả các câu hỏi khảo sát trong đợt này.
                    </span>
                  </div>
                )}

                <button
                  onClick={handleCloseDiagnostic}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-obsidian font-bold text-xs transition-all shadow-md"
                >
                  Hoàn Tất & Xem Hàng Đợi Ôn Tập
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
