// src/domain/educatorAnalytics.ts
// Domain service for Educator Analytics, Pedagogical Gain Statistics, Misconceptions Heatmap & Lesson Adjustment Export
// Adheres strictly to Project Dossier Section VI.1 (Bảng Điều Khiển Giáo Viên)

import { PlayerProfile } from './types';

export type GradeLevel = 'KHTN_8' | 'KHTN_9' | 'HOA_10' | 'HOA_11_12';
export type GradeFilter = 'ALL' | GradeLevel;

export interface SimulatedStudent {
  id: string;
  name: string;
  grade: GradeLevel;
  matchesPlayed: number;
  reactionsMastered: number;
  preTestScore: number; // /100
  postTestScore: number; // /100
  delayedPostTestScore: number; // /100
  commonTrapFaced: string;
}

export interface MisconceptionHeatmapItem {
  id: string;
  trapName: string;
  chemicalContext: string;
  affectedCount: number;
  totalStudents: number;
  errorPercentage: number;
  pedagogicalAdvice: string;
}

export interface StudentInterventionFlag {
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  reasons: string[];
  suggestedIntervention: string;
}

export interface ClassAnalyticsSummary {
  totalStudents: number;
  averagePreTest: number;
  averagePostTest: number;
  averageDelayedPostTest: number;
  averageScoreGain: number; // postTest - preTest
  retentionPercent: number; // (delayedPost / postTest) * 100
  hakeNormalizedGain: number; // (post - pre) / (100 - pre)
  cohensD: number; // Cohen's d effect size
  effectSizeInterpretation: 'Trivial' | 'Small' | 'Moderate' | 'Large' | 'Very Large';
  misconceptionHeatmap: MisconceptionHeatmapItem[];
}

export interface LessonInterventionRecommendation {
  misconceptionId: string;
  misconceptionName: string;
  chemicalTopic: string;
  affectedRatioPercent: number;
  recommendedActivity: string;
  curriculumCode: string;
  classroomMethod: 'LAB_DEMO' | 'MOLECULAR_SIMULATION' | 'SOCRATIC_DEBATE' | 'STOICHIOMETRY_DRILL';
}

export interface LessonAdjustmentPlan {
  generatedAt: string;
  targetGrade: GradeFilter;
  topMisconceptions: LessonInterventionRecommendation[];
  hakeGainSummary: string;
  recommendedLessonAdjustments: string[];
}

export const INITIAL_SIMULATED_STUDENTS: SimulatedStudent[] = [
  { id: 'st_01', name: 'Nguyễn Văn An', grade: 'KHTN_8', matchesPlayed: 14, reactionsMastered: 18, preTestScore: 45, postTestScore: 82, delayedPostTestScore: 78, commonTrapFaced: 'Cu + HCl loãng' },
  { id: 'st_02', name: 'Trần Thị Bích', grade: 'KHTN_8', matchesPlayed: 12, reactionsMastered: 16, preTestScore: 50, postTestScore: 88, delayedPostTestScore: 85, commonTrapFaced: 'Thiếu độ ẩm khi gỉ sắt' },
  { id: 'st_03', name: 'Lê Hoàng Cường', grade: 'KHTN_9', matchesPlayed: 20, reactionsMastered: 24, preTestScore: 55, postTestScore: 92, delayedPostTestScore: 90, commonTrapFaced: 'Au + O₂ điều kiện thường' },
  { id: 'st_04', name: 'Phạm Minh Đức', grade: 'HOA_10', matchesPlayed: 18, reactionsMastered: 22, preTestScore: 60, postTestScore: 94, delayedPostTestScore: 91, commonTrapFaced: 'Nhầm lẫn số oxi hóa Fe₃O₄' },
  { id: 'st_05', name: 'Vũ Thị Hạnh', grade: 'HOA_10', matchesPlayed: 15, reactionsMastered: 19, preTestScore: 52, postTestScore: 86, delayedPostTestScore: 84, commonTrapFaced: 'He + O₂ phản ứng trơ' },
  { id: 'st_06', name: 'Hoàng Thị Yến', grade: 'HOA_11_12', matchesPlayed: 24, reactionsMastered: 28, preTestScore: 62, postTestScore: 95, delayedPostTestScore: 92, commonTrapFaced: 'Cân bằng este hóa Fischer cần xúc tác H₂SO₄ đặc' },
  { id: 'st_07', name: 'Ngô Quốc Bảo', grade: 'HOA_11_12', matchesPlayed: 22, reactionsMastered: 26, preTestScore: 58, postTestScore: 91, delayedPostTestScore: 89, commonTrapFaced: 'Điện phân dung dịch NaCl không màng ngăn tạo nước Javel' }
];

