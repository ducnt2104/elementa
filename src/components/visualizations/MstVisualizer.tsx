import React, { useState, useMemo, useEffect } from 'react';
import {
  MST_STANDARD_CATALOG,
  MstStandard,
  simulateMstExperiment,
} from '../../domain/mstEngine';
import { sound } from '../../audio/soundEngine';
import {
  Flame,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Target,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Eye,
  Award,
  GitCommit,
} from 'lucide-react';

interface MstVisualizerProps {
  initialStandardId?: string;
}

export const MstVisualizer: React.FC<MstVisualizerProps> = ({
  initialStandardId = 'carbonic_anhydrase_furosemide',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'BINDING_CURVE' | 'CAPILLARY_TRACES' | 'SORET_MECHANISM' | 'BIOMEDICAL_CURRICULUM'
  >('BINDING_CURVE');

  const standard: MstStandard = useMemo(() => {
    return (
      MST_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || MST_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [laserPowerPercent, setLaserPowerPercent] = useState<number>(standard.optimalIrLaserPowerPercent);
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(standard.optimalTemperatureCelsius);
  const [selectedTitrationIdx, setSelectedTitrationIdx] = useState<number>(8); // Middle of curve

  // Synchronize defaults on standard switch
  useEffect(() => {
    setLaserPowerPercent(standard.optimalIrLaserPowerPercent);
    setTemperatureCelsius(standard.optimalTemperatureCelsius);
    sound.playThermophoreticDepletionPing?.(standard.trueKdMolar);
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateMstExperiment(standard, laserPowerPercent, temperatureCelsius);
  }, [standard, laserPowerPercent, temperatureCelsius]);

  return (
    <div className="space-y-6 text-ivory">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-navy to-rose-950/80 p-5 rounded-2xl border border-amber-500/30 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-400/30 text-amber-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Microscale Thermophoresis (MST)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Ludwig-Soret Thermal Diffusion
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                Nhiệt Di Chuyển Vi Mô MST & Đo Ái Lực Liên Kết K_d Trong Dung Dịch
              </h2>
              <p className="text-xs text-ivory-muted mt-0.5">
                Gradient nhiệt vi mô laser hồng ngoại · Đo đạc trực tiếp trong mao quản không cần cố định bề mặt ·
                Độ nhạy picomolar đến millimolar
              </p>
            </div>
          </div>

          {/* Key Metrics Quick Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-amber-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Hằng Số Phân Ly K_d</div>
              <div className="text-sm font-mono font-bold text-amber-300">
                {simulation.kdDisplayString}
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-rose-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Năng Lượng Tự Do ΔG°</div>
              <div className="text-sm font-mono font-bold text-rose-300">
                {simulation.deltaGKcalPerMol.toFixed(1)} kcal/mol
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-teal-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Tín Hiệu ΔF_norm</div>
              <div className="text-sm font-mono font-bold text-teal-300">
                {simulation.deltaFnormPerMil.toFixed(1)} ‰ (SNR {simulation.signalToNoiseRatio})
              </div>
            </div>
          </div>
        </div>

        {/* Standard Selector Buttons */}
        <div className="mt-4 pt-4 border-t border-navy-light/40 flex flex-wrap gap-2">
          {MST_STANDARD_CATALOG.map((std) => (
            <button
              key={std.id}
              onClick={() => {
                sound.playUiClick();
                setSelectedStandardId(std.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedStandardId === std.id
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-900/40 border border-amber-400'
                  : 'bg-navy-light/40 text-ivory-muted hover:text-white hover:bg-navy-light/80 border border-navy-light/30'
              }`}
            >
              {std.vietnameseName.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Control Sliders Panel */}
      <div className="bg-navy/70 p-4 rounded-2xl border border-navy-light/40 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. IR Laser Power */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Công Suất Laser IR:
            </span>
            <span className="font-mono font-bold text-amber-300">{laserPowerPercent}%</span>
          </div>
          <div className="flex gap-2">
            {[20, 40, 60, 80].map((p) => (
              <button
                key={p}
                onClick={() => {
                  setLaserPowerPercent(p);
                  sound.playMstIrLaserHeatingHum?.(p);
                }}
                className={`flex-1 py-1 rounded text-xs font-mono font-bold transition-all ${
                  laserPowerPercent === p
                    ? 'bg-amber-500 text-black shadow'
                    : 'bg-navy-light/40 text-ivory-muted hover:bg-navy-light'
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <div className="text-[10px] text-amber-300 font-mono">
            Độ chênh nhiệt độ laser: ΔT = +{simulation.laserDeltaTKelvin.toFixed(1)} K
          </div>
        </div>

        {/* 2. Temperature */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Nhiệt Độ Mao Quản (T):
            </span>
            <span className="font-mono font-bold text-rose-300">{temperatureCelsius}°C</span>
          </div>
          <input
            type="range"
            min="15"
            max="37"
            step="1"
            value={temperatureCelsius}
            onChange={(e) => setTemperatureCelsius(Number(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
            <span>15°C</span>
            <span>25°C (chuẩn)</span>
            <span>37°C (sinh lý)</span>
          </div>
        </div>

        {/* 3. Hill Coefficient & Cooperativity */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-teal-400" /> Hệ Số Hill (n_H):
            </span>
            <span className="font-mono font-bold text-teal-300">
              {standard.hillCoefficient > 1.0 ? `${standard.hillCoefficient} (Đồng hướng)` : '1.0 (Độc lập)'}
            </span>
          </div>
          <div className="text-xs text-ivory-muted font-mono">
            Nồng độ phân tử đích: <strong className="text-white">{(standard.targetConcentrationMolar * 1e9).toFixed(1)} nM</strong>
          </div>
          <div className="text-[10px] text-ivory-muted font-mono">
            Phân loại: <span className="text-amber-300">{standard.affinityCategory}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('BINDING_CURVE');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'BINDING_CURVE'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-300" />
          <span>Đường Cong Chuẩn Độ Binding Curve</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('CAPILLARY_TRACES');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'CAPILLARY_TRACES'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4 text-rose-300" />
          <span>Dạng Sóng Mao Quản 30 Giây (MST Traces)</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('SORET_MECHANISM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'SORET_MECHANISM'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Atom className="w-4 h-4 text-teal-300" />
          <span>Cơ Chế Soret & 3 Yếu Tố Phân Tử</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('BIOMEDICAL_CURRICULUM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'BIOMEDICAL_CURRICULUM'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 text-purple-300" />
          <span>Ý Nghĩa Dược Học & GDPT 2018</span>
        </button>
      </div>

      {/* Sub-Tab 1: Binding Curve View */}
      {activeSubTab === 'BINDING_CURVE' && (
        <div className="space-y-4">
          <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Đường Cong Chuẩn Độ Liều Lượng F_norm (‰) vs Log[Ligand]
                </h3>
                <span className="text-[11px] font-mono text-ivory-muted">
                  Đích: {standard.targetMolecule} · Phối tử: {standard.ligandMolecule}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-amber-300 font-bold">K_d = {simulation.kdDisplayString}</span>
                <span className="text-teal-300">ΔG° = {simulation.deltaGKcalPerMol} kcal/mol</span>
              </div>
            </div>

            {/* SVG Sigmoidal Binding Curve Canvas */}
            <div className="w-full h-72 bg-obsidian/90 rounded-xl border border-navy-light/60 p-2 relative overflow-hidden">
              <svg viewBox="0 0 800 260" className="w-full h-full">
                {/* Axes */}
                <line x1="60" y1="20" x2="60" y2="230" stroke="#334155" strokeDasharray="3 3" />
                <line x1="60" y1="230" x2="780" y2="230" stroke="#475569" strokeWidth="1.5" />

                {/* Inflection Kd Vertical Line */}
                <line x1="420" y1="20" x2="420" y2="230" stroke="#f59e0b" strokeDasharray="4 2" strokeWidth="1.5" />
                <text x="425" y="35" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  K_d = {simulation.kdDisplayString} (Điểm uốn 50% bão hòa)
                </text>

                {/* Sigmoidal Binding Curve */}
                {(() => {
                  const pts = simulation.titrationPoints;
                  if (pts.length < 2) return null;
                  const minF = Math.min(standard.boundFnormPerMil, standard.unboundFnormPerMil) - 10;
                  const maxF = Math.max(standard.boundFnormPerMil, standard.unboundFnormPerMil) + 10;

                  const pathD = pts
                    .map((p, idx) => {
                      const x = 60 + (idx / (pts.length - 1)) * 710;
                      const y = 230 - ((p.fNormPerMil - minF) / (maxF - minF)) * 190;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ');

                  return (
                    <g>
                      <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="2.5" />

                      {/* Discrete Titration Data Points */}
                      {pts.map((p, idx) => {
                        const x = 60 + (idx / (pts.length - 1)) * 710;
                        const y = 230 - ((p.fNormPerMil - minF) / (maxF - minF)) * 190;
                        const isSelected = selectedTitrationIdx === idx;

                        return (
                          <g
                            key={idx}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedTitrationIdx(idx);
                              sound.playUiClick();
                            }}
                          >
                            <circle
                              cx={x}
                              cy={y}
                              r={isSelected ? 6 : 4}
                              fill={isSelected ? '#ef4444' : '#fbbf24'}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                            {isSelected && (
                              <text
                                x={x}
                                y={y - 12}
                                fill="#fef08a"
                                fontSize="9"
                                fontFamily="monospace"
                                textAnchor="middle"
                                fontWeight="bold"
                              >
                                {p.fNormPerMil} ‰ ({(p.fractionBound * 100).toFixed(0)}%)
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Capillary Time Traces View */}
      {activeSubTab === 'CAPILLARY_TRACES' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                Dạng Sóng Huỳnh Quang Mao Quản 30 Giây (MST Capillary Time Trace)
              </h3>
              <p className="text-xs text-ivory-muted mt-0.5">
                4 Giai đoạn: 0-5s Khởi động lạnh · 5-6s Nhảy nhiệt T-Jump · 6-20s Nhiệt di chuyển Thermophoresis ·
                20-30s Khuếch tán hồi phục Back-diffusion
              </p>
            </div>
          </div>

          {/* SVG 30-Second Trace Canvas */}
          <div className="w-full h-72 bg-obsidian/90 rounded-xl border border-navy-light/60 p-2 relative overflow-hidden">
            <svg viewBox="0 0 800 260" className="w-full h-full">
              {/* Phase Shading Bands */}
              <rect x="50" y="20" width="120" height="210" fill="#1e1b4b" opacity="0.3" />
              <rect x="170" y="20" width="25" height="210" fill="#881337" opacity="0.4" />
              <rect x="195" y="20" width="340" height="210" fill="#78350f" opacity="0.25" />
              <rect x="535" y="20" width="245" height="210" fill="#064e3b" opacity="0.2" />

              {/* Phase Labels */}
              <text x="80" y="36" fill="#a5b4fc" fontSize="9" fontFamily="monospace">1. Cold Initial (0-5s)</text>
              <text x="172" y="36" fill="#f43f5e" fontSize="9" fontFamily="monospace">2. T-Jump</text>
              <text x="280" y="36" fill="#fbbf24" fontSize="9" fontFamily="monospace">3. Thermophoresis (6-20s Laser ON)</text>
              <text x="600" y="36" fill="#34d399" fontSize="9" fontFamily="monospace">4. Back-Diffusion (Laser OFF)</text>

              {/* Time Trace Curve */}
              {(() => {
                const currentTrace = simulation.titrationPoints[selectedTitrationIdx]?.fluorescenceTrace;
                if (!currentTrace || currentTrace.length < 2) return null;

                const pathD = currentTrace
                  .map((p, idx) => {
                    const x = 50 + (p.timeSeconds / 30.0) * 730;
                    const y = 230 - ((p.fluorescenceArbitraryUnits - 900) / 120) * 190;
                    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  })
                  .join(' ');

                return (
                  <path d={pathD} fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Soret Molecular Mechanism View */}
      {activeSubTab === 'SORET_MECHANISM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Atom className="w-4 h-4 text-teal-400" />
              Hiệu Ứng Ludwig-Soret: 3 Yếu Tố Quyết Định Hệ Số Nhiệt Di Chuyển S_T
            </h3>
            <p className="text-xs text-ivory-muted mt-0.5">
              Hệ số Soret S_T = D_T / D (K⁻¹) nhạy cảm đồng thời với kích thước, điện tích bề mặt và vỏ hydrat hóa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 space-y-1.5">
              <span className="text-xs font-bold text-teal-300">1. Kích Thước Bán Kính r_H</span>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Mặt cắt tương tác nhiệt của phân tử tăng lên khi tạo phức hợp phối tử. Sự thay đổi bán kính thủy
                động học làm biến đổi tỷ số khuếch tán tịnh tiến D.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5">
              <span className="text-xs font-bold text-amber-300">2. Điện Tích Hiệu Dụng Z_eff</span>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Khi phối tử mang điện tích liên kết vào pocket, điện thế bề mặt Zeta và đám mây ion Debye-Hückel
                bị trung hòa hoặc tái phân bố, thay đổi đột ngột lực đẩy nhiệt.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1.5">
              <span className="text-xs font-bold text-rose-300">3. Vỏ Hydrat Hóa ΔS_hydration</span>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Sự giải phóng các phân tử nước có trật tự cao khỏi khe liên kết kỵ nước tạo bước nhảy entropy lớn,
                tạo tín hiệu MST ngay cả khi phối tử có khối lượng phân tử rất nhỏ (&lt;300 Da).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Biomedical Applications & Curriculum Notes */}
      {activeSubTab === 'BIOMEDICAL_CURRICULUM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/20 rounded-xl border border-purple-500/30 text-purple-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Ứng Dụng Sàng Lọc Thuốc Dược Phẩm & GDPT 2018
              </h3>
              <p className="text-xs text-ivory-muted">
                Đo đạc ái lực K_d trực tiếp trong dịch chiết tế bào lysate và huyết thanh máu toàn phần.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Không Cố Định Bề Mặt
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Không giống như SPR (Biacore) phải gắn mẫu lên chip vàng, MST đo trực tiếp trong dung dịch tự do
                100%, bảo toàn nguyên vẹn cấu hình không gian 3D tự nhiên của protein.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Đo Được Trong Huyết Thanh
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Nhờ kênh huỳnh quang đặc hiệu (RED/BLUE), MST đo ái lực của kháng thể hoặc thuốc trong môi trường
                phức tạp như máu toàn phần, kiểm tra độ gắn kết protein huyết tương.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> GDPT 2018 Hóa Học & Sinh Học
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
