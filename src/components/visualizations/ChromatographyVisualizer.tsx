// src/components/visualizations/ChromatographyVisualizer.tsx
// ============================================================================
// ELEMENTA THIN-LAYER & COLUMN CHROMATOGRAPHY INTERACTIVE SIMULATOR
// Standards: IUPAC Compendium of Analytical Nomenclature & Vietnam GDPT 2018 Chemistry 11
// Covers: TLC Capillary Ascent, Retardation Factor (Rf), UV 254nm Quenching,
// Column Chromatography Fractionation, Van Deemter Curve (HETP vs u), and Peak Resolution (Rs).
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  STATIONARY_PHASES,
  MOBILE_PHASE_SOLVENTS,
  CHROMATOGRAPHY_MIXTURES,
  ChromatographyMixture,
  calculateRf,
  calculateDynamicRf,
  calculateVanDeemterEfficiency,
  calculatePeakResolution,
  calculateColumnElutionVolumes,
} from '../../domain/chromatographyEngine';
import { sound } from '../../audio/soundEngine';

export interface ChromatographyVisualizerProps {
  initialMixtureId?: string;
}

export const ChromatographyVisualizer: React.FC<ChromatographyVisualizerProps> = ({
  initialMixtureId,
}) => {
  const [selectedMixtureId, setSelectedMixtureId] = useState<string>(
    initialMixtureId || 'leaf_pigments'
  );
  const [activeTab, setActiveTab] = useState<'tlc' | 'column' | 'vandeemter' | 'resolution'>('tlc');
  const [polarFraction, setPolarFraction] = useState<number>(0.30); // 0.0 to 1.0
  const [solventFrontPercent, setSolventFrontPercent] = useState<number>(85); // 10% to 95%
  const [isUvLampOn, setIsUvLampOn] = useState<boolean>(false);
  const [isSimulatingAscent, setIsSimulatingAscent] = useState<boolean>(false);

  // Column Chromatography state
  const [columnElutionVolume, setColumnElutionVolume] = useState<number>(20); // mL collected
  const [isElutingColumn, setIsElutingColumn] = useState<boolean>(false);

  // Van Deemter Parameters
  const [eddyA, setEddyA] = useState<number>(10.0); // micrometers
  const [diffusionB, setDiffusionB] = useState<number>(25.0); // micrometers * mm/s
  const [resistanceC, setResistanceC] = useState<number>(1.5); // micrometers / (mm/s)

  // Peak Resolution Parameters
  const [tr1, setTr1] = useState<number>(5.2);
  const [tr2, setTr2] = useState<number>(7.1);
  const [w1, setW1] = useState<number>(0.8);
  const [w2, setW2] = useState<number>(1.0);

  const mixture: ChromatographyMixture =
    CHROMATOGRAPHY_MIXTURES[selectedMixtureId] || CHROMATOGRAPHY_MIXTURES.leaf_pigments;

  // Calculate dynamic Rf for all compounds in mixture
  const spotsWithRf = useMemo(() => {
    return mixture.compounds.map((comp) => {
      const dynamicRf = calculateDynamicRf(comp, polarFraction, false);
      return {
        compound: comp,
        rf: dynamicRf,
      };
    });
  }, [mixture, polarFraction]);

  // Van Deemter calculation
  const vanDeemter = useMemo(() => {
    return calculateVanDeemterEfficiency({
      eddyDiffusionA: eddyA,
      longitudinalDiffusionB: diffusionB,
      massTransferResistanceC: resistanceC,
    });
  }, [eddyA, diffusionB, resistanceC]);

  // Peak Resolution calculation
  const resolution = useMemo(() => {
    return calculatePeakResolution(tr1, tr2, w1, w2);
  }, [tr1, tr2, w1, w2]);

  // Column Elution calculation
  const columnData = useMemo(() => {
    return calculateColumnElutionVolumes(15.0, spotsWithRf);
  }, [spotsWithRf]);

  // Trigger capillary ascent simulation
  const handleSimulateAscent = () => {
    if (isSimulatingAscent) return;
    setIsSimulatingAscent(true);
    setSolventFrontPercent(15);
    sound.playEluentFlowHum?.();

    let cur = 15;
    const interval = setInterval(() => {
      cur += 5;
      if (cur >= 85) {
        setSolventFrontPercent(85);
        clearInterval(interval);
        setIsSimulatingAscent(false);
      } else {
        setSolventFrontPercent(cur);
      }
    }, 80);
  };

  // Toggle UV Lamp
  const handleToggleUv = () => {
    sound.playUiClick();
    sound.playRfSpotDetectBeep?.();
    setIsUvLampOn((prev) => !prev);
  };

  return (
    <div className="bg-navy/90 border border-teal-500/40 rounded-2xl p-5 sm:p-6 text-ivory shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              IUPAC ANALYTICAL & GDPT 2018 (HÓA 11)
            </span>
            <span className="text-xs text-ivory-muted font-mono">Chuyên Đề Sắc Kí Bản Mỏng & Sắc Kí Cột</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>🔬 Mô Phỏng Sắc Kí Bản Mỏng (TLC) & Sắc Kí Cột</span>
          </h2>
          <p className="text-xs text-ivory-muted mt-1 max-w-3xl">
            Tách biệt và tinh chế hỗn hợp hữu cơ dựa trên sự phân bố khác nhau giữa pha tĩnh phân cực
            (Silicagel/Alumina) và pha động rửa giải (Dung môi hữu cơ). Xác định hệ số lưu giữ Rf và phương trình Van Deemter.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-1.5 bg-obsidian/60 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('tlc');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tlc'
                ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Bản Mỏng TLC (Rf)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              sound.playColumnDropDrip?.();
              setActiveTab('column');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'column'
                ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Sắc Kí Cột (Phân Đoạn)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('vandeemter');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'vandeemter'
                ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Đường Van Deemter (HETP)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('resolution');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'resolution'
                ? 'bg-teal-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Độ Phân Giải Mũi (Rs)
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.values(CHROMATOGRAPHY_MIXTURES).map((mix) => (
          <button
            key={mix.id}
            onClick={() => {
              sound.playUiClick();
              setSelectedMixtureId(mix.id);
            }}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedMixtureId === mix.id
                ? 'bg-teal-950/60 border-teal-400 shadow-md ring-1 ring-teal-400'
                : 'bg-obsidian/40 border-navy-light/40 hover:border-teal-500/40 hover:bg-obsidian/70'
            }`}
          >
            <div>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">
                {mix.categoryVI}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">{mix.titleVI}</h4>
              <p className="text-[11px] text-ivory-muted line-clamp-2 mt-1">
                {mix.educationalSignificanceVI}
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-teal-300">
              <span>{mix.compounds.length} chất:</span>
              <span className="text-ivory-muted">
                {mix.compounds.map((c) => c.nameVI.split(' ')[0]).join(', ')}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: THIN-LAYER CHROMATOGRAPHY (TLC) PLATE SIMULATOR                    */}
      {/* ========================================================================= */}
      {activeTab === 'tlc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Điều Kiện Chạy Bản Mỏng TLC</span>
              <button
                onClick={handleToggleUv}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                  isUvLampOn
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                    : 'bg-navy border-navy-light text-ivory-muted hover:text-white'
                }`}
              >
                {isUvLampOn ? '🟣 Đèn UV 254 nm: BẬT' : '⚪ Ánh Sáng Thường'}
              </button>
            </h3>

            {/* Eluent Polarity Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Hệ Pha Động (Hexan : Etyl axetat):</span>
                <span className="font-mono text-teal-300 font-bold">
                  {Math.round((1 - polarFraction) * 10)} : {Math.round(polarFraction * 10)}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={polarFraction}
                onChange={(e) => setPolarFraction(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
                <span>100% Hexan (Không phân cực, Rf thấp)</span>
                <span>100% EtOAc (Phân cực cao, Rf cao)</span>
              </div>
            </div>

            {/* Capillary Rise Progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Mức Dâng Mao Dẫn Dung Môi:</span>
                <span className="font-mono text-cyan-300 font-bold">{solventFrontPercent}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                step="1"
                value={solventFrontPercent}
                onChange={(e) => setSolventFrontPercent(parseInt(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Simulate Ascent Action */}
            <button
              onClick={handleSimulateAscent}
              disabled={isSimulatingAscent}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                isSimulatingAscent
                  ? 'bg-navy-light text-ivory-muted cursor-not-allowed'
                  : 'bg-teal-500 hover:bg-teal-400 text-obsidian shadow-md font-extrabold'
              }`}
            >
              {isSimulatingAscent ? 'Đang Dâng Mao Dẫn...' : '▶ Chạy Mao Dẫn Bản Mỏng Tự Động'}
            </button>

            {/* Rf Calculated Results Table */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="text-xs font-mono font-bold text-teal-300">
                BẢNG TÍNH HỆ SỐ LƯU GIỮ (Rf = d_chất / d_dungmôi):
              </h4>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {spotsWithRf.map((item) => (
                  <div
                    key={item.compound.id}
                    className="p-2 rounded-lg bg-navy/60 border border-navy-light/40 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block shadow-sm"
                        style={{ backgroundColor: item.compound.colorRgb }}
                      />
                      <div>
                        <div className="font-bold text-white">{item.compound.nameVI}</div>
                        <div className="text-[10px] font-mono text-ivory-muted">{item.compound.formula}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-teal-300 text-sm">
                        Rf = {item.rf.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-ivory-muted">
                        Vị trí: {(item.rf * solventFrontPercent * 0.8).toFixed(1)} mm
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SVG TLC Chamber & Plate Rendering */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-obsidian/70 p-5 rounded-xl border border-navy-light/40 min-h-[460px]">
            <div className="text-xs font-mono text-ivory-muted mb-2 flex items-center gap-3">
              <span>Bình Khai Triển TLC (TLC Developing Chamber)</span>
              {isUvLampOn && (
                <span className="text-purple-400 font-bold animate-pulse">
                  [Đèn Tử Ngoại UV 254 nm Đang Chiếu]
                </span>
              )}
            </div>

            <svg
              viewBox="0 0 320 420"
              className="w-full max-w-sm h-auto select-none rounded-xl border border-white/10 shadow-2xl"
              style={{
                backgroundColor: isUvLampOn ? '#1a102f' : '#0a0f1d',
              }}
            >
              {/* Glass Chamber Walls */}
              <rect
                x="30"
                y="20"
                width="260"
                height="380"
                rx="12"
                fill="none"
                stroke={isUvLampOn ? '#a855f7' : '#38bdf8'}
                strokeWidth="2.5"
                opacity="0.5"
              />
              {/* Chamber Lid */}
              <rect
                x="20"
                y="14"
                width="280"
                height="12"
                rx="4"
                fill={isUvLampOn ? '#581c87' : '#1e293b'}
                stroke="#64748b"
                strokeWidth="1"
              />
              <circle cx="160" cy="10" r="5" fill="#94a3b8" />

              {/* Liquid Eluent Pool at Bottom */}
              <rect
                x="32"
                y="360"
                width="256"
                height="38"
                rx="4"
                fill={isUvLampOn ? '#3b0764' : '#0284c7'}
                opacity="0.3"
              />
              <line x1="32" y1="360" x2="288" y2="360" stroke="#38bdf8" strokeDasharray="3 3" opacity="0.6" />

              {/* TLC Silica Gel Plate */}
              <rect
                x="90"
                y="50"
                width="140"
                height="330"
                rx="3"
                fill={isUvLampOn ? '#10b981' : '#f8fafc'} // Under UV: fluorescent bright green background F254!
                stroke="#94a3b8"
                strokeWidth="1.5"
                style={{
                  filter: isUvLampOn ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' : 'none',
                }}
              />

              {/* Origin Baseline (Đường xuất phát - bút chì chì 10mm từ đáy) */}
              {/* Baseline Y = 350 */}
              <line x1="90" y1="350" x2="230" y2="350" stroke="#64748b" strokeDasharray="2 2" strokeWidth="1" />
              <text x="75" y="353" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">
                Xuất phát
              </text>

              {/* Solvent Front (Mặt tiền dung môi) */}
              {/* Dynamic Y based on solventFrontPercent: Y = 350 - (solventFrontPercent / 100) * 280 */}
              {(() => {
                const frontY = 350 - (solventFrontPercent / 100) * 280;
                return (
                  <g>
                    <line
                      x1="90"
                      y1={frontY}
                      x2="230"
                      y2={frontY}
                      stroke={isUvLampOn ? '#c084fc' : '#0284c7'}
                      strokeWidth="2"
                    />
                    <text
                      x="235"
                      y={frontY + 3}
                      fill={isUvLampOn ? '#c084fc' : '#38bdf8'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      Mặt dung môi
                    </text>
                  </g>
                );
              })()}

              {/* Spots Migration */}
              {spotsWithRf.map((item, idx) => {
                // Height delta = (solventFrontPercent / 100) * 280
                const availableHeight = (solventFrontPercent / 100) * 280;
                const spotY = 350 - item.rf * availableHeight;
                // Distributed X coordinates across plate
                const count = spotsWithRf.length;
                const spotX = 90 + ((idx + 1) * 140) / (count + 1);

                // Under UV, UV active substances quench fluorescence (appear as dark violet/black spots)
                const spotFill = isUvLampOn ? '#2e1065' : item.compound.colorRgb;
                const spotStroke = isUvLampOn ? '#a855f7' : '#ffffff';

                return (
                  <g key={item.compound.id} className="transition-all duration-300">
                    {/* Elliptical chromatographic spot */}
                    <ellipse
                      cx={spotX}
                      cy={spotY}
                      rx="7"
                      ry="5"
                      fill={spotFill}
                      stroke={spotStroke}
                      strokeWidth="1"
                      opacity="0.9"
                    />
                    {/* Spot label */}
                    <text
                      x={spotX}
                      y={spotY - 8}
                      fill={isUvLampOn ? '#ffffff' : '#0f172a'}
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {item.compound.nameVI.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="text-[11px] text-ivory-muted mt-3 text-center max-w-md">
              {isUvLampOn ? (
                <span className="text-purple-300">
                  Dưới tia cực tím 254 nm, chất chỉ thị huỳnh quang F254 trên silicagel phát quang xanh lá.
                  Các hợp chất hấp thụ tử ngoại (nhân thơm liên hợp) dập tắt huỳnh quang tạo thành các đốm đen/tím sẫm.
                </span>
              ) : (
                <span>
                  Các sắc tố tự nhiên có màu tự thân (như chlorophyll và carotene) quan sát trực tiếp bằng mắt thường.
                  Aspirin/Paracetamol không màu cần soi đèn UV để định vị.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COLUMN CHROMATOGRAPHY (FRACTIONATION SIMULATOR)                    */}
      {/* ========================================================================= */}
      {activeTab === 'column' && (
        <div className="space-y-6">
          <div className="bg-obsidian/50 p-4 rounded-xl border border-navy-light/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">Sắc Kí Cột Điều Chế (Preparative Column Chromatography)</h3>
                <p className="text-xs text-ivory-muted">
                  Hỗn hợp nạp vào đầu cột silicagel. Rót liên tục dung môi rửa giải, các chất di chuyển với tốc độ
                  khác nhau tạo thành các dải màu riêng biệt chảy xuống bình hứng theo thứ tự Rf lớn đến Rf nhỏ.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-300">
                  Thể tích rửa giải thu được: <strong>{columnElutionVolume} mL</strong>
                </span>
                <button
                  onClick={() => {
                    sound.playColumnDropDrip();
                    setColumnElutionVolume((prev) => Math.min(100, prev + 10));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-obsidian font-bold text-xs shadow"
                >
                  + Rửa Giải 10 mL
                </button>
              </div>
            </div>

            {/* Fraction order display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {columnData.map((item) => {
                const isEluted = columnElutionVolume >= item.elutionVolumeMl;
                return (
                  <div
                    key={item.compoundId}
                    className={`p-3 rounded-xl border transition-all ${
                      isEluted
                        ? 'bg-teal-950/40 border-teal-500/50 text-white'
                        : 'bg-navy/40 border-navy-light/40 text-ivory-muted opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-teal-400">
                        PHÂN ĐOẠN #{item.elutionOrder}
                      </span>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30"
                        style={{ backgroundColor: item.colorRgb }}
                      />
                    </div>
                    <h5 className="font-bold text-white text-sm mt-1">{item.compoundNameVI}</h5>
                    <div className="mt-2 pt-2 border-t border-white/5 text-[11px] font-mono space-y-0.5">
                      <div>Hệ số Rf bản mỏng: {item.rf}</div>
                      <div>Hệ số dung lượng k&apos;: {item.retentionFactorKPrime}</div>
                      <div className="font-bold text-teal-300">
                        Thể tích hứng: {item.elutionVolumeMl} mL {isEluted ? '✓ (Đã thu được)' : '(Đang trên cột)'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VAN DEEMTER COLUMN EFFICIENCY EQUATION (HETP VS VELOCITY)           */}
      {/* ========================================================================= */}
      {activeTab === 'vandeemter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Van Deemter Parameters Sliders */}
          <div className="lg:col-span-5 space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
            <h3 className="text-sm font-bold text-white">
              Phương Trình Van Deemter: H = A + B/u + C·u
            </h3>
            <p className="text-xs text-ivory-muted">
              Mô tả sự phụ thuộc của chiều cao đĩa lý thuyết (HETP, H) vào tốc độ dòng pha động (u).
              Càng thấp H, cột càng có nhiều đĩa lý thuyết (N = L / H) và độ phân giải càng cao.
            </p>

            {/* Term A: Eddy Diffusion */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Hệ số khuếch tán xoáy (A = 2λ·dp):</span>
                <span className="font-mono text-amber-300 font-bold">{eddyA.toFixed(1)} μm</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="25.0"
                step="0.5"
                value={eddyA}
                onChange={(e) => setEddyA(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-ivory-muted">Phụ thuộc kích thước hạt nhồi dp (không phụ thuộc tốc độ u).</span>
            </div>

            {/* Term B: Longitudinal Diffusion */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Hệ số khuếch tán dọc (B = 2γ·Dm):</span>
                <span className="font-mono text-rose-300 font-bold">{diffusionB.toFixed(1)} μm·mm/s</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="60.0"
                step="1.0"
                value={diffusionB}
                onChange={(e) => setDiffusionB(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
              <span className="text-[10px] text-ivory-muted">Khuếch tán phân tử dọc trục cột; ưu thế khi tốc độ dòng u rất nhỏ.</span>
            </div>

            {/* Term C: Mass Transfer Resistance */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Trở lực truyền khối (C = Cs + Cm):</span>
                <span className="font-mono text-cyan-300 font-bold">{resistanceC.toFixed(2)} μm/(mm/s)</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={resistanceC}
                onChange={(e) => setResistanceC(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-ivory-muted">Thời gian cân bằng chất tan qua lại giữa 2 pha; ưu thế khi tốc độ u lớn.</span>
            </div>

            {/* Optimal Values Output Box */}
            <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-500/40 space-y-1 text-xs font-mono">
              <div className="text-teal-300 font-bold">KẾT QUẢ TỐI ƯU CỘT (OPTIMAL EFFICIENCY):</div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Tốc độ dòng tối ưu (u_opt = √(B/C)):</span>
                <span className="font-bold text-white">{vanDeemter.optimalVelocityMmPerS} mm/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">HETP nhỏ nhất (H_min = A + 2√(BC)):</span>
                <span className="font-bold text-teal-300">{vanDeemter.minimumHetpUm} μm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Số đĩa lý thuyết / mét cột (N/m):</span>
                <span className="font-bold text-cyan-300">{vanDeemter.theoreticalPlatesPerMeter.toLocaleString()} đĩa/m</span>
              </div>
            </div>
          </div>

          {/* SVG Plot of Van Deemter Curve */}
          <div className="lg:col-span-7 bg-obsidian/70 p-5 rounded-xl border border-navy-light/40 flex flex-col items-center">
            <h4 className="text-xs font-mono text-ivory-muted mb-2">
              Đồ Thị Đường Cong Van Deemter (HETP μm theo Tốc Độ u mm/s)
            </h4>

            <svg viewBox="0 0 450 280" className="w-full h-auto select-none">
              {/* Axes */}
              <line x1="50" y1="230" x2="420" y2="230" stroke="#64748b" strokeWidth="1.5" />
              <line x1="50" y1="30" x2="50" y2="230" stroke="#64748b" strokeWidth="1.5" />
              <text x="235" y="260" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Tốc độ dòng pha động u (mm/s)
              </text>
              <text
                x="20"
                y="130"
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle"
                transform="rotate(-90 20 130)"
                fontFamily="monospace"
              >
                Chiều cao đĩa H (μm)
              </text>

              {/* Gridlines */}
              <line x1="50" y1="180" x2="420" y2="180" stroke="#334155" strokeDasharray="3 3" />
              <line x1="50" y1="130" x2="420" y2="130" stroke="#334155" strokeDasharray="3 3" />
              <line x1="50" y1="80" x2="420" y2="80" stroke="#334155" strokeDasharray="3 3" />

              {/* Component Curves: Eddy Diffusion A (Flat line) */}
              {(() => {
                const yA = 230 - (eddyA / 80) * 180;
                return (
                  <line
                    x1="50"
                    y1={yA}
                    x2="420"
                    y2={yA}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                );
              })()}

              {/* Total HETP Curve Path */}
              {(() => {
                const pts = vanDeemter.curveData.map((d) => {
                  const x = 50 + ((d.velocityMmPerS - 0.2) / 4.8) * 370;
                  const y = 230 - Math.min(200, (d.hetpUm / 80) * 180);
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                });
                return (
                  <path
                    d={`M ${pts.join(' L ')}`}
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="3"
                  />
                );
              })()}

              {/* Optimal Point Mark */}
              {(() => {
                const optX = 50 + ((vanDeemter.optimalVelocityMmPerS - 0.2) / 4.8) * 370;
                const optY = 230 - Math.min(200, (vanDeemter.minimumHetpUm / 80) * 180);
                return (
                  <g>
                    <circle cx={optX} cy={optY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1={optX} y1={optY} x2={optX} y2="230" stroke="#38bdf8" strokeDasharray="2 2" />
                    <text
                      x={optX}
                      y={optY - 10}
                      fill="#38bdf8"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      u_opt = {vanDeemter.optimalVelocityMmPerS} mm/s
                    </text>
                  </g>
                );
              })()}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono text-ivory-muted mt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-teal-400 inline-block" /> Tổng HETP: H = A + B/u + C·u
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-amber-400 inline-block" /> Đẳng hướng A (Khuấy)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Điểm Cực Tiểu H_min
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CHROMATOGRAPHIC PEAK RESOLUTION (Rs)                               */}
      {/* ========================================================================= */}
      {activeTab === 'resolution' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
            <h3 className="text-sm font-bold text-white">
              Độ Phân Giải Mũi Sắc Kí (Peak Resolution Rs)
            </h3>
            <p className="text-xs text-ivory-muted">
              Rs = 2 · (tR2 - tR1) / (w1 + w2). Theo quy chuẩn Dược điển và IUPAC, độ phân giải
              Rs ≥ 1.5 đạt yêu cầu tách hoàn toàn ở đường nền (Baseline resolution).
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Thời gian lưu mũi 1 (tR1):</span>
                  <span className="font-mono text-cyan-300 font-bold">{tr1.toFixed(1)} phút</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="8.0"
                  step="0.1"
                  value={tr1}
                  onChange={(e) => setTr1(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Thời gian lưu mũi 2 (tR2):</span>
                  <span className="font-mono text-teal-300 font-bold">{tr2.toFixed(1)} phút</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="12.0"
                  step="0.1"
                  value={tr2}
                  onChange={(e) => setTr2(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Độ rộng chân mũi 1 (w1):</span>
                  <span className="font-mono text-ivory font-bold">{w1.toFixed(1)} phút</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={w1}
                  onChange={(e) => setW1(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-slate-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ivory-muted">Độ rộng chân mũi 2 (w2):</span>
                  <span className="font-mono text-ivory font-bold">{w2.toFixed(1)} phút</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={w2}
                  onChange={(e) => setW2(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-slate-400"
                />
              </div>
            </div>

            {/* Resolution Verdict Card */}
            <div
              className={`p-3 rounded-lg border space-y-1.5 ${
                resolution.isBaselineResolved
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : resolution.resolutionRs >= 1.0
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span>ĐỘ PHÂN GIẢI Rs:</span>
                <span className="text-lg">{resolution.resolutionRs}</span>
              </div>
              <div className="text-xs font-semibold">{resolution.separationQualityVI}</div>
              <div className="text-[11px] opacity-80">
                Độ tinh khiết phân tích ước tính: ~{resolution.purityEstimatePercent}%
              </div>
            </div>
          </div>

          {/* SVG Gaussian Peaks Chromatogram */}
          <div className="lg:col-span-7 bg-obsidian/70 p-5 rounded-xl border border-navy-light/40 flex flex-col items-center">
            <h4 className="text-xs font-mono text-ivory-muted mb-2">
              Sắc Kí Đồ Tín Hiệu Đầu Dò (Chromatogram: Detector Response vs Time)
            </h4>

            <svg viewBox="0 0 450 260" className="w-full h-auto select-none">
              {/* Baseline */}
              <line x1="40" y1="210" x2="420" y2="210" stroke="#64748b" strokeWidth="1.5" />
              <line x1="40" y1="30" x2="40" y2="210" stroke="#64748b" strokeWidth="1.5" />
              <text x="230" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Thời gian lưu tR (phút)
              </text>

              {/* Peak 1 Gaussian Simulation */}
              {(() => {
                const sigma1 = w1 / 4;
                const pts1: string[] = [];
                for (let t = Math.max(0, tr1 - 2 * w1); t <= tr1 + 2 * w1; t += 0.05) {
                  const x = 40 + (t / 14) * 380;
                  const g = Math.exp(-Math.pow(t - tr1, 2) / (2 * Math.pow(sigma1, 2)));
                  const y = 210 - g * 140;
                  pts1.push(`${x.toFixed(1)},${y.toFixed(1)}`);
                }
                return (
                  <path
                    d={`M ${pts1.join(' L ')}`}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                );
              })()}

              {/* Peak 2 Gaussian Simulation */}
              {(() => {
                const sigma2 = w2 / 4;
                const pts2: string[] = [];
                for (let t = Math.max(0, tr2 - 2 * w2); t <= tr2 + 2 * w2; t += 0.05) {
                  const x = 40 + (t / 14) * 380;
                  const g = Math.exp(-Math.pow(t - tr2, 2) / (2 * Math.pow(sigma2, 2)));
                  const y = 210 - g * 150;
                  pts2.push(`${x.toFixed(1)},${y.toFixed(1)}`);
                }
                return (
                  <path
                    d={`M ${pts2.join(' L ')}`}
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                  />
                );
              })()}

              {/* Peak Apex Markers */}
              <circle
                cx={40 + (tr1 / 14) * 380}
                cy="70"
                r="4"
                fill="#38bdf8"
              />
              <text
                x={40 + (tr1 / 14) * 380}
                y="60"
                fill="#38bdf8"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
              >
                Mũi 1 ({tr1}p)
              </text>

              <circle
                cx={40 + (tr2 / 14) * 380}
                cy="60"
                r="4"
                fill="#14b8a6"
              />
              <text
                x={40 + (tr2 / 14) * 380}
                y="50"
                fill="#14b8a6"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
              >
                Mũi 2 ({tr2}p)
              </text>
            </svg>

            <div className="text-[11px] text-ivory-muted mt-2 text-center">
              Khoảng cách giữa hai đỉnh đỉnh ΔtR = {(Math.abs(tr2 - tr1)).toFixed(2)} phút.
              Độ rộng trung bình chân mũi w = {((w1 + w2) / 2).toFixed(2)} phút.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