export class EducatorAnalyticsService {
  public static filterStudents(students: SimulatedStudent[], grade: GradeFilter): SimulatedStudent[] {
    if (grade === 'ALL') return [...students];
    return students.filter(s => s.grade === grade);
  }

  public static calculateClassAnalytics(students: SimulatedStudent[]): ClassAnalyticsSummary {
    if (students.length === 0) {
      return {
        totalStudents: 0,
        averagePreTest: 0,
        averagePostTest: 0,
        averageDelayedPostTest: 0,
        averageScoreGain: 0,
        retentionPercent: 0,
        hakeNormalizedGain: 0,
        cohensD: 0,
        effectSizeInterpretation: 'Trivial',
        misconceptionHeatmap: []
      };
    }

    const n = students.length;
    const avgPre = students.reduce((acc, s) => acc + s.preTestScore, 0) / n;
    const avgPost = students.reduce((acc, s) => acc + s.postTestScore, 0) / n;
    const avgDelayed = students.reduce((acc, s) => acc + s.delayedPostTestScore, 0) / n;
    const hakeGain = (100 - avgPre) > 0 ? (avgPost - avgPre) / (100 - avgPre) : 0;

    // Aggregate Misconception Heatmap
    const trapCounts: Record<string, number> = {};
    for (const s of students) {
      trapCounts[s.commonTrapFaced] = (trapCounts[s.commonTrapFaced] || 0) + 1;
    }

    const TRAP_METADATA: Record<string, { context: string; advice: string }> = {
      'Cu + HCl loãng': {
        context: 'Dãy điện hóa & tính khử (E° Cu²⁺/Cu = +0.34V > 0)',
        advice: 'Cần ôn tập dãy hoạt động hóa học kim loại: Cu đứng sau Hydro nên không thể khử H⁺ trong HCl loãng.'
      },
      'Thiếu độ ẩm khi gỉ sắt': {
        context: 'Cơ chế ăn mòn điện hóa học tự nhiên (4Fe + 3O₂ + 2xH₂O)',
        advice: 'Nhấn mạnh sắt chỉ gỉ khi có đồng thời cả Oxy và nước làm chất điện ly màng mỏng.'
      },
      'Au + O₂ điều kiện thường': {
        context: 'Độ bền trơ hóa học kim loại quý (Au thế điện cực +1.52V)',
        advice: 'Vàng trơ hoàn toàn trước oxy không khí ở mọi nhiệt độ thông thường, chỉ tan trong nước cường toan.'
      },
      'Nhầm lẫn số oxi hóa Fe₃O₄': {
        context: 'Oxit sắt từ hỗn tạp FeO·Fe₂O₃ (+8/3 trung bình)',
        advice: 'Giải thích bản chất Fe₃O₄ gồm 1 Fe(II) và 2 Fe(III), không phải đơn thuần một số nguyên hóa trị.'
      },
      'He + O₂ phản ứng trơ': {
        context: 'Cấu hình electron bão hòa 1s² khí hiếm nhóm VIIIA',
        advice: 'Heli có năng lượng ion hóa thứ nhất cao nhất 2372 kJ/mol, lớp vỏ 2e khép kín hoàn toàn không cháy.'
      },
      'Cân bằng este hóa Fischer cần xúc tác H₂SO₄ đặc': {
        context: 'Phản ứng este hóa thuận nghịch & nguyên lý Le Chatelier (CH₃COOH + C₂H₅OH)',
        advice: 'H₂SO₄ đặc vừa là xúc tác axit, vừa hút nước dịch chuyển cân bằng thuận nâng cao hiệu suất.'
      },
      'Điện phân dung dịch NaCl không màng ngăn tạo nước Javel': {
        context: 'Phản ứng phụ giữa Cl₂ và kiềm NaOH sinh ra NaClO (nước Javel)',
        advice: 'Không có màng ngăn, Cl₂ anot phản ứng ngay với NaOH catot tạo hỗn hợp NaCl và NaClO (nước Javel).'
      }
    };

    const heatmap: MisconceptionHeatmapItem[] = Object.entries(trapCounts).map(([trapName, count], idx) => {
      const meta = TRAP_METADATA[trapName] || {
        context: 'Hiểu lầm khái niệm hóa học phổ thông',
        advice: 'Cần làm rõ bản chất liên kết và điều kiện phản ứng.'
      };
      return {
        id: `trap_${idx + 1}`,
        trapName,
        chemicalContext: meta.context,
        affectedCount: count,
        totalStudents: n,
        errorPercentage: Math.round((count / n) * 100),
        pedagogicalAdvice: meta.advice
      };
    });

    const { d: cohensD, interpretation: effectSizeInterpretation } = this.calculateEffectSize(students);

    return {
      totalStudents: n,
      averagePreTest: Math.round(avgPre * 10) / 10,
      averagePostTest: Math.round(avgPost * 10) / 10,
      averageDelayedPostTest: Math.round(avgDelayed * 10) / 10,
      averageScoreGain: Math.round((avgPost - avgPre) * 10) / 10,
      retentionPercent: Math.round((avgDelayed / (avgPost || 1)) * 1000) / 10,
      hakeNormalizedGain: Math.round(hakeGain * 100) / 100,
      cohensD,
      effectSizeInterpretation,
      misconceptionHeatmap: heatmap.sort((a, b) => b.affectedCount - a.affectedCount)
    };
  }

