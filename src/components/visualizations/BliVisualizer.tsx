import React, { useState, useMemo, useEffect } from 'react';
import {
  BLI_STANDARD_CATALOG,
  BliStandard,
  simulateBliExperiment,
} from '../../domain/bliEngine';
import { sound } from '../../audio/soundEngine';
import {
  Activity,
  Layers,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Eye,
  Award,
  GitCommit,
  Clock,
  Waves,
} from 'lucide-react';

interface BliVisualizerProps {
  initialStandardId?: string;
}

export const BliVisualizer: React.FC<BliVisualizerProps> = ({
  initialStandardId = 'protein_a_human_igg1',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'SENSORGRAM_SERIES' | 'INTERFEROMETRY_OPTICS' | 'EPITOPE_BINNING' | 'BIOMANUFACTURING_CURRICULUM'
  >('SENSORGRAM_SERIES');

  const standard: BliStandard = useMemo(() => {
    return (
      BLI_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || BLI_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [activeCurveIdx, setActiveCurveIdx] = useState<number>(0);

  // Play audio on standard change
  useEffect(() => {
    sound.playBliDipAndReadChime?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateBliExperiment(standard);
  }, [standard]);

  return (
    <div className="space-y-6 text-ivory">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-navy to-blue-950/80 p-5 rounded-2xl border border-cyan-500/30 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30 text-cyan-400">
              <Waves className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Bio-Layer Interferometry (BLI)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Dip and Read Real-Time Kinetics
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                Giao Thoa Lớp Sinh Học BLI & Động Học Phân Tử Real-Time (k_on / k_off)
              </h2>
              <p className="text-xs text-ivory-muted mt-0.5">
                Dịch chuyển bước sóng giao thoa ánh sáng trắng Δλ · Nhúng trực tiếp khay microplate không nghẽn vi lưu ·
                Đo hằng số tốc độ k_on, k_off và ái lực K_d
              </p>
            </div>
          </div>

          {/* Key Metrics Quick Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-cyan-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Tốc Độ Gắn k_on</div>
              <div className="text-sm font-mono font-bold text-cyan-300">
                {simulation.fittedKonMolarInvSecInv.toExponential(2)} M⁻¹s⁻¹
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-blue-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Tốc Độ Tách k_off</div>
              <div className="text-sm font-mono font-bold text-blue-300">
                {simulation.fittedKoffSecInv.toExponential(2)} s⁻¹
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-emerald-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Ái Lực Cân Bằng K_d</div>
              <div className="text-sm font-mono font-bold text-emerald-300">
                {simulation.kdDisplayString}
              </div>
            </div>
          </div>
        </div>

        {/* Standard Selector Buttons */}
        <div className="mt-4 pt-4 border-t border-navy-light/40 flex flex-wrap gap-2">
          {BLI_STANDARD_CATALOG.map((std) => (
            <button
              key={std.id}
              onClick={() => {
                sound.playUiClick();
                setSelectedStandardId(std.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedStandardId === std.id
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-900/40 border border-cyan-400'
                  : 'bg-navy-light/40 text-ivory-muted hover:text-white hover:bg-navy-light/80 border border-navy-light/30'
              }`}
            >
              {std.vietnameseName.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Experimental Parameter Telemetry Strip */}
      <div className="bg-navy/70 p-4 rounded-2xl border border-navy-light/40 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Loại Đầu Dò (Biosensor)</span>
          <div className="text-white font-bold mt-0.5">{standard.biosensorName}</div>
        </div>
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Phối Tử Bắt Giữ</span>
          <div className="text-cyan-300 font-bold mt-0.5">{standard.immobilizedLigandName}</div>
        </div>
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Chất Phân Tích (Analyte)</span>
          <div className="text-teal-300 font-bold mt-0.5">
            {standard.analyteName} ({(standard.molecularWeightAnalyteDa / 1000).toFixed(1)} kDa)
          </div>
        </div>
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Độ Khớp Mô Hình (R²)</span>
          <div className="text-emerald-300 font-bold mt-0.5">
            R² = {simulation.rSquaredMetric} (χ² = {simulation.chiSquaredMetric})
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('SENSORGRAM_SERIES');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'SENSORGRAM_SERIES'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-300" />
          <span>Sensorgram Động Học Đa Nồng Độ</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('INTERFEROMETRY_OPTICS');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'INTERFEROMETRY_OPTICS'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Waves className="w-4 h-4 text-blue-300" />
          <span>Quang Học Đầu Dò Giao Thoa Sợi Thủy Tinh</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('EPITOPE_BINNING');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'EPITOPE_BINNING'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Target className="w-4 h-4 text-purple-300" />
          <span>Phân Cụm Epitope & Thử Nghiệm Bánh Mì Kẹp</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('BIOMANUFACTURING_CURRICULUM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'BIOMANUFACTURING_CURRICULUM'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-300" />
          <span>Sản Xuất Dược Phẩm Sinh Học & GDPT 2018</span>
        </button>
      </div>

      {/* Sub-Tab 1: Sensorgram Series View */}
      {activeSubTab === 'SENSORGRAM_SERIES' && (
        <div className="space-y-4">
          <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Đồ Thị Sensorgram BLI (Dịch Chuyển Bước Sóng Δλ theo Thời Gian)
                </h3>
                <span className="text-[11px] font-mono text-ivory-muted">
                  Baseline (0-60s) → Association Gắn (60-240s) → Dissociation Tách (240-540s)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                {simulation.sensorgramSeries.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCurveIdx(idx);
                      sound.playBliKineticsAssociationChirp?.(s.steadyStateReqNm);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeCurveIdx === idx
                        ? 'bg-cyan-500 text-black shadow'
                        : 'bg-navy-light/50 text-ivory-muted hover:text-white'
                    }`}
                  >
                    {s.concentrationDisplayString}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Sensorgram Canvas */}
            <div className="w-full h-80 bg-obsidian/90 rounded-xl border border-navy-light/60 p-2 relative overflow-hidden">
              <svg viewBox="0 0 800 280" className="w-full h-full">
                {/* Phase Shading Bands */}
                <rect x="50" y="20" width="80" height="230" fill="#1e1b4b" opacity="0.3" />
                <rect x="130" y="20" width="280" height="230" fill="#0f766e" opacity="0.25" />
                <rect x="410" y="20" width="360" height="230" fill="#1e293b" opacity="0.35" />

                {/* Phase Dotted Boundary Lines */}
                <line x1="130" y1="20" x2="130" y2="250" stroke="#06b6d4" strokeDasharray="3 3" />
                <line x1="410" y1="20" x2="410" y2="250" stroke="#f59e0b" strokeDasharray="3 3" />

                {/* Phase Text Labels */}
                <text x="65" y="38" fill="#93c5fd" fontSize="9.5" fontFamily="monospace">1. Baseline</text>
                <text x="210" y="38" fill="#34d399" fontSize="9.5" fontFamily="monospace">2. Association (Gắn Liên Kết)</text>
                <text x="520" y="38" fill="#fcd34d" fontSize="9.5" fontFamily="monospace">3. Dissociation (Phân Ly Trong Đệm)</text>

                {/* Axes */}
                <line x1="50" y1="20" x2="50" y2="250" stroke="#334155" strokeDasharray="3 3" />
                <line x1="50" y1="250" x2="780" y2="250" stroke="#475569" strokeWidth="1.5" />

                {/* Curves for all concentrations */}
                {(() => {
                  const maxShift = standard.theoreticalRmaxNm * 1.15;
                  const totalTime = simulation.totalExperimentTimeSec;

                  return simulation.sensorgramSeries.map((curve, cIdx) => {
                    const pathD = curve.trace
                      .map((p, idx) => {
                        const x = 50 + (p.timeSeconds / totalTime) * 720;
                        const y = 250 - (p.wavelengthShiftNm / maxShift) * 210;
                        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                      })
                      .join(' ');

                    const isHighlight = activeCurveIdx === cIdx;

                    return (
                      <g key={cIdx}>
                        <path
                          d={pathD}
                          fill="none"
                          stroke={curve.colorHex}
                          strokeWidth={isHighlight ? 3.0 : 1.8}
                          opacity={isHighlight ? 1.0 : 0.65}
                        />
                        {/* Final Endpoint label */}
                        {(() => {
                          const lastPt = curve.trace[curve.trace.length - 1];
                          const lx = 50 + (lastPt.timeSeconds / totalTime) * 720;
                          const ly = 250 - (lastPt.wavelengthShiftNm / maxShift) * 210;
                          return (
                            <text
                              x={lx - 45}
                              y={ly - 5}
                              fill={curve.colorHex}
                              fontSize="8"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {curve.concentrationDisplayString}
                            </text>
                          );
                        })()}
                      </g>
                    );
                  });
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Interferometry Optics View */}
      {activeSubTab === 'INTERFEROMETRY_OPTICS' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Waves className="w-4 h-4 text-blue-400" />
              Nguyên Lý Quang Học Giao Thoa Ánh Sáng Trắng Đầu Dò Sợi Thủy Tinh
            </h3>
            <p className="text-xs text-ivory-muted mt-0.5">
              Ánh sáng phản xạ từ lớp chuẩn nội (Reference Layer) và lớp phân tử sinh học (Bio-Layer) tạo ra
              vân giao thoa. Khi phân tử gắn kết, độ dày quang học n·d tăng lên, làm dịch chuyển bước sóng Δλ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-2">
              <span className="text-xs font-bold text-blue-300">1. Công Thức Dịch Chuyển Bước Sóng</span>
              <div className="p-3 bg-navy-light/40 rounded-lg text-sm font-mono text-center text-cyan-200">
                Δλ = [2 · Δ(n · d)] / m
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                • <strong>n</strong>: Chiết suất lớp chất hấp phụ sinh học (thường ~ 1.45 đối với protein).
                <br />• <strong>d</strong>: Chiều dày vật lý lớp phân tử (tăng lên khi kháng thể gắn vào).
                <br />• <strong>m</strong>: Bậc cực đại giao thoa quang học.
                <br />• Tín hiệu đo đạc hoàn toàn không nhạy với chiết suất dung môi đệm, không bị ảnh hưởng bởi bọt khí.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
              <span className="text-xs font-bold text-cyan-300">2. Ưu Thế Vượt Trội So Với SPR (Biacore)</span>
              <p className="text-xs text-ivory-muted leading-relaxed">
                • <strong>Dip and Read trực tiếp</strong>: Nhúng đầu dò thẳng vào đĩa 96 giếng, không có kênh vi lưu microfluidics, loại bỏ 100% rủi ro tắc nghẽn đường ống.
                <br />• <strong>Đo được trong dịch đục</strong>: Hoạt động hoàn hảo trong dịch nuôi cấy tế bào thô, dịch chiết lysate, không cần tinh chế mẫu sơ bộ.
                <br />• <strong>Đầu dò tái sử dụng</strong>: Có thể hoàn nguyên tip bằng dung dịch đệm glycine pH thấp.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Epitope Binning View */}
      {activeSubTab === 'EPITOPE_BINNING' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              Thử Nghiệm Bánh Mì Kẹp (Sandwich Cross-Blocking) & Phân Cụm Epitope
            </h3>
            <p className="text-xs text-ivory-muted mt-0.5">
              Phát triển phối hợp cocktail kháng thể: Xác định xem 2 kháng thể đơn dòng khác nhau có nhắm vào
              cùng một vị trí epitope trên kháng nguyên hay không.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300">Trường Hợp A: Epitope Độc Lập (Tạo Bánh Mì Kẹp)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-200">
                  Tín Hiệu Tăng Thêm Δλ &gt; 0
                </span>
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Kháng thể thứ hai liên kết vào epitope khác trên kháng nguyên mà không bị cản trở không gian.
                <br />→ Tín hiệu giao thoa tăng vọt thành bước sóng cao hơn. Hai kháng thể có thể kết hợp
                trong liệu pháp cocktail phòng ngừa biến chủng thoát miễn dịch.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300">Trường Hợp B: Trùng Epitope (Chặn Chéo)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-200">
                  Không Có Tín Hiệu Δλ = 0
                </span>
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Kháng thể thứ hai không thể liên kết do vị trí epitope đã bị chiếm đóng hoặc bị cản trở lập thể.
                <br />→ Tín hiệu phẳng lì. Hai kháng thể thuộc cùng một "Epitope Bin".
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Biomanufacturing & GDPT 2018 View */}
      {activeSubTab === 'BIOMANUFACTURING_CURRICULUM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Sản Xuất Dược Phẩm Sinh Học & Chương Trình GDPT 2018
              </h3>
              <p className="text-xs text-ivory-muted">
                Kiểm soát chất lượng thu hoạch kháng thể trong nồi lên men sinh học bioreactor và bài học tốc độ phản ứng.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Định Lượng Titer 2 Phút
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Đầu dò Protein A đo nồng độ kháng thể IgG trực tiếp trong dịch nuôi cấy tế bào CHO (0.05 mg/mL đến 5 mg/mL)
                với thời gian chỉ 2 phút/giếng, thay thế hoàn toàn HPLC Protein A tốn kém thời gian.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Động Học k_on và k_off
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Dược động học tối ưu đòi hỏi k_on nhanh để kháng thể bám trúng đích nhanh chóng, và k_off chậm để kéo dài
                thời gian cư trú trên thụ thể bệnh lý.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> GDPT 2018 Hóa Học 10 & 11
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                {standard.curriculumNotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
