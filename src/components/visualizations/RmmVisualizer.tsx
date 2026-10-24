import React, { useState, useMemo, useEffect } from 'react';
import {
  RMM_STANDARD_CATALOG,
  RmmStandard,
  simulateRmmExperiment,
  SMR_RESONATOR_F0_HZ,
  SMR_EFFECTIVE_MASS_NANOGRAMS,
} from '../../domain/rmmEngine';
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
  ArrowUpCircle,
  ArrowDownCircle,
  Scale,
  Radio,
} from 'lucide-react';

interface RmmVisualizerProps {
  initialStandardId?: string;
}

export const RmmVisualizer: React.FC<RmmVisualizerProps> = ({
  initialStandardId = 'prefilled_syringe_igg_silicone',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'TRANSIT_PULSES' | 'BUOYANT_MASS_HISTOGRAM' | 'TWO_FLUID_DENSITY' | 'USP_CURRICULUM'
  >('TRANSIT_PULSES');

  const standard: RmmStandard = useMemo(() => {
    return (
      RMM_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || RMM_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [selectedEventId, setSelectedEventId] = useState<number>(1);

  // Play audio on standard change
  useEffect(() => {
    sound.playArchimedesBuoyantMassChime?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateRmmExperiment(standard, 24);
  }, [standard]);

  const selectedEvent = useMemo(() => {
    return simulation.events.find((e) => e.eventId === selectedEventId) || simulation.events[0];
  }, [simulation, selectedEventId]);

  return (
    <div className="space-y-6 text-ivory">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-navy to-cyan-950/80 p-5 rounded-2xl border border-cyan-500/30 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30 text-cyan-400">
              <Scale className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Suspended Microchannel Resonator (SMR)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  USP &lt;1788&gt; Buoyant Mass
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                Đo Khối Lượng Cộng Hưởng RMM & Lực Đẩy Ác-si-mét (Single-Particle SMR)
              </h2>
              <p className="text-xs text-ivory-muted mt-0.5">
                Cần rung vi lưu chân không 405 kHz · Phân biệt giọt dầu silicone (Δf &gt; 0) và protein kết tụ (Δf &lt; 0) ·
                Độ nhạy attogram (10⁻¹⁸ g)
              </p>
            </div>
          </div>

          {/* Key Metrics Quick Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-emerald-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Dầu Silicone Nổi (Δf &gt; 0)</div>
              <div className="text-sm font-mono font-bold text-emerald-300 flex items-center justify-end gap-1">
                <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-400" />
                {simulation.positiveBuoyantCount} hạt
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-rose-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Protein Lắng (Δf &lt; 0)</div>
              <div className="text-sm font-mono font-bold text-rose-300 flex items-center justify-end gap-1">
                <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                {simulation.negativeBuoyantCount} hạt
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-cyan-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Tỷ Lệ Phân Định</div>
              <div className="text-xs font-mono font-bold text-cyan-300">
                {simulation.resolvedSiliconOilVsProteinRatio}
              </div>
            </div>
          </div>
        </div>

        {/* Standard Selector Buttons */}
        <div className="mt-4 pt-4 border-t border-navy-light/40 flex flex-wrap gap-2">
          {RMM_STANDARD_CATALOG.map((std) => (
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

      {/* Resonator Physics Telemetry Strip */}
      <div className="bg-navy/70 p-4 rounded-2xl border border-navy-light/40 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Tần Số Dao Động Riêng f₀</span>
          <div className="text-white font-bold mt-0.5">{(SMR_RESONATOR_F0_HZ / 1000).toFixed(1)} kHz (chân không)</div>
        </div>
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Khối Lượng Hiệu Dụng Cantilever</span>
          <div className="text-cyan-300 font-bold mt-0.5">M_eff = {SMR_EFFECTIVE_MASS_NANOGRAMS} ng</div>
        </div>
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Dung Môi Tải (Carrier Fluid)</span>
          <div className="text-teal-300 font-bold mt-0.5">
            {standard.carrierFluidName} (ρ = {standard.carrierFluidDensityGPerCm3.toFixed(4)} g/cm³)
          </div>
        </div>
        <div className="p-3 bg-navy-light/20 rounded-xl border border-navy-light/30">
          <span className="text-[10px] text-ivory-muted uppercase font-mono">Giới Hạn Phát Hiện (LOD)</span>
          <div className="text-amber-300 font-bold mt-0.5">
            {standard.limitOfDetectionFemtograms} fg ({(standard.limitOfDetectionFemtograms * 1000).toFixed(0)} attograms)
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('TRANSIT_PULSES');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'TRANSIT_PULSES'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4 text-cyan-300" />
          <span>Xung Quá Cảnh Đơn Hạt (Transit Pulses)</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('BUOYANT_MASS_HISTOGRAM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'BUOYANT_MASS_HISTOGRAM'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-300" />
          <span>Phổ Phân Bố Khối Lượng Nổi (m_b)</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('TWO_FLUID_DENSITY');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'TWO_FLUID_DENSITY'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 text-purple-300" />
          <span>Đo Tỷ Trọng Bằng 2 Dung Môi (H₂O vs D₂O)</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('USP_CURRICULUM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'USP_CURRICULUM'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 text-blue-300" />
          <span>Tiêu Chuẩn Dược Điển USP & GDPT 2018</span>
        </button>
      </div>

      {/* Sub-Tab 1: Transit Pulses Live View */}
      {activeSubTab === 'TRANSIT_PULSES' && (
        <div className="space-y-4">
          <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  Xung Dịch Chuyển Tần Số Khi Hạt Chạy Qua Ống Chữ U (Transit Pulse)
                </h3>
                <span className="text-[11px] font-mono text-ivory-muted">
                  Đỉnh hướng lên (Δf &gt; 0) = Dầu nổi · Đỉnh hướng xuống (Δf &lt; 0) = Protein chìm · Nhấp vào hạt để nghe âm thanh
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-cyan-300 font-bold">
                  Sự kiện #{selectedEvent.eventId}: {selectedEvent.analyteName}
                </span>
                <span className="text-amber-300">Δf = {selectedEvent.peakFrequencyShiftHz} Hz</span>
              </div>
            </div>

            {/* SVG Transit Pulse Canvas */}
            <div className="w-full h-72 bg-obsidian/90 rounded-xl border border-navy-light/60 p-2 relative overflow-hidden">
              <svg viewBox="0 0 800 260" className="w-full h-full">
                {/* Center Baseline Zero Frequency Shift */}
                <line x1="50" y1="130" x2="780" y2="130" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="55" y="125" fill="#94a3b8" fontSize="9" fontFamily="monospace">Δf = 0 Hz (Đường nền)</text>

                {/* Positive Region Shading (Floats) */}
                <rect x="50" y="20" width="730" height="110" fill="#065f46" opacity="0.15" />
                <text x="650" y="40" fill="#34d399" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                  ▲ DẦU NỔI (Δf &gt; 0)
                </text>

                {/* Negative Region Shading (Sinks) */}
                <rect x="50" y="130" width="730" height="110" fill="#881337" opacity="0.15" />
                <text x="650" y="220" fill="#fb7185" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                  ▼ PROTEIN LẮNG (Δf &lt; 0)
                </text>

                {/* Current Event Pulse Curve */}
                {(() => {
                  const pts = selectedEvent.pulseTrace;
                  if (!pts || pts.length < 2) return null;

                  // Maximum scale ~ 40 Hz
                  const maxHz = Math.max(30, Math.abs(selectedEvent.peakFrequencyShiftHz) * 1.3);

                  const pathD = pts
                    .map((p, idx) => {
                      const x = 50 + (p.timeMicrosec / 80.0) * 730;
                      // Positive shift goes UP (y < 130), Negative shift goes DOWN (y > 130)
                      const y = 130 - (p.frequencyShiftHz / maxHz) * 100;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ');

                  const isPositive = selectedEvent.buoyancySign === 'POSITIVE_BUOYANT';

                  return (
                    <g>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isPositive ? '#10b981' : '#f43f5e'}
                        strokeWidth="3.0"
                      />
                      {/* Peak apex dot */}
                      {(() => {
                        const apexT = 40;
                        const apexPt = pts.find((p) => p.timeMicrosec === apexT) || pts[Math.floor(pts.length / 2)];
                        const ax = 50 + (apexPt.timeMicrosec / 80.0) * 730;
                        const ay = 130 - (apexPt.frequencyShiftHz / maxHz) * 100;
                        return (
                          <g>
                            <circle cx={ax} cy={ay} r="5" fill={isPositive ? '#34d399' : '#fb7185'} />
                            <text
                              x={ax}
                              y={isPositive ? ay - 12 : ay + 20}
                              fill={isPositive ? '#a7f3d0' : '#fecdd3'}
                              fontSize="10"
                              fontFamily="monospace"
                              textAnchor="middle"
                              fontWeight="bold"
                            >
                              Δf = {selectedEvent.peakFrequencyShiftHz} Hz (m_b = {selectedEvent.buoyantMassFemtograms} fg)
                            </text>
                          </g>
                        );
                      })()}
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Event List Selector */}
            <div className="mt-4 flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
              {simulation.events.map((ev) => {
                const isSelected = selectedEventId === ev.eventId;
                const isPos = ev.buoyancySign === 'POSITIVE_BUOYANT';

                return (
                  <button
                    key={ev.eventId}
                    onClick={() => {
                      setSelectedEventId(ev.eventId);
                      sound.playResonatorCantileverTransitBlip?.(ev.peakFrequencyShiftHz);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? isPos
                          ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40 border border-emerald-400'
                          : 'bg-rose-600 text-white font-bold shadow-md shadow-rose-950/40 border border-rose-400'
                        : 'bg-navy-light/40 text-ivory-muted hover:text-white border border-navy-light/30'
                    }`}
                  >
                    {isPos ? (
                      <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                    )}
                    <span>#{ev.eventId}</span>
                    <span className="font-bold">{ev.buoyantMassFemtograms} fg</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Buoyant Mass Histogram View */}
      {activeSubTab === 'BUOYANT_MASS_HISTOGRAM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Phổ Phân Bố Khối Lượng Nổi Lưỡng Đỉnh (Bimodal Buoyant Mass Histogram)
              </h3>
              <p className="text-xs text-ivory-muted mt-0.5">
                RMM tách biệt hoàn toàn 2 quần thể hạt dựa trên dấu lực đẩy Ác-si-mét mà kính hiển vi quang học
                không thể phân biệt.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ArrowUpCircle className="w-4 h-4 text-emerald-400" />
                Quần Thể Dầu Silicone Nổi (rho &lt; rho_nước)
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-200">
                {simulation.positiveBuoyantCount} hạt (Trung vị: {simulation.medianPositiveMassFg} fg)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Khối lượng riêng ρ ≈ 0.965 g/cm³ nhỏ hơn dung môi đệm nước (ρ = 1.005 g/cm³).
                Lực đẩy Ác-si-mét lớn hơn trọng lực, hạt làm giảm quán tính tổng thể của cần rung,
                dẫn đến tần số dao động TĂNG lên (Δf &gt; 0).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <ArrowDownCircle className="w-4 h-4 text-rose-400" />
                Quần Thể Protein Kết Tụ Lắng (rho &gt; rho_nước)
              </span>
              <div className="text-2xl font-bold font-mono text-rose-200">
                {simulation.negativeBuoyantCount} hạt (Trung vị: {simulation.medianNegativeMassFg} fg)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Khối lượng riêng protein ρ ≈ 1.32 g/cm³ đậm đặc hơn nước. Hạt làm tăng tải khối lượng quán tính
                của cần rung, kéo tần số dao động GIẢM xuống (Δf &lt; 0).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Two-Fluid Density Derivation View */}
      {activeSubTab === 'TWO_FLUID_DENSITY' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-400" />
              Đo Khối Lượng Riêng Bằng 2 Dung Môi (H₂O vs D₂O Two-Fluid Method)
            </h3>
            <p className="text-xs text-ivory-muted mt-0.5">
              Bằng cách đo khối lượng nổi m_b của cùng một loại hạt trong 2 chất lỏng có khối lượng riêng khác nhau
              (nước thường H₂O và nước nặng D₂O), ta xác định được chính xác 100% tỷ trọng hạt ρ_p.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
              <span className="text-xs font-bold text-purple-300">Công Thức Khối Lượng Riêng Hạt (rho_p)</span>
              <div className="p-3 bg-navy-light/40 rounded-lg text-sm font-mono text-center text-purple-200">
                ρ_p = (m_b1 · ρ₂ - m_b2 · ρ₁) / (m_b1 - m_b2)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                • <strong>m_b1</strong>: Khối lượng nổi đo trong dung môi 1 (H₂O, ρ₁ = 0.9982 g/cm³)
                <br />• <strong>m_b2</strong>: Khối lượng nổi đo trong dung môi 2 (D₂O, ρ₂ = 1.1050 g/cm³)
                <br />• Giải hệ 2 phương trình bậc nhất triệt tiêu hoàn toàn biến số thể tích V_p, cho ra tỷ trọng
                tuyệt đối không phụ thuộc vào giả định hạt hình cầu.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
              <span className="text-xs font-bold text-cyan-300">Tính Thể Tích & Khối Lượng Khô (Dry Mass)</span>
              <div className="p-3 bg-navy-light/40 rounded-lg text-sm font-mono text-center text-cyan-200">
                V_p = (m_b1 - m_b2) / (ρ₂ - ρ₁) ·· m_p = V_p · ρ_p
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Phương pháp này cung cấp cân đo khối lượng khô m_p ở cấp độ femtogram cho từng tế bào sống,
                bào tử vi khuẩn hoặc hạt nano kim loại mà không làm tổn thương hay phá hủy mẫu.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: USP Pharmacopoeia & GDPT 2018 View */}
      {activeSubTab === 'USP_CURRICULUM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30 text-blue-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Tiêu Chuẩn Thuốc Tiêm USP &lt;1788&gt; & GDPT 2018
              </h3>
              <p className="text-xs text-ivory-muted">
                Quy định kiểm nghiệm hạt bán vi mô (sub-visible particulate matter) trong dược phẩm sinh học.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Nguy Cơ Kháng Thể Kết Tụ
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Hạt protein kết tụ kích thước 1-10 μm là nguyên nhân hàng đầu kích hoạt hệ thống miễn dịch tạo
                kháng thể chống thuốc (ADA). FDA yêu cầu giám sát chặt chẽ tỷ lệ protein kết tụ trong bơm tiêm đóng sẵn.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Khử Nhiễu Dầu Silicone
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Dầu bôi trơn PDMS trên thành bơm tiêm bong ra tạo hàng triệu giọt hạt sub-micron. RMM là phương
                pháp duy nhất loại trừ các giọt dầu này khỏi thống kê protein kết tụ.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> GDPT 2018 Vật Lý & Hóa Học
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