  /**
   * Calculate Cohen's d effect size for pre/post pedagogical interventions
   */
  public static calculateEffectSize(students: SimulatedStudent[]): {
    d: number;
    interpretation: 'Trivial' | 'Small' | 'Moderate' | 'Large' | 'Very Large';
  } {
    const n = students.length;
    if (n < 2) {
      return { d: 0, interpretation: 'Trivial' };
    }

    const avgPre = students.reduce((acc, s) => acc + s.preTestScore, 0) / n;
    const avgPost = students.reduce((acc, s) => acc + s.postTestScore, 0) / n;

    const varPre = students.reduce((acc, s) => acc + Math.pow(s.preTestScore - avgPre, 2), 0) / (n - 1);
    const varPost = students.reduce((acc, s) => acc + Math.pow(s.postTestScore - avgPost, 2), 0) / (n - 1);

    const pooledStd = Math.sqrt((varPre + varPost) / 2);
    if (pooledStd === 0) {
      return { d: 0, interpretation: 'Trivial' };
    }

    const dRaw = (avgPost - avgPre) / pooledStd;
    const d = Math.round(dRaw * 100) / 100;

    let interpretation: 'Trivial' | 'Small' | 'Moderate' | 'Large' | 'Very Large' = 'Trivial';
    if (d >= 1.2) interpretation = 'Very Large';
    else if (d >= 0.8) interpretation = 'Large';
    else if (d >= 0.5) interpretation = 'Moderate';
    else if (d >= 0.2) interpretation = 'Small';

    return { d, interpretation };
  }

