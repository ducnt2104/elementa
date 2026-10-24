// src/domain/curriculumDiagnostic.ts
// Domain service for GDPT 2018 Adaptive Curriculum Diagnostic Testing & CA-SRS Seeding

import {
  CurriculumGrade,
  DiagnosticQuestion,
  DIAGNOSTIC_QUESTION_BANK
} from '../data/curriculumDiagnosticData';
import { SrsItem, CognitiveErrorLevel } from './types';
import { SpacedRepetitionService } from './spacedRepetition';

export type { CurriculumGrade, DiagnosticQuestion };

export interface GradePerformance {
  grade: CurriculumGrade;
  gradeNameVI: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface CognitivePerformance {
  level: CognitiveErrorLevel;
  levelNameVI: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface DiagnosticEvaluationResult {
  score: number; // 0 - 100%
  correctCount: number;
  totalCount: number;
  gradeBreakdown: Record<CurriculumGrade, GradePerformance>;
  cognitiveBreakdown: Record<CognitiveErrorLevel, CognitivePerformance>;
  missedQuestions: {
    question: DiagnosticQuestion;
    userAnswer: string;
    correctAnswer: string;
  }[];
  generatedSrsItems: SrsItem[];
  competencyTitleVI: string;
  pedagogicalAdviceVI: string;
  earnedXp: number;
  earnedTokens: number;
}

export class CurriculumDiagnosticService {
  /**
   * Generates a balanced set of diagnostic questions.
   * Ensures coverage across requested grade filters and cognitive levels.
   */
  public static generateDiagnosticSession(
    gradeFilter: 'ALL' | CurriculumGrade = 'ALL',
    questionCount: number = 6
  ): DiagnosticQuestion[] {
    let pool = [...DIAGNOSTIC_QUESTION_BANK];

    if (gradeFilter !== 'ALL') {
      pool = pool.filter(q => q.grade === gradeFilter);
    }

    // Deterministic shuffle with pseudo-entropy
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
  }

  /**
   * Evaluates user responses to a diagnostic session and synthesizes personalized CA-SRS items.
   */
  public static evaluateDiagnosticSession(
    answers: Record<string, string>,
    questions: DiagnosticQuestion[]
  ): DiagnosticEvaluationResult {
    let correctCount = 0;
    const missedQuestions: DiagnosticEvaluationResult['missedQuestions'] = [];
    const generatedSrsItems: SrsItem[] = [];

    // Initialize breakdowns
    const grades: CurriculumGrade[] = ['KHTN_8', 'KHTN_9', 'HOA_10', 'HOA_11_12'];
    const gradeBreakdown: Record<CurriculumGrade, GradePerformance> = {
      KHTN_8: { grade: 'KHTN_8', gradeNameVI: 'KHTN Lớp 8', total: 0, correct: 0, percentage: 0 },
      KHTN_9: { grade: 'KHTN_9', gradeNameVI: 'KHTN Lớp 9', total: 0, correct: 0, percentage: 0 },
      HOA_10: { grade: 'HOA_10', gradeNameVI: 'Hóa Học 10', total: 0, correct: 0, percentage: 0 },
      HOA_11_12: { grade: 'HOA_11_12', gradeNameVI: 'Hóa Học 11 - 12', total: 0, correct: 0, percentage: 0 }
    };

    const cognitiveBreakdown: Record<CognitiveErrorLevel, CognitivePerformance> = {
      1: { level: 1, levelNameVI: 'Mức 1: Nhận Biết', total: 0, correct: 0, percentage: 0 },
      2: { level: 2, levelNameVI: 'Mức 2: Thông Hiểu', total: 0, correct: 0, percentage: 0 },
      3: { level: 3, levelNameVI: 'Mức 3: Vận Dụng', total: 0, correct: 0, percentage: 0 }
    };

    for (const q of questions) {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;

      // Track grade stats
      gradeBreakdown[q.grade].total += 1;
      if (isCorrect) gradeBreakdown[q.grade].correct += 1;

      // Track cognitive stats
      cognitiveBreakdown[q.errorLevel].total += 1;
      if (isCorrect) cognitiveBreakdown[q.errorLevel].correct += 1;

      if (isCorrect) {
        correctCount += 1;
      } else {
        missedQuestions.push({
          question: q,
          userAnswer: userAnswer || '(Bỏ qua / Chưa trả lời)',
          correctAnswer: q.correctAnswer
        });

        // Seed new CA-SRS flashcard from this diagnostic gap
        const srsCard = SpacedRepetitionService.createItemFromMistake(
          q.targetSymbolOrReaction,
          q.targetSymbolOrReaction.includes('+') ? 'REACTION' : 'ELEMENT',
          `[Chẩn đoán ${q.gradeNameVI}] ${q.topicVI}`,
          q.question,
          q.correctAnswer,
          q.options,
          `${q.explanationVI} (Lời khuyên sư phạm: ${q.pedagogicalTipVI})`,
          q.errorLevel
        );

        // Immediate review required: due today for newly discovered gaps
        srsCard.dueDate = new Date().toISOString();
        generatedSrsItems.push(srsCard);
      }
    }

    // Calculate percentages
    for (const g of grades) {
      const b = gradeBreakdown[g];
      b.percentage = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
    }

    const levels: CognitiveErrorLevel[] = [1, 2, 3];
    for (const l of levels) {
      const c = cognitiveBreakdown[l];
      c.percentage = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0;
    }

    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

    // Competency determination
    let competencyTitleVI = '';
    let pedagogicalAdviceVI = '';

    if (score >= 85) {
      competencyTitleVI = 'Xuất Sắc — Tư Duy Hóa Học Vững Vàng GDPT 2018';
      pedagogicalAdviceVI = 'Bạn nắm rất chắc lý thuyết và vận dụng nhuần nhuyễn. Hãy thử sức ở các chế độ Đấu Hạng Rank Master và Đấu Trùm Chiến Dịch để phát huy tối đa tiềm năng!';
    } else if (score >= 65) {
      competencyTitleVI = 'Khá — Nền Tảng Tốt, Cần Lưu Tâm Cạm Bẫy Nhận Thức';
      pedagogicalAdviceVI = 'Kiến thức cốt lõi của bạn đã tương đối đầy đủ. Các lỗi sai thường nằm ở các bẫy nhận thức (như Cu + HCl hoặc Le Chatelier). Hệ thống CA-SRS đã tự động tạo thẻ ôn tập giúp bạn khắc phục!';
    } else if (score >= 45) {
      competencyTitleVI = 'Trung Bình — Cần Tăng Cường Ôn Luyện Thường Xuyên';
      pedagogicalAdviceVI = 'Bạn cần củng cố lại các định luật bảo toàn khối lượng, electron và dãy hoạt động hóa học. Hãy hoàn thành các thẻ bài ôn tập mỗi ngày để ghi nhớ lâu dài.';
    } else {
      competencyTitleVI = 'Khởi Động — Hãy Bắt Đầu Từ Các Khái Niệm Cơ Bản';
      pedagogicalAdviceVI = 'Đừng nản lòng! Hóa học là môn khoa học thực nghiệm tuyệt vời. Hệ thống đã đưa các kiến thức bị hổng vào chu kỳ ôn tập Spaced Repetition để bạn nắm vững từng bước.';
    }

    // Rewards proportional to effort and score
    const earnedXp = 50 + correctCount * 15;
    const earnedTokens = 20 + correctCount * 10;

    return {
      score,
      correctCount,
      totalCount: questions.length,
      gradeBreakdown,
      cognitiveBreakdown,
      missedQuestions,
      generatedSrsItems,
      competencyTitleVI,
      pedagogicalAdviceVI,
      earnedXp,
      earnedTokens
    };
  }

  /**
   * Recommends the optimal GDPT 2018 curriculum entry tier based on diagnostic breakdown
   */
  public static recommendStartingTier(result: DiagnosticEvaluationResult): {
    recommendedGrade: CurriculumGrade;
    gradeNameVI: string;
    titleVI: string;
    reasoningVI: string;
    masteryPercentage: number;
  } {
    const grades: CurriculumGrade[] = ['KHTN_8', 'KHTN_9', 'HOA_10', 'HOA_11_12'];
    const gradeNames: Record<CurriculumGrade, string> = {
      KHTN_8: 'KHTN Lớp 8',
      KHTN_9: 'KHTN Lớp 9',
      HOA_10: 'Hóa Học 10',
      HOA_11_12: 'Hóa Học 11 - 12'
    };

    // Find the first tier where the student tested below 70%
    for (const g of grades) {
      const perf = result.gradeBreakdown[g];
      if (perf && perf.total > 0 && perf.percentage < 70) {
        let reasoning = '';
        if (g === 'KHTN_8') {
          reasoning = 'Bạn cần củng cố nền tảng KHTN 8 (nguyên tử, phân tử, định luật bảo toàn khối lượng, mol và nồng độ dung dịch) trước khi bước vào các chủ đề nâng cao.';
        } else if (g === 'KHTN_9') {
          reasoning = 'Bạn đã nắm cơ bản KHTN 8. Đề xuất tập trung củng cố KHTN 9 (dãy hoạt động hóa học của kim loại, phân loại vô cơ và hóa học hữu cơ sơ khai).';
        } else if (g === 'HOA_10') {
          reasoning = 'Bạn có nền tảng THCS vững. Hãy bắt đầu từ Hóa học 10 (cấu hình electron, bảng tuần hoàn, liên kết hóa học VSEPR và cân bằng phản ứng oxi hóa - khử).';
        } else {
          reasoning = 'Bạn đã thông hiểu kiến thức lớp 10. Hãy thử thách với Hóa học 11-12 (cân bằng hóa học Le Chatelier, động học Arrhenius, este - lipit và điện hóa học).';
        }
        return {
          recommendedGrade: g,
          gradeNameVI: gradeNames[g],
          titleVI: `Đề xuất lộ trình: ${gradeNames[g]}`,
          reasoningVI: reasoning,
          masteryPercentage: perf.percentage
        };
      }
    }

    // If student scored >= 70% on all tested tiers
    const testedGrades = grades.filter(g => result.gradeBreakdown[g].total > 0);
    const highestTested = testedGrades[testedGrades.length - 1] || 'KHTN_8';

    if (highestTested === 'HOA_11_12' && result.gradeBreakdown.HOA_11_12.percentage >= 70) {
      return {
        recommendedGrade: 'HOA_11_12',
        gradeNameVI: 'Hóa Học 11 - 12 (Chuyên Sâu)',
        titleVI: 'Bậc Thầy Hóa Học GDPT 2018 — Sẵn Sàng Thi Đấu Đỉnh Cao',
        reasoningVI: 'Bạn đã chứng minh năng lực xuất sắc trên toàn bộ các khối lớp. Đề xuất: Tham gia Đấu Trường Rank Master, chinh phục chế độ Boss Chiến Dịch và tham gia Nghiên Cứu Sáng Tạo!',
        masteryPercentage: result.score
      };
    }

    // Advance to next grade beyond highest tested
    const nextGradeMap: Record<CurriculumGrade, CurriculumGrade> = {
      KHTN_8: 'KHTN_9',
      KHTN_9: 'HOA_10',
      HOA_10: 'HOA_11_12',
      HOA_11_12: 'HOA_11_12'
    };
    const nextGrade = nextGradeMap[highestTested];
    return {
      recommendedGrade: nextGrade,
      gradeNameVI: gradeNames[nextGrade],
      titleVI: `Đề xuất bứt phá: Tiến lên ${gradeNames[nextGrade]}`,
      reasoningVI: `Bạn đã làm chủ hoàn hảo ${gradeNames[highestTested]} (${result.gradeBreakdown[highestTested].percentage}%). Hãy sẵn sàng tiếp thu các kiến thức mới thuộc ${gradeNames[nextGrade]}!`,
      masteryPercentage: result.gradeBreakdown[highestTested].percentage
    };
  }
}
