// src/components/TeacherDashboardTab.tsx
// Teacher & Educator Analytics Dashboard for ELEMENTA
// Tracks Student Misconceptions, Reaction Success Rates, Pre/Post-Test Metrics, and CSV/JSON/Markdown Lesson Adjustment Export
// Conforms strictly to Project Dossier Section VI.1 (Bảng Điều Khiển Giáo Viên)

import React, { useState } from 'react';
import { PlayerProfile } from '../domain/types';
import { SpacedRepetitionService } from '../domain/spacedRepetition';
import { sound } from '../audio/soundEngine';
import {
  EducatorAnalyticsService,
  INITIAL_SIMULATED_STUDENTS,
  GradeFilter,
  SimulatedStudent
} from '../domain/educatorAnalytics';
import {
  GraduationCap,
  Download,
  FileSpreadsheet,
  FileJson,
  FileText,
  TrendingUp,
  AlertOctagon,
  Users,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Layers,
  Sparkles,
  Info,
  Activity,
  ShieldAlert,
  Flame,
  Beaker,
  ChevronRight
} from 'lucide-react';

interface TeacherDashboardTabProps {
  profile: PlayerProfile;
}

export const TeacherDashboardTab: React.FC<TeacherDashboardTabProps> = ({ profile }) => {
  const [filterGrade, setFilterGrade] = useState<GradeFilter>('ALL');
  const [dataMode, setDataMode] = useState<'SIMULATED' | 'LIVE' | 'ALL'>('ALL');
  const [showLessonPlanModal, setShowLessonPlanModal] = useState<boolean>(false);

  // Derive students list based on selected dataMode
  const liveStudent = EducatorAnalyticsService.extractLiveStudentAnalytics(profile);
  const activeStudents: SimulatedStudent[] =
    dataMode === 'SIMULATED'
      ? INITIAL_SIMULATED_STUDENTS
      : dataMode === 'LIVE'
      ? [liveStudent]
      : [liveStudent, ...INITIAL_SIMULATED_STUDENTS];

  const filteredStudents = EducatorAnalyticsService.filterStudents(activeStudents, filterGrade);
  const analytics = EducatorAnalyticsService.calculateClassAnalytics(filteredStudents);
  const atRiskStudents = EducatorAnalyticsService.identifyStudentsAtRisk(filteredStudents);
  const lessonPlan = EducatorAnalyticsService.generateLessonAdjustmentPlan(activeStudents, filterGrade);
  const srsStats = SpacedRepetitionService.getSrsStatistics(profile.srsItems || []);

  const handleExportCSV = () => {
    sound.playUiClick();
    const csvContent = EducatorAnalyticsService.generateCsvContent(filteredStudents);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ELEMENTA_BaoCaoGiaoVien_${filterGrade}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    sound.playUiClick();
    const jsonData = EducatorAnalyticsService.generateJsonExport(filteredStudents);
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ELEMENTA_DuLieuGiaoVien_${filterGrade}_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportLessonPlan = () => {
    sound.playVictory();
    const mdContent = EducatorAnalyticsService.generateLessonAdjustmentPlanMarkdown(lessonPlan);
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ELEMENTA_KeHoachDieuChinhBaiGiang_${filterGrade}_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6 animate-fadeIn">
      {/* Top Notice: Transparency Badge */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-ivory-muted">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-ivory">BẢNG ĐIỀU KHIỂN SƯ PHẠM (MỤC VI.1):</strong> Tự động phân tích Top 5 điểm nóng hiểu lầm hóa học từ Error Log của CA-SRS và đề xuất kế hoạch điều chỉnh giáo án.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion font-bold">
            Live Telemetry Sync
          </span>
          <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
            GDPT 2018
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-ivory tracking-wide flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-cyan-ion" />
            BẢNG ĐIỀU KHIỂN SƯ PHẠM & THỐNG KÊ GIÁO VIÊN
          </h1>
          <p className="text-xs text-ivory-muted mt-1">
            Theo dõi tiến trình nhận thức, phân tích bẫy hiểu lầm và đánh giá hiệu quả phương pháp học tập qua game MOBA
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportLessonPlan}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-copper to-amber-600 hover:from-copper-light hover:to-amber-500 text-xs font-bold text-obsidian transition-all shadow-md cursor-pointer"
            title="Xuất kế hoạch điều chỉnh bài giảng dạng Markdown"
          >
            <FileText className="w-4 h-4" />
            Xuất Giáo Án Điều Chỉnh (VI.1)
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy hover:bg-navy-light text-xs font-bold text-emerald-400 border border-emerald-500/30 transition-all shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Xuất CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy hover:bg-navy-light text-xs font-bold text-cyan-ion border border-cyan-ion/30 transition-all shadow-sm cursor-pointer"
          >
            <FileJson className="w-4 h-4" />
            Xuất JSON
          </button>
        </div>
      </div>

      {/* Filter and Source Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-navy/80 border border-navy-light/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-ivory-muted">Nguồn Dữ Liệu:</span>
          <div className="flex items-center gap-1 bg-obsidian/60 p-1 rounded-lg border border-navy-light/40">
            <button
              onClick={() => { sound.playUiClick(); setDataMode('ALL'); }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                dataMode === 'ALL' ? 'bg-cyan-ion text-obsidian shadow' : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Hỗn Hợp ({activeStudents.length})
            </button>
            <button
              onClick={() => { sound.playUiClick(); setDataMode('LIVE'); }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                dataMode === 'LIVE' ? 'bg-cyan-ion text-obsidian shadow' : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Học Sinh Hiện Tại (1)
            </button>
            <button
              onClick={() => { sound.playUiClick(); setDataMode('SIMULATED'); }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                dataMode === 'SIMULATED' ? 'bg-cyan-ion text-obsidian shadow' : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Lớp Mẫu ({INITIAL_SIMULATED_STUDENTS.length})
            </button>
          </div>
        </div>

        {/* Grade filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-ivory-muted">Khối Lớp:</span>
          <div className="flex items-center gap-1 bg-obsidian/60 p-1 rounded-lg border border-navy-light/40">
            {(['ALL', 'KHTN_8', 'KHTN_9', 'HOA_10', 'HOA_11_12'] as const).map(g => (
              <button
                key={g}
                onClick={() => { sound.playUiClick(); setFilterGrade(g); }}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                  filterGrade === g ? 'bg-copper text-obsidian shadow font-black' : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {g === 'ALL' ? 'Tất cả' : g === 'HOA_11_12' ? 'Hóa 11-12' : g.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Student CA-SRS Retention Banner */}
      {dataMode !== 'SIMULATED' && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-navy via-navy-light to-navy border border-cyan-ion/40 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-ion/10 border border-cyan-ion/30 flex items-center justify-center text-cyan-ion shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-ivory">
                  Dữ Liệu Học Sinh Hiện Tại: {profile.name} (Cấp độ {profile.level})
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  Live Telemetry
                </span>
              </div>
              <p className="text-xs text-ivory-muted mt-0.5">
                Đã nạp {profile.srsItems?.length || 0} thẻ nhớ từ các bẫy nhận thức &amp; phản ứng trong trận
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-obsidian/60 border border-navy-light/60 text-center">
              <div className="text-[10px] font-mono uppercase text-ivory-muted">Đến Hạn Ôn</div>
              <div className="font-mono font-bold text-amber-400 text-sm">{srsStats.dueCount} thẻ</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-obsidian/60 border border-navy-light/60 text-center">
              <div className="text-[10px] font-mono uppercase text-ivory-muted">Đã Làm Chủ</div>
              <div className="font-mono font-bold text-emerald-400 text-sm">{srsStats.masteredCount} thẻ</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-obsidian/60 border border-navy-light/60 text-center">
              <div className="text-[10px] font-mono uppercase text-ivory-muted">Bẫy Dai Dẳng</div>
              <div className="font-mono font-bold text-rose-400 text-sm">{srsStats.leechCount} thẻ</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-obsidian/60 border border-navy-light/60 text-center">
              <div className="text-[10px] font-mono uppercase text-ivory-muted">Hệ Số Ghi Nhớ</div>
              <div className="font-mono font-bold text-cyan-ion text-sm">{srsStats.averageEaseFactor.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-navy/80 border border-navy-light/60 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-ivory-muted uppercase">Tổng Số Học Sinh</span>
            <Users className="w-4 h-4 text-cyan-ion" />
          </div>
          <div className="my-2">
            <span className="font-serif font-black text-2xl text-ivory">{analytics.totalStudents}</span>
            <span className="text-xs text-ivory-muted ml-1.5">học sinh</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">100% Đang tham gia lộ trình GDPT 2018</span>
        </div>

        <div className="p-4 rounded-xl bg-navy/80 border border-navy-light/60 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-ivory-muted uppercase">Khảo Sát Đầu Vào (Pre-Test)</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <span className="font-serif font-black text-2xl text-yellow-400">{analytics.averagePreTest}</span>
            <span className="text-xs text-ivory-muted ml-1.5">/ 100 điểm</span>
          </div>
          <span className="text-[11px] text-ivory-muted font-mono">Trước khi tiếp cận ELEMENTA</span>
        </div>

        <div className="p-4 rounded-xl bg-navy/80 border border-navy-light/60 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-ivory-muted uppercase">Sau Trải Nghiệm (Post-Test)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <span className="font-serif font-black text-2xl text-emerald-400">{analytics.averagePostTest}</span>
            <span className="text-xs text-ivory-muted ml-1.5">/ 100 điểm</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            +{analytics.averageScoreGain}đ (Hake g = {analytics.hakeNormalizedGain}, Cohen's d = {analytics.cohensD})
          </span>
        </div>

        <div className="p-4 rounded-xl bg-navy/80 border border-navy-light/60 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-ivory-muted uppercase">Ghi Nhớ Dài Hạn (14 Ngày)</span>
            <CheckCircle className="w-4 h-4 text-blue-400" />
          </div>
          <div className="my-2">
            <span className="font-serif font-black text-2xl text-blue-400">{analytics.averageDelayedPostTest}</span>
            <span className="text-xs text-ivory-muted ml-1.5">/ 100 điểm</span>
          </div>
          <span className="text-[11px] text-blue-300 font-mono">Tỉ lệ duy trì: {analytics.retentionPercent}% (Nhờ CA-SRS)</span>
        </div>
      </div>

      {/* Top 5 Misconceptions Heatmap Panel (Section VI.1) */}
      <div className="p-5 rounded-xl bg-navy/60 border border-navy-light/60 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-serif font-bold text-sm text-ivory flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-coral-reaction" />
            TOP 5 ĐIỂM NÓNG HIỂU LẦM HÓA HỌC (MISCONCEPTION HEATMAP — MỤC VI.1)
          </h3>
          <span className="text-[11px] font-mono text-ivory-muted">
            Trích xuất trực tiếp từ Error Logs của CA-SRS
          </span>
        </div>
        <p className="text-xs text-ivory-muted">
          Thống kê các lỗi sai phổ biến nhất học sinh thường mắc phải trong quá trình giao tranh MOBA, xếp Deck và thi công thức:
        </p>

        {analytics.misconceptionHeatmap.length === 0 ? (
          <div className="p-4 rounded-lg bg-obsidian/40 text-center text-xs text-ivory-muted">
            Không có dữ liệu lỗi hiểu lầm cho khối lớp đã chọn.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
            {analytics.misconceptionHeatmap.slice(0, 6).map((item, idx) => {
              const borderColors = [
                'border-red-500/40 bg-red-950/20 text-red-400',
                'border-amber-500/40 bg-amber-950/20 text-amber-400',
                'border-purple-500/40 bg-purple-950/20 text-purple-400',
                'border-blue-500/40 bg-blue-950/20 text-blue-400'
              ];
              const colorClass = borderColors[idx % borderColors.length];
              return (
                <div key={item.id} className="p-3.5 rounded-lg bg-obsidian/60 border border-navy-light/60 flex flex-col gap-1.5 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-ivory truncate">{idx + 1}. {item.trapName}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${colorClass}`}>
                        {item.errorPercentage}% ({item.affectedCount}/{item.totalStudents})
                      </span>
                    </div>
                    <p className="text-[11px] text-cyan-ion/80 italic mb-1">
                      {item.chemicalContext}
                    </p>
                  </div>
                  <p className="text-[10px] text-ivory-muted leading-relaxed border-t border-navy-light/30 pt-1.5">
                    💡 <strong className="text-ivory">Sư phạm:</strong> {item.pedagogicalAdvice}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Classroom Student Table */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-serif font-bold text-sm text-ivory flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-ion" />
            DANH SÁCH HỌC SINH & CHỈ SỐ NHẬN THỨC
          </h3>
          <span className="text-xs font-mono text-ivory-muted">
            Hiển thị {filteredStudents.length} học sinh
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-navy-light/60 bg-navy/60 shadow-md">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-obsidian/60 text-ivory-muted border-b border-navy-light/60">
              <tr>
                <th className="p-3">Học Sinh</th>
                <th className="p-3">Khối Lớp</th>
                <th className="p-3">Trận Đã Đấu</th>
                <th className="p-3">Phản Ứng Đạt</th>
                <th className="p-3">Pre-Test</th>
                <th className="p-3">Post-Test</th>
                <th className="p-3">Delayed (14d)</th>
                <th className="p-3">Bẫy Nhận Thức Thường Gặp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light/40 text-ivory">
              {filteredStudents.map(st => {
                const isLive = st.id === 'st_current_live';
                return (
                  <tr key={st.id} className={`hover:bg-navy-light/40 transition-colors ${isLive ? 'bg-cyan-ion/10 font-bold' : ''}`}>
                    <td className="p-3 text-white flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                        isLive ? 'bg-cyan-ion text-obsidian font-black' : 'bg-cyan-ion/20 text-cyan-ion'
                      }`}>
                        {st.name.charAt(0)}
                      </span>
                      <span>{st.name}</span>
                      {isLive && (
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 font-mono">
                          LIVE
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-cyan-ion">{st.grade.replace('_', ' ')}</td>
                    <td className="p-3">{st.matchesPlayed} trận</td>
                    <td className="p-3 text-emerald-400 font-bold">{st.reactionsMastered}</td>
                    <td className="p-3 text-yellow-400">{st.preTestScore}%</td>
                    <td className="p-3 text-emerald-400 font-bold">{st.postTestScore}%</td>
                    <td className="p-3 text-blue-400 font-bold">{st.delayedPostTestScore}%</td>
                    <td className="p-3 text-coral-reaction truncate max-w-xs">{st.commonTrapFaced}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* High-Risk Intervention Radar */}
      {atRiskStudents.length > 0 && (
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-col gap-2.5">
          <h4 className="font-serif font-bold text-xs text-red-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            CẢNH BÁO CAN THIỆP SƯ PHẠM ĐỐI VỚI HỌC SINH CÓ NGUY CƠ CAO ({atRiskStudents.length} EM)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {atRiskStudents.map(flag => (
              <div key={flag.studentId} className="p-3 rounded-lg bg-obsidian/70 border border-red-500/20 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-ivory">{flag.studentName} ({flag.grade.replace('_', ' ')})</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    flag.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    MỨC ĐỘ: {flag.riskLevel}
                  </span>
                </div>
                <p className="text-[11px] text-ivory-muted/90 mb-1">
                  <strong>Dấu hiệu:</strong> {flag.reasons.join('; ')}
                </p>
                <p className="text-[11px] text-emerald-400/90 font-sans">
                  <strong>Đề xuất giải pháp:</strong> {flag.suggestedIntervention}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