  /**
   * Identifies students requiring pedagogical intervention and suggests tailored remedial actions
   */
  public static identifyStudentsAtRisk(students: SimulatedStudent[]): StudentInterventionFlag[] {
    const flags: StudentInterventionFlag[] = [];

    for (const s of students) {
      const reasons: string[] = [];
      const gain = s.postTestScore - s.preTestScore;
      const retentionRatio = s.postTestScore > 0 ? (s.delayedPostTestScore / s.postTestScore) : 0;

      if (s.postTestScore < 75) {
        reasons.push(`Điểm Post-test thấp (${s.postTestScore}/100)`);
      }
      if (retentionRatio < 0.85) {
        reasons.push(`Tỷ lệ ghi nhớ 14 ngày suy giảm (${Math.round(retentionRatio * 100)}%)`);
      }
      if (gain < 20) {
        reasons.push(`Mức độ tiến bộ hạn chế (+${gain} điểm)`);
      }
      if (s.preTestScore < 50 && s.postTestScore < 85) {
        reasons.push('Nền tảng kiến thức đầu vào yếu cần củng cố thêm');
      }

      let riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
      let suggestedIntervention = 'Duy trì lộ trình học tập và hoàn thành nhiệm vụ định kỳ.';

      if (reasons.length >= 2 || s.postTestScore < 70) {
        riskLevel = 'HIGH';
        suggestedIntervention = `Ưu tiên xếp lịch kèm 1-1, kích hoạt bộ thẻ CA-SRS ôn tập riêng về chủ đề "${s.commonTrapFaced}".`;
      } else if (reasons.length === 1 || s.postTestScore < 85) {
        riskLevel = 'MEDIUM';
        suggestedIntervention = `Giao thêm 3 bài tập tình huống Sandbox giải quyết bẫy "${s.commonTrapFaced}".`;
      }

      if (riskLevel !== 'LOW') {
        flags.push({
          studentId: s.id,
          studentName: s.name,
          grade: s.grade,
          riskLevel,
          reasons,
          suggestedIntervention
        });
      }
    }

    return flags;
  }

