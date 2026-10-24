// src/components/visualizations/CurriculumMasteryVisualizer.tsx
// Interactive GDPT 2018 Curriculum Mastery, 18-Topic Competency Matrix & Diagnostic Roadmap Visualizer
// Strictly conforming to Vietnam MOET Circular 06/2024/TT-BGDDT & 24/2025/TT-BGDDT Standards

import React, { useState } from 'react';
import {
  CURRICULUM_TOPICS,
  DIAGNOSTIC_QUESTIONS,
  evaluateDiagnosticExam,
  GradeLevel,
  CurriculumTopic
} from '../../domain/curriculumMasteryEngine';
import { sound } from '../../audio/soundEngine';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Target
} from 'lucide-react';

export type CurriculumVisualizerMode = 'CURRICULUM_MATRIX' | 'DIAGNOSTIC_EXAM' | 'COMPETENCY_REPORT_ROADMAP';

export interface CurriculumMasteryVisualizerProps {
  onNavigateToTab?: (tab: string) => void;
}

export const CurriculumMasteryVisualizer: React.FC<CurriculumMasteryVisualizerProps> = ({ onNavigateToTab }) => {
  const [activeMode, setActiveMode] = useState<CurriculumVisualizerMode>('CURRICULUM_MATRIX');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'ALL' | GradeLevel>('ALL');

  // Mode 2 state: Diagnostic quiz responses
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);

  // Filtered topics
  const filteredTopics = selectedGradeFilter === 'ALL'
    ? CURRICULUM_TOPICS
    : CURRICULUM_TOPICS.filter(t => t.grade === selectedGradeFilter);

  // Calculate assessment result
  const formattedAnswers = Object.entries(userAnswers).map(([qId, optIdx]) => ({
    questionId: qId,
    selectedOptionIndex: optIdx
  }));
  const assessmentResult = evaluateDiagnosticExam(formattedAnswers);

  const handleSelectAnswer = (questionId: string, optionIdx: number) => {
    sound.playUiClick();
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleResetExam = () => {
    sound.playUiClick();
    setUserAnswers({});
    setIsExamSubmitted(false);
    setCurrentQuestionIdx(0);
  };

  const currentQ = DIAGNOSTIC_QUESTIONS[currentQuestionIdx];

  return (
    <div className="bg-obsidian-surface border border-emerald-500/30 rounded-2xl p-6 text-ivory shadow-2xl space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Bộ GD&ĐT Thông Tư 06/2024 & 24/2025
            </span>
            <span className="text-xs text-ivory-muted">National High School Chemistry Competency Framework</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400 mt-1">
            Ma Trận Chuẩn Hóa Chương Trình GDPT 2018 & Khảo Sát Năng Lực
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Bản đồ 18 chủ đề Hóa học 10-11-12, bài thi chuẩn đoán 4 mức độ năng lực và lộ trình khắc phục lỗ hổng kiến thức
          </p>
        </div>

        {/* MODE NAVIGATION TABS */}
        <div className="flex items-center bg-obsidian-deep/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('CURRICULUM_MATRIX');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'CURRICULUM_MATRIX'
                ? 'bg-emerald-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Ma Trận 18 Chủ Đề</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('DIAGNOSTIC_EXAM');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'DIAGNOSTIC_EXAM'
                ? 'bg-emerald-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>2. Khảo Sát Năng Lực</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('COMPETENCY_REPORT_ROADMAP');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'COMPETENCY_REPORT_ROADMAP'
                ? 'bg-emerald-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. Báo Cáo & Lộ Trình</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: 18 CURRICULUM TOPICS MATRIX                                      */}
      {/* ========================================================================= */}
      {activeMode === 'CURRICULUM_MATRIX' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Grade Level Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-obsidian-deep/80 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  sound.playUiClick();
                  setSelectedGradeFilter('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGradeFilter === 'ALL'
                    ? 'bg-emerald-500 text-obsidian font-extrabold shadow'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Tất Cả (18 Chủ Đề)
              </button>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setSelectedGradeFilter('GRADE_10');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGradeFilter === 'GRADE_10'
                    ? 'bg-emerald-500 text-obsidian font-extrabold shadow'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Lớp 10 (7 Chủ Đề)
              </button>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setSelectedGradeFilter('GRADE_11');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGradeFilter === 'GRADE_11'
                    ? 'bg-emerald-500 text-obsidian font-extrabold shadow'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Lớp 11 (6 Chủ Đề)
              </button>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setSelectedGradeFilter('GRADE_12');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGradeFilter === 'GRADE_12'
                    ? 'bg-emerald-500 text-obsidian font-extrabold shadow'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Lớp 12 (5 Chủ Đề)
              </button>
            </div>

            <div className="text-xs text-ivory-muted font-mono">
              Hiển thị: <strong className="text-emerald-400">{filteredTopics.length}</strong> / 18 Chủ đề
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map(topic => (
              <div
                key={topic.id}
                className="bg-obsidian-deep/80 rounded-xl border border-white/10 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 text-emerald-300 border border-white/10">
                      {topic.grade.replace('GRADE_', 'Lớp ')} • Chủ đề {topic.topicNumber}
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                      Trọng số thi: {topic.nationalExamWeightPercent}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-ivory">{topic.titleVi}</h3>
                  <p className="text-xs text-ivory-muted leading-relaxed line-clamp-2">{topic.descriptionVi}</p>

                  {/* Key concepts tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {topic.keyConcepts.map((concept, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono bg-obsidian-surface px-2 py-0.5 rounded border border-white/5 text-ivory-muted"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Visualizer Launch Action */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 truncate">
                    Tab: {topic.associatedVisualizerTab}
                  </span>
                  {onNavigateToTab && (
                    <button
                      onClick={() => {
                        sound.playUiClick();
                        onNavigateToTab(topic.associatedVisualizerTab);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 transition-all"
                    >
                      <span>Mở Lab</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: DIAGNOSTIC EXAM INTERFACE                                        */}
      {/* ========================================================================= */}
      {activeMode === 'DIAGNOSTIC_EXAM' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-obsidian-deep/90 p-4 rounded-xl border border-white/10">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">
                Tiến độ bài khảo sát năng lực hóa học
              </span>
              <div className="text-sm font-bold text-ivory mt-0.5">
                Câu hỏi {currentQuestionIdx + 1} / {DIAGNOSTIC_QUESTIONS.length}
              </div>
            </div>

            {/* Question navigator dots */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playUiClick();
                      setCurrentQuestionIdx(idx);
                    }}
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-all ${
                      currentQuestionIdx === idx
                        ? 'bg-emerald-500 text-obsidian shadow scale-110 font-black'
                        : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-obsidian-surface text-ivory-muted border border-white/10'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Question Card */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-emerald-500/30 p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/5 text-emerald-300 border border-white/10">
                {currentQ.grade.replace('GRADE_', 'Hóa Học Lớp ')} • Mức độ:{' '}
                {currentQ.level === 'RECOGNITION' && 'Nhận Biết'}
                {currentQ.level === 'COMPREHENSION' && 'Thông Hiểu'}
                {currentQ.level === 'APPLICATION' && 'Vận Dụng'}
                {currentQ.level === 'HIGH_APPLICATION' && 'Vận Dụng Cao'}
              </span>
              <span className="text-xs font-mono text-ivory-muted">
                {Object.keys(userAnswers).length} / {DIAGNOSTIC_QUESTIONS.length} đã trả lời
              </span>
            </div>

            {/* Question text */}
            <div className="text-base md:text-lg font-bold text-ivory leading-relaxed">
              {currentQ.questionVi}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.optionsVi.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const isSubmitted = isExamSubmitted;
                const isCorrect = optIdx === currentQ.correctOptionIndex;

                let btnStyle = 'bg-obsidian-surface/60 border-white/10 text-ivory hover:border-emerald-500/40';
                if (isSelected && !isSubmitted) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-lg';
                } else if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-500/20 border-red-400 text-red-200';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(currentQ.id, optIdx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm">{opt}</span>
                    </div>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation if submitted */}
            {isExamSubmitted && (
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1.5 text-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Giải thích chi tiết:</span>
                </div>
                <p className="text-ivory-muted leading-relaxed">{currentQ.explanationVi}</p>
                <div className="text-amber-300 pt-1">
                  <strong>Kiến thức trọng tâm:</strong> {currentQ.remedialConceptVi}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => {
                  sound.playUiClick();
                  setCurrentQuestionIdx(prev => Math.max(0, prev - 1));
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
              >
                Câu trước
              </button>

              <div className="flex items-center gap-3">
                {!isExamSubmitted ? (
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setIsExamSubmitted(true);
                      setActiveMode('COMPETENCY_REPORT_ROADMAP');
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-obsidian shadow-lg hover:brightness-110"
                  >
                    Nộp Bài & Xem Báo Cáo
                  </button>
                ) : (
                  <button
                    onClick={handleResetExam}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại bài thi</span>
                  </button>
                )}

                <button
                  disabled={currentQuestionIdx === DIAGNOSTIC_QUESTIONS.length - 1}
                  onClick={() => {
                    sound.playUiClick();
                    setCurrentQuestionIdx(prev => Math.min(DIAGNOSTIC_QUESTIONS.length - 1, prev + 1));
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-500/30"
                >
                  Câu tiếp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: COMPETENCY REPORT & PERSONALIZED ROADMAP                         */}
      {/* ========================================================================= */}
      {activeMode === 'COMPETENCY_REPORT_ROADMAP' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Score Banner */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-emerald-500/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                Đánh giá năng lực tổng quát GDPT 2018
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-ivory">
                {assessmentResult.competencyRankVi}
              </h3>
              <p className="text-xs text-ivory-muted">
                Đã trả lời đúng {assessmentResult.correctCount} / {assessmentResult.totalQuestions} câu hỏi chuẩn đoán
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center w-28 h-28 rounded-full border-4 border-emerald-500 bg-emerald-500/10 font-mono">
              <div className="text-center">
                <span className="text-3xl font-black text-emerald-300">{assessmentResult.scorePercentage}%</span>
                <span className="text-[10px] text-ivory-muted block">Điểm số</span>
              </div>
            </div>
          </div>

          {/* Grade Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-obsidian-deep/80 rounded-xl border border-white/10 p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-cyan-400">Kiến thức Lớp 10:</span>
                <span className="font-mono text-cyan-300">{assessmentResult.grade10ScorePercent}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${assessmentResult.grade10ScorePercent}%` }}
                />
              </div>
              <div className="text-[10px] text-ivory-muted">Nguyên tử, BTH, Liên kết, Oxi hóa - khử, Năng lượng, Tốc độ, Halogen</div>
            </div>

            <div className="bg-obsidian-deep/80 rounded-xl border border-white/10 p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-emerald-400">Kiến thức Lớp 11:</span>
                <span className="font-mono text-emerald-300">{assessmentResult.grade11ScorePercent}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${assessmentResult.grade11ScorePercent}%` }}
                />
              </div>
              <div className="text-[10px] text-ivory-muted">Cân bằng, pH/Acid-Base, N & S, Hydrocarbon, Dẫn xuất halogen, Carbonyl</div>
            </div>

            <div className="bg-obsidian-deep/80 rounded-xl border border-white/10 p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-amber-400">Kiến thức Lớp 12:</span>
                <span className="font-mono text-amber-300">{assessmentResult.grade12ScorePercent}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${assessmentResult.grade12ScorePercent}%` }}
                />
              </div>
              <div className="text-[10px] text-ivory-muted">Ester/Lipid, Carbohydrate, Amine/Peptide, Polymer, Điện hóa & Ăn mòn</div>
            </div>
          </div>

          {/* Personalized Remedial Roadmap */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-white/10 p-6 space-y-4">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Lộ trình học tập & Khắc phục lỗ hổng kiến thức đề xuất:
            </h4>
            <div className="space-y-2.5">
              {assessmentResult.personalizedRoadmapVi.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-obsidian-surface p-3.5 rounded-xl border border-white/5 flex items-start gap-3 text-xs leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-ivory-muted">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
