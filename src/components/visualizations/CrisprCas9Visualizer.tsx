// src/components/visualizations/CrisprCas9Visualizer.tsx
// Milestone 50: GOLDEN HALF-CENTURY MILESTONE — CRISPR-Cas9 Gene Editing, PAM Recognition & DSB Repair Visualizer
// Standards: Nobel Prize in Chemistry 2020 (Emmanuelle Charpentier & Jennifer A. Doudna)
// Curriculum: Vietnam GDPT 2018 (Sinh học 12 Chuyên đề: Kỹ thuật CRISPR-Cas9; Hóa học 12: Endonuclease & Phối trí Mg2+)

import React, { useState } from 'react';
import {
  CRISPR_TARGETS_CATALOG,
  CAS_VARIANTS_CATALOG,
  CasVariantType,
  DsbRepairPathway,
  simulateCrisprEditing,
} from '../../domain/crisprCas9Engine';
import { sound } from '../../audio/soundEngine';
import {
  Dna,
  Scissors,
  Zap,
  Activity,
  Layers,
  Sliders,
  Info,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Shield,
  Eye,
  RefreshCw,
  Cpu
} from 'lucide-react';

export interface CrisprCas9VisualizerProps {
  initialTargetId?: string;
}

export const CrisprCas9Visualizer: React.FC<CrisprCas9VisualizerProps> = ({
  initialTargetId,
}) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>(initialTargetId || 'sickle_cell_hbb');
  const [selectedCasVariant, setSelectedCasVariant] = useState<CasVariantType>('SP_CAS9');
  const [repairPathway, setRepairPathway] = useState<DsbRepairPathway>('NHEJ');
  const [seedMismatches, setSeedMismatches] = useState<number>(0);
  const [distalMismatches, setDistalMismatches] = useState<number>(0);
  const [mgConcentration, setMgConcentration] = useState<number>(8.0);
  const [activeTab, setActiveTab] = useState<'molecular_ribonucleoprotein' | 'dsb_cleavage_kinetics' | 'cellular_repair_nhej_hdr' | 'nobel_ethics_gdpt'>('molecular_ribonucleoprotein');

  const simResult = simulateCrisprEditing(
    selectedTargetId,
    selectedCasVariant,
    repairPathway,
    seedMismatches,
    distalMismatches,
    mgConcentration
  );

  const handleTargetChange = (id: string) => {
    setSelectedTargetId(id);
    sound.playCrisprCas9DsbSnip();
  };

  const handleCasChange = (variant: CasVariantType) => {
    setSelectedCasVariant(variant);
    sound.playCrisprCas9DsbSnip();
  };

  const handlePathwayChange = (pathway: DsbRepairPathway) => {
    setRepairPathway(pathway);
    if (pathway === 'HDR') {
      sound.playHdrGeneInsertionGlow();
    } else {
      sound.playCrisprCas9DsbSnip();
    }
  };

  const handleCutAction = () => {
    if (simResult.casVariant.canCleaveDsb && simResult.onTargetCleavageEfficiencyPercent > 10) {
      sound.playCrisprCas9DsbSnip();
      if (repairPathway === 'HDR') {
        setTimeout(() => sound.playHdrGeneInsertionGlow(), 300);
      }
    } else {
      sound.playUiClick();
    }
  };

  return (
    <div className="w-full bg-navy/90 border border-teal-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel Badges & GDPT 2018 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
              <Scissors className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Kỹ Thuật Chỉnh Sửa Gen CRISPR-Cas9 & Phức Hợp sgRNA
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 font-mono">
                Nobel Hóa Học 2020 • Sinh & Hóa 12 GDPT
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Motif PAM (5'-NGG-3'), Vùng hạt giống Seed Region 10nt, Cắt đứt sợi đôi DSB (-3bp) bằng RuvC/HNH & Sửa chữa NHEJ/HDR.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-teal-500/30 px-3 py-1.5 rounded-xl">
          {simResult.onTargetCleavageEfficiencyPercent > 50 ? (
            <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          )}
          <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider font-mono">
            {simResult.pamMatched
              ? simResult.casVariant.canCleaveDsb
                ? `CẮT ON-TARGET: ${simResult.onTargetCleavageEfficiencyPercent}%`
                : 'CRISPRi BÁM KHÔNG CẮT'
              : 'SAI MOTIF PAM'}
          </span>
        </div>
      </div>

      {/* 2. Target Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(CRISPR_TARGETS_CATALOG).map((t) => {
          const isSelected = t.id === selectedTargetId;
          return (
            <button
              key={t.id}
              onClick={() => handleTargetChange(t.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-teal-500/20 border-teal-400 shadow-md shadow-teal-500/10'
                  : 'bg-navy-dark/40 border-navy-light/30 hover:bg-navy-light/20 hover:border-teal-500/30'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-1.5 py-0.5 rounded bg-black/40 text-teal-300">
                  PAM: {t.pamSequence}
                </span>
                <p className="font-semibold text-xs text-white mt-1 line-clamp-1">{t.nameVI.split('(')[0]}</p>
              </div>
              <div className="text-[11px] text-ivory-muted mt-2 flex justify-between items-center font-mono">
                <span>{t.targetGene.split(' ')[0]}</span>
                <span className="text-teal-300 font-bold">{t.genomicLocus.split(':')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-teal-500/20 text-teal-400">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Hiệu Suất Cắt On-Target</p>
            <p className="text-base sm:text-lg font-bold font-mono text-teal-300">
              {simResult.onTargetCleavageEfficiencyPercent}%
            </p>
            <p className="text-[10px] text-ivory-muted">Tại vị trí -3 bp trước PAM</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Nguy Cơ Cắt Lệch (Off-Target)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-rose-300">
              {simResult.offTargetRiskPercent}%
            </p>
            <p className="text-[10px] text-ivory-muted">Sai khác vùng xa (Distal)</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Cơ Chế Sửa Chữa Đích</p>
            <p className="text-base sm:text-lg font-bold font-mono text-sky-300">
              {simResult.repairPathway}
            </p>
            <p className="text-[10px] text-ivory-muted">
              {simResult.repairPathway === 'NHEJ' ? `Knockout: ${simResult.frameshiftKnockoutPercent}%` : `Ghép HDR: ${simResult.precisionEditInsertionPercent}%`}
            </p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Biến Thể Cas Endonuclease</p>
            <p className="text-base sm:text-lg font-bold font-mono text-purple-300 truncate">
              {simResult.casVariant.name.split(' ')[0]}
            </p>
            <p className="text-[10px] text-ivory-muted">{simResult.casVariant.aminoAcidCount} aa • {simResult.casVariant.pamRequirement}</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Navigation Tabs */}
      <div className="flex border-b border-navy-light/30 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('molecular_ribonucleoprotein')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'molecular_ribonucleoprotein'
              ? 'border-teal-400 text-teal-300 bg-teal-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Mô Hình Phức Hợp Phân Tử Cas9 - gRNA - DNA
        </button>

        <button
          onClick={() => setActiveTab('dsb_cleavage_kinetics')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'dsb_cleavage_kinetics'
              ? 'border-teal-400 text-teal-300 bg-teal-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          Động Học Cắt Đứt Sợi Đôi DSB & Vùng Hạt Giống
        </button>

        <button
          onClick={() => setActiveTab('cellular_repair_nhej_hdr')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'cellular_repair_nhej_hdr'
              ? 'border-teal-400 text-teal-300 bg-teal-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          So Sánh Cơ Chế Sửa Chữa Tế Bào: NHEJ vs HDR
        </button>

        <button
          onClick={() => setActiveTab('nobel_ethics_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'nobel_ethics_gdpt'
              ? 'border-teal-400 text-teal-300 bg-teal-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Giải Nobel Hóa Học 2020 & Y Đức Chỉnh Sửa Gen
        </button>
      </div>

      {/* 5. Main Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Interactive Visualizations */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'molecular_ribonucleoprotein' && (
            <div className="bg-navy-dark/80 border border-teal-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-teal-400" />
                    Cấu Trúc Phân Tử Phức Hợp Ribonucleoprotein (RNP)
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    sgRNA dẫn đường cho protein Cas9 mở xoắn kép DNA và định vị chính xác vị trí cắt nhờ nhận diện motif PAM.
                  </p>
                </div>

                <button
                  onClick={handleCutAction}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-600/30 transition-all"
                >
                  <Scissors className="w-3.5 h-3.5" /> Thực Hiện Cắt DSB
                </button>
              </div>

              {/* Molecular Schematic Graphic */}
              <div className="w-full h-72 sm:h-80 bg-black/50 rounded-xl border border-navy-light/20 p-4 relative flex flex-col justify-between overflow-hidden">
                {/* Cas9 Protein Lobes Representation */}
                <div className="absolute inset-x-8 inset-y-12 bg-teal-950/20 border-2 border-teal-500/30 rounded-3xl -z-0 flex items-center justify-between px-6 pointer-events-none">
                  <div className="text-[11px] font-mono text-teal-400/50 uppercase">Miền Nhận Diện REC (sgRNA Binding)</div>
                  <div className="text-[11px] font-mono text-purple-400/50 uppercase">Miền Nuclease NUC (HNH & RuvC)</div>
                </div>

                {/* Target DNA Strands */}
                <div className="z-10 space-y-3 pt-3">
                  {/* Non-target strand 5' to 3' */}
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-[10px] text-ivory-muted">
                      <span>Mạch Không Bổ Sung (5' → 3')</span>
                      <span className="text-teal-300">Vùng PAM: {simResult.target.pamSequence}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-navy-light/30 flex items-center gap-1 overflow-x-auto text-xs tracking-wider">
                      {simResult.target.targetDnaSequence5to3.split('').map((base, idx) => {
                        const isPam = idx >= simResult.target.pamPositionIndex && idx < simResult.target.pamPositionIndex + 3;
                        const isCut = idx === simResult.target.cleavageSiteIndex;
                        return (
                          <span
                            key={idx}
                            className={`px-1 py-0.5 rounded text-center min-w-[18px] ${
                              isPam
                                ? 'bg-amber-500/30 border border-amber-400 text-amber-300 font-bold'
                                : isCut
                                ? 'bg-rose-500/30 border border-rose-400 text-rose-300 font-bold animate-pulse'
                                : 'text-slate-300'
                            }`}
                          >
                            {base}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guide RNA (sgRNA) 20nt Spacer */}
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-[10px] text-purple-300">
                      <span>Guide RNA (sgRNA 20nt Spacer Bổ Sung)</span>
                      <span>Khu vực hạt giống Seed Region (10nt gần PAM)</span>
                    </div>
                    <div className="bg-purple-950/40 p-2 rounded-lg border border-purple-500/40 flex items-center gap-1 overflow-x-auto text-xs tracking-wider">
                      {simResult.target.protospacer20nt.split('').map((base, idx) => {
                        const isSeed = idx >= 10;
                        return (
                          <span
                            key={idx}
                            className={`px-1 py-0.5 rounded text-center min-w-[18px] ${
                              isSeed
                                ? 'bg-fuchsia-500/30 border border-fuchsia-400 text-fuchsia-200 font-bold'
                                : 'text-purple-300'
                            }`}
                          >
                            {base}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Cleavage Shears Animation Indicators */}
                <div className="z-10 bg-navy-dark/90 border border-teal-500/30 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-teal-500/20 text-teal-300">RuvC</span>
                    <span className="text-[11px] text-ivory-muted">{simResult.ruvcDomainStatusVI}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-purple-500/20 text-purple-300">HNH</span>
                    <span className="text-[11px] text-ivory-muted">{simResult.hnhDomainStatusVI}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dsb_cleavage_kinetics' && (
            <div className="bg-navy-dark/80 border border-teal-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-teal-400" />
                  Động Học Cắt Đứt Sợi Đôi DSB & Độ Nhạy Vùng Hạt Giống (Seed Region)
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  10 nucleotide ở đầu 3' của protospacer (gần PAM) quyết định sự sống còn của phức hợp. Một sai khác đơn lẻ làm tê liệt hoạt tính endonuclease.
                </p>
              </div>

              {/* Progress bars & comparison */}
              <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-navy-light/20">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-teal-300">Hiệu Suất Cắt On-Target (Chính xác)</span>
                    <span className="font-mono text-white font-bold">{simResult.onTargetCleavageEfficiencyPercent}%</span>
                  </div>
                  <div className="w-full bg-navy-light/30 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${simResult.onTargetCleavageEfficiencyPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-rose-300">Rủi Ro Đột Biến Lệch Đích (Off-Target Hazard)</span>
                    <span className="font-mono text-white font-bold">{simResult.offTargetRiskPercent}%</span>
                  </div>
                  <div className="w-full bg-navy-light/30 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${simResult.offTargetRiskPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-teal-500/20 text-xs text-ivory-muted leading-relaxed">
                Khi Cas9 nhận diện motif PAM (5'-NGG-3'), miền tương tác PAM (PID) ổn định liên kết và kích hoạt sự mở xoắn cục bộ của phân tử DNA từ đầu 3' tiến về đầu 5'.
                Sự bắt cặp chính xác của 10-12 nucleotide trong vùng hạt giống (Seed) kích hoạt sự thay đổi cấu hình không gian của miền HNH, đưa hai tâm hoạt động xúc tác mang ion cofactor Mg²⁺ vào vị trí cắt đứt liên kết photphodiester trên cả hai mạch.
              </div>
            </div>
          )}

          {activeTab === 'cellular_repair_nhej_hdr' && (
            <div className="bg-navy-dark/80 border border-teal-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-sky-400" />
                  So Sánh Hai Con Đường Sửa Chữa Tế Bào Sau Đứt Gãy Sợi Đôi DSB
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Tế bào kích hoạt cơ chế sinh tồn tự hàn gắn vết thương DNA: NHEJ (gây lỗi knockout) hoặc HDR (chèn gen chính xác).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* NHEJ Card */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                    repairPathway === 'NHEJ'
                      ? 'bg-rose-950/40 border-rose-400 shadow-md shadow-rose-500/10'
                      : 'bg-navy-dark/40 border-navy-light/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300">1. Cơ Chế NHEJ (Nối Không Tương Đồng)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200">Knockout</span>
                  </div>
                  <p className="text-[11px] text-ivory-muted">
                    Hàn gắn khẩn cấp không cần khuôn mẫu. Thường xuyên làm mất hoặc thêm một vài cặp nucleotide (Indels), gây dịch khung mã đọc và loại bỏ hoàn toàn chức năng gen.
                  </p>
                  <div className="text-[10px] font-mono text-rose-200 bg-black/40 p-2 rounded">
                    Tỷ lệ knockout gen: <strong className="text-white">{simResult.frameshiftKnockoutPercent}%</strong>
                  </div>
                </div>

                {/* HDR Card */}
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                    repairPathway === 'HDR'
                      ? 'bg-emerald-950/40 border-emerald-400 shadow-md shadow-emerald-500/10'
                      : 'bg-navy-dark/40 border-navy-light/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300">2. Cơ Chế HDR (Tái Tổ Hợp Tương Đồng)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200">Chèn Chuẩn</span>
                  </div>
                  <p className="text-[11px] text-ivory-muted">
                    Sử dụng phân tử DNA mẫu (Donor Template) có hai cánh tay tương đồng để sửa chữa vết cắt, chèn chính xác đột biến mong muốn mà không gây sẹo đột biến ngẫu nhiên.
                  </p>
                  <div className="text-[10px] font-mono text-emerald-200 bg-black/40 p-2 rounded">
                    Tỷ lệ chèn chính xác: <strong className="text-white">{simResult.precisionEditInsertionPercent}%</strong>
                  </div>
                </div>
              </div>

              {/* Repaired Sequence Preview */}
              <div className="p-3 rounded-xl bg-black/40 border border-navy-light/20 text-xs font-mono space-y-1">
                <span className="text-teal-300 font-bold">Trình Tự Sau Khi Sửa Chữa:</span>
                <p className="text-white break-all">{simResult.repairedSequence5to3}</p>
              </div>
            </div>
          )}

          {activeTab === 'nobel_ethics_gdpt' && (
            <div className="bg-navy-dark/80 border border-teal-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Giải Nobel Hóa Học 2020 & Đạo Đức Sinh Học (Bioethics)
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Hai nhà nữ khoa học vĩ đại biến hệ thống miễn dịch thích ứng cổ xưa của vi khuẩn thành cây kéo sinh học thần kỳ.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-teal-300">1. Bản Quyền Phát Minh Lịch Sử (2012)</h4>
                  <p className="text-ivory-muted mt-1">
                    Jennifer Doudna (UC Berkeley) và Emmanuelle Charpentier (Max Planck) kết hợp hai chuỗi RNA tự nhiên (crRNA và tracrRNA) thành một chuỗi RNA dẫn đường đơn giản duy nhất (single-guide RNA - sgRNA), mở đường cho việc chỉnh sửa hệ gen của mọi loài sinh vật.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-sky-300">2. Ranh Giới Đạo Đức Sinh Học: Tế Bào Soma vs Tế Bào Mầm</h4>
                  <p className="text-ivory-muted mt-1">
                    Cộng đồng khoa học toàn cầu nghiêm cấm tuyệt đối việc chỉnh sửa gen trên phôi thai người truyền cho thế hệ sau (Germline gene editing). Mọi ứng dụng y khoa hiện nay (như thuốc Casgevy) chỉ được thực hiện trên tế bào sinh dưỡng (Somatic cells) của chính bệnh nhân.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pedagogical Analysis Card */}
          <div className="p-3.5 rounded-xl bg-navy-dark/90 border border-teal-500/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-teal-300 font-bold">
              <Info className="w-3.5 h-3.5" /> Phân Tích Sư Phạm & Động Học Phân Tử CRISPR-Cas9:
            </div>
            <p className="text-ivory-muted text-[11px] leading-relaxed">
              {simResult.pedagogicalAnalysisVI}
            </p>
          </div>
        </div>

        {/* Right Column (1/3): Interactive Controls & Sliders */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-teal-500/30 rounded-xl p-4 space-y-5">
            <div className="flex items-center gap-2 border-b border-navy-light/30 pb-2">
              <Sliders className="w-4 h-4 text-teal-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Bảng Thiết Kế Chỉnh Sửa Gen</h3>
            </div>

            {/* Cas Variant Selector */}
            <div className="space-y-1.5">
              <span className="text-xs text-ivory-muted">Biến thể Endonuclease Cas:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(CAS_VARIANTS_CATALOG) as CasVariantType[]).map((vKey) => {
                  const v = CAS_VARIANTS_CATALOG[vKey];
                  const isSel = vKey === selectedCasVariant;
                  return (
                    <button
                      key={vKey}
                      onClick={() => handleCasChange(vKey)}
                      className={`p-1.5 rounded-lg border text-left text-[11px] transition-all ${
                        isSel
                          ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-bold'
                          : 'bg-navy-light/10 border-navy-light/30 text-ivory-muted hover:bg-navy-light/20'
                      }`}
                    >
                      <div className="truncate">{v.name.split(' ')[0]}</div>
                      <div className="text-[9px] opacity-70">{v.pamRequirement}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Repair Pathway Selector */}
            <div className="space-y-1.5">
              <span className="text-xs text-ivory-muted">Cơ chế tế bào tự sửa chữa:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handlePathwayChange('NHEJ')}
                  className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                    repairPathway === 'NHEJ'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                      : 'bg-navy-light/10 border-navy-light/30 text-ivory-muted'
                  }`}
                >
                  NHEJ (Knockout)
                </button>
                <button
                  onClick={() => handlePathwayChange('HDR')}
                  className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                    repairPathway === 'HDR'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-navy-light/10 border-navy-light/30 text-ivory-muted'
                  }`}
                >
                  HDR (Chèn Chuẩn)
                </button>
              </div>
            </div>

            {/* Slider 1: Seed Mismatches */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Sai khác vùng hạt giống (Seed):</span>
                <span className={`font-mono font-bold ${seedMismatches > 0 ? 'text-rose-400' : 'text-teal-300'}`}>
                  {seedMismatches} Nu
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={seedMismatches}
                onChange={(e) => setSeedMismatches(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0 (Khớp 100%)</span>
                <span>1 (Giảm 85%)</span>
                <span>3 (Liệt 100%)</span>
              </div>
            </div>

            {/* Slider 2: Distal Mismatches */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Sai khác vùng xa (Distal):</span>
                <span className="font-mono text-amber-300 font-bold">{distalMismatches} Nu</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                step="1"
                value={distalMismatches}
                onChange={(e) => setDistalMismatches(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>0 (Hoàn hảo)</span>
                <span>2 (Dung thứ)</span>
                <span>4 (Giảm nhẹ)</span>
              </div>
            </div>

            {/* Slider 3: Mg2+ Cofactor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Nồng độ cofactor Mg²⁺:</span>
                <span className="font-mono text-purple-300 font-bold">{mgConcentration} mM</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="15.0"
                step="0.5"
                value={mgConcentration}
                onChange={(e) => setMgConcentration(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>2 mM</span>
                <span>8 mM (Tối ưu)</span>
                <span>15 mM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