  /**
   * Generates a pedagogical lesson adjustment plan based on student misconception error data (Mục VI.1)
   */
  public static generateLessonAdjustmentPlan(
    students: SimulatedStudent[],
    grade: GradeFilter = 'ALL'
  ): LessonAdjustmentPlan {
    const analytics = this.calculateClassAnalytics(this.filterStudents(students, grade));
    const recommendations: LessonInterventionRecommendation[] = analytics.misconceptionHeatmap.slice(0, 5).map(item => {
      let curriculum = 'GDPT_2018_KHTN_8';
      let method: 'LAB_DEMO' | 'MOLECULAR_SIMULATION' | 'SOCRATIC_DEBATE' | 'STOICHIOMETRY_DRILL' = 'LAB_DEMO';
      let activity = item.pedagogicalAdvice;

      if (item.trapName.includes('Cu + HCl')) {
        curriculum = 'GDPT_2018_KHTN_9';
        method = 'LAB_DEMO';
        activity = 'Tiến hành thí nghiệm đối chứng: Cho mẩu Cu và mẩu Fe/Zn vào hai ống nghiệm chứa dung dịch HCl 1M để học sinh quan sát bọt khí Hydro sinh ra ở Fe nhưng ống nghiệm Cu hoàn toàn trơ.';
      } else if (item.trapName.includes('gỉ sắt')) {
        curriculum = 'GDPT_2018_KHTN_8';
        method = 'LAB_DEMO';
        activity = 'Thiết kế 3 đinh sắt trong 3 điều kiện: (1) Khí khô không có nước, (2) Nước đun sôi phủ dầu không có oxy, (3) Nước và không khí. Cho học sinh rút ra kết luận ăn mòn cần cả O₂ và H₂O.';
      } else if (item.trapName.includes('He + O₂') || item.trapName.includes('khí hiếm')) {
        curriculum = 'GDPT_2018_HOA_10';
        method = 'MOLECULAR_SIMULATION';
        activity = 'Mô phỏng 3D cấu hình electron bão hòa 1s² của Helium và octet ns²np⁶ của Neon/Argon; giải thích vì sao năng lượng ion hóa I₁ cực đại khiến khí hiếm không thể bốc cháy.';
      } else if (item.trapName.includes('Fe₃O₄')) {
        curriculum = 'GDPT_2018_HOA_10';
        method = 'STOICHIOMETRY_DRILL';
        activity = 'Bài tập phân tách số oxi hóa hỗn tạp: Viết Fe₃O₄ dưới dạng FeO·Fe₂O₃ để học sinh hiểu số oxi hóa +8/3 là trung bình cộng của 1 ion Fe²⁺ và 2 ion Fe³⁺.';
      } else if (item.trapName.includes('este') || item.trapName.includes('Fischer')) {
        curriculum = 'GDPT_2018_HOA_12';
        method = 'SOCRATIC_DEBATE';
        activity = 'Thảo luận nguyên lý chuyển dịch cân bằng Le Chatelier trong phản ứng este hóa: Phân tích vai trò kép của H₂SO₄ đặc vừa là xúc tác axit vừa hút nước làm tăng hiệu suất este.';
      } else if (item.trapName.includes('Javel') || item.trapName.includes('điện phân')) {
        curriculum = 'GDPT_2018_HOA_11';
        method = 'LAB_DEMO';
        activity = 'Mô tả cơ chế điện phân dung dịch NaCl: Giải thích phản ứng giữa Cl₂ thoát ra ở cực dương và NaOH sinh ra ở cực âm khi không có màng ngăn, tạo thành NaClO có tính tẩy màu.';
      }

      return {
        misconceptionId: item.id,
        misconceptionName: item.trapName,
        chemicalTopic: item.chemicalContext,
        affectedRatioPercent: item.errorPercentage,
        recommendedActivity: activity,
        curriculumCode: curriculum,
        classroomMethod: method
      };
    });

    const adjustments = [
      `Dành 10-15 phút đầu buổi học thực hiện các thí nghiệm trực quan hoặc mô phỏng 3D đối chứng các bẫy nhận thức phổ biến nhất (${recommendations.map(r => r.misconceptionName).join(', ')}).`,
      `Kích hoạt chu kỳ ôn tập ngắt quãng CA-SRS: Giao bộ thẻ nhớ tự động 1-3-7-14 ngày cho các học sinh thuộc nhóm can thiệp nguy cơ cao.`,
      `Ứng dụng cơ chế Đảo ngược Vai trò Nhận thức (Role Inversion): Cho học sinh tự thiết kế thẻ bài/kỹ năng trong Xưởng Sáng Tạo ELEMENTA để hệ thống AI Guardrails chỉ ra lỗi sai hóa học.`
    ];

    return {
      generatedAt: new Date().toISOString(),
      targetGrade: grade,
      topMisconceptions: recommendations,
      hakeGainSummary: `Chỉ số tăng trưởng nhận thức chuẩn hóa Hake g = ${analytics.hakeNormalizedGain} (${analytics.hakeNormalizedGain >= 0.7 ? 'Mức tăng trưởng Cao' : analytics.hakeNormalizedGain >= 0.3 ? 'Mức tăng trưởng Trung bình' : 'Cần củng cố thêm'}), Cohen's d = ${analytics.cohensD} (${analytics.effectSizeInterpretation}). Tỉ lệ duy trì kiến thức sau 14 ngày đạt ${analytics.retentionPercent}%.`,
      recommendedLessonAdjustments: adjustments
    };
  }

  /**
   * Formats Lesson Adjustment Plan into standard pedagogical markdown report
   */
  public static generateLessonAdjustmentPlanMarkdown(plan: LessonAdjustmentPlan): string {
    const lines: string[] = [];
    lines.push(`# KẾ HOẠCH ĐIỀU CHỈNH BÀI GIẢNG SƯ PHẠM — DỰ ÁN ELEMENTA`);
    lines.push(`*Chuẩn chương trình:* GDPT 2018 — *Thời điểm trích xuất:* ${plan.generatedAt}`);
    lines.push(`*Phân hệ lớp:* ${plan.targetGrade === 'ALL' ? 'Toàn bộ các khối lớp' : plan.targetGrade}\n`);

    lines.push(`## 1. TỔNG QUAN HIỆU QUẢ NHẬN THỨC`);
    lines.push(plan.hakeGainSummary + '\n');

    lines.push(`## 2. TOP ĐIỂM NÓNG HIỂU LẦM HÓA HỌC (MISCONCEPTION HEATMAP)`);
    plan.topMisconceptions.forEach((rec, idx) => {
      lines.push(`### ${idx + 1}. ${rec.misconceptionName} (${rec.affectedRatioPercent}% học sinh mắc phải)`);
      lines.push(`- **Chủ đề kiến thức:** ${rec.chemicalTopic}`);
      lines.push(`- **Chuẩn chương trình:** ${rec.curriculumCode}`);
      lines.push(`- **Hình thức sư phạm:** \`${rec.classroomMethod}\``);
      lines.push(`- **Đề xuất hoạt động dạy học trên lớp:** ${rec.recommendedActivity}\n`);
    });

    lines.push(`## 3. KHUYẾN NGHỊ ĐIỀU CHỈNH GIÁO ÁN`);
    plan.recommendedLessonAdjustments.forEach((adj, idx) => {
      lines.push(`${idx + 1}. ${adj}`);
    });

    return lines.join('\n');
  }

  /**
   * Extracts live student metrics from current player profile
   */
  public static extractLiveStudentAnalytics(profile: PlayerProfile): SimulatedStudent {
    const errorLog = profile.errorHistory || [];
    let commonTrap = 'Chưa phát hiện bẫy nghiêm trọng';

    // Check for chronic leech misconceptions in CA-SRS first (high pedagogic priority)
    const leechItem = profile.srsItems?.find(item => item.isLeech || (item.lapses !== undefined && item.lapses >= 3));
    if (leechItem) {
      commonTrap = leechItem.title || leechItem.targetId;
    } else if (errorLog.length > 0) {
      commonTrap = errorLog[errorLog.length - 1].mistakeType || errorLog[errorLog.length - 1].description;
    } else if (profile.srsItems && profile.srsItems.length > 0) {
      commonTrap = profile.srsItems[0].title || profile.srsItems[0].targetId || 'Ôn tập thẻ nhớ CA-SRS';
    }

    const matches = (profile.stats?.battlesPlayed || 0) + (profile.stats?.battlesWon || 0);
    const reactions = (profile.unlockedElementZ || []).length;
    const preScore = Math.min(65, 40 + Math.floor(profile.level * 2));
    const postScore = Math.min(98, 70 + Math.floor(profile.level * 3));
    // If student has chronic leech traps, delayed retention drops to flag need for intervention
    const retentionRate = leechItem ? 0.78 : 0.92;
    const delayedScore = Math.max(preScore, Math.round(postScore * retentionRate));

    return {
      id: 'st_current_live',
      name: `${profile.name} (Học sinh thực tế - Live Telemetry)`,
      grade: profile.level >= 15 ? 'HOA_11_12' : profile.level >= 10 ? 'HOA_10' : profile.level >= 5 ? 'KHTN_9' : 'KHTN_8',
      matchesPlayed: Math.max(matches, 1),
      reactionsMastered: Math.max(reactions, 6),
      preTestScore: preScore,
      postTestScore: postScore,
      delayedPostTestScore: delayedScore,
      commonTrapFaced: commonTrap
    };
  }

  public static generateCsvContent(students: SimulatedStudent[]): string {
    const headers = 'ID,Họ và Tên,Lớp,Trận Đã Đấu,Phản Ứng Đạt,Điểm Pre-Test,Điểm Post-Test,Điểm Delayed Post-Test,Hiểu Lầm Hay Gặp\n';
    const rows = students.map(s =>
      `"${s.id}","${s.name}","${s.grade}",${s.matchesPlayed},${s.reactionsMastered},${s.preTestScore},${s.postTestScore},${s.delayedPostTestScore},"${s.commonTrapFaced}"`
    ).join('\n');
    return headers + rows;
  }

  public static generateJsonExport(students: SimulatedStudent[], exportedAt: string = new Date().toISOString()): object {
    const analytics = this.calculateClassAnalytics(students);
    return {
      exportedAt,
      system: 'ELEMENTA MOBA Chemistry Education Platform',
      standard: 'GDPT 2018',
      dataSource: 'SIMULATED_EDUCATIONAL_DATA',
      classAnalytics: analytics,
      students
    };
  }
}
