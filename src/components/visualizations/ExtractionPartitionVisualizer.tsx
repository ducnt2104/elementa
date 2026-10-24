// src/components/visualizations/ExtractionPartitionVisualizer.tsx
// ============================================================================
// ELEMENTA LIQUID-LIQUID EXTRACTION & SEPARATORY FUNNEL SIMULATOR
// Standards: IUPAC Compendium of Chemical Terminology & Vietnam GDPT 2018 Chemistry 11
// Covers: Nernst Distribution Law, Multi-batch Extraction Efficiency, Separatory Funnel
// Phase Inversion by Density (Top vs Bottom), Acid-Base 3-Component Separation Flow,
// and Salting-Out Effect (NaCl).
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  EXTRACTION_SOLVENTS,
  EXTRACTED_SOLUTES,
  ExtractionSolvent,
  ExtractedSolute,
  ACID_BASE_EXTRACTION_PROTOCOL,
  calculateMultipleExtractionYield,
  determineSeparatoryFunnelLayers,
  calculateSaltingOutEffect,
} from '../../domain/extractionPartitionEngine';
import { sound } from '../../audio/soundEngine';

export interface ExtractionPartitionVisualizerProps {
  initialSoluteId?: string;
}

export const ExtractionPartitionVisualizer: React.FC<ExtractionPartitionVisualizerProps> = ({
  initialSoluteId,
}) => {
  const [selectedSoluteId, setSelectedSoluteId] = useState<string>(initialSoluteId || 'benzoic_acid');
  const [selectedSolventId, setSelectedSolventId] = useState<string>('diethyl_ether');
  const [vAqueousMl, setVAqueousMl] = useState<number>(50);
  const [vOrgPerBatchMl, setVOrgPerBatchMl] = useState<number>(20);
  const [numExtractions, setNumExtractions] = useState<number>(3);
  const [naclConcentration, setNaclConcentration] = useState<number>(0.0); // Molar
  const [activeTab, setActiveTab] = useState<'funnel' | 'efficiency' | 'acidbase' | 'salting'>('funnel');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isDraining, setIsDraining] = useState<boolean>(false);
  const [acidBaseStepIndex, setAcidBaseStepIndex] = useState<number>(0);

  const solute: ExtractedSolute = EXTRACTED_SOLUTES[selectedSoluteId] || EXTRACTED_SOLUTES.benzoic_acid;
  const solvent: ExtractionSolvent = EXTRACTION_SOLVENTS[selectedSolventId] || EXTRACTION_SOLVENTS.diethyl_ether;

  // Base KD for this pair
  const baseKd = useMemo(() => {
    if (solvent.id === 'dichloromethane' || solvent.id === 'chloroform') {
      return solute.kd_dcmWater;
    }
    return solute.kd_etherWater;
  }, [solute, solvent]);

  // Enhanced KD with salting out
  const { enhancedKd, foldIncrease } = useMemo(() => {
    return calculateSaltingOutEffect(baseKd, naclConcentration);
  }, [baseKd, naclConcentration]);

  // Extraction yield calculations
  const yieldResults = useMemo(() => {
    return calculateMultipleExtractionYield(1.0, vAqueousMl, vOrgPerBatchMl, numExtractions, enhancedKd);
  }, [vAqueousMl, vOrgPerBatchMl, numExtractions, enhancedKd]);

  // Separatory funnel layer orientation
  const layers = useMemo(() => {
    return determineSeparatoryFunnelLayers(solvent);
  }, [solvent]);

  const handleShakeAndVent = () => {
    setIsShaking(true);
    sound.playSeparatoryFunnelShake?.();
    setTimeout(() => {
      setIsShaking(false);
    }, 450);
  };

  const handleDrainBottomLayer = () => {
    setIsDraining(true);
    sound.playStopcockDrainLiquid?.();
    setTimeout(() => {
      setIsDraining(false);
    }, 550);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* HEADER & BADGES */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
              IUPAC & GDPT 2018 Chemistry
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phương Pháp Chiết Lỏng - Lỏng
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              K_D = [S]org / [S]aq
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            🧪 Phễu Chiết & Nhiệt Động Học Phân Bố Dung Môi
          </h2>
          <p className="text-xs text-slate-400">
            Khảo sát định luật phân bố Nernst, hiệu quả chiết nhiều lần, phân tầng theo khối lượng riêng và quy trình chiết tách axit - bazơ.
          </p>
        </div>

        {/* INTERACTIVE ACTION BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShakeAndVent}
            disabled={isShaking || isDraining}
            className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              isShaking
                ? 'bg-cyan-500 text-slate-950 animate-pulse'
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md'
            }`}
          >
            <span>🌀</span>
            <span>{isShaking ? 'Lắc & Xả Van...' : 'Lắc & Xả Áp'}</span>
          </button>
          <button
            onClick={handleDrainBottomLayer}
            disabled={isShaking || isDraining}
            className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              isDraining
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
            }`}
          >
            <span>🔽</span>
            <span>{isDraining ? 'Đang Xả Đáy...' : 'Xả Lớp Đáy'}</span>
          </button>
        </div>
      </div>

      {/* SYSTEM CONFIGURATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">
            Chất Tan Cần Chiết Tách:
          </label>
          <select
            value={selectedSoluteId}
            onChange={(e) => {
              setSelectedSoluteId(e.target.value);
              sound.playPhotodetectorBeep?.();
            }}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
          >
            {Object.values(EXTRACTED_SOLUTES).map((s) => (
              <option key={s.id} value={s.id}>
                {s.vietnameseName} ({s.formula})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">
            Dung Môi Chiết Hữu Cơ:
          </label>
          <select
            value={selectedSolventId}
            onChange={(e) => {
              setSelectedSolventId(e.target.value);
              sound.playPhotodetectorBeep?.();
            }}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
          >
            {Object.values(EXTRACTION_SOLVENTS).filter(s => s.id !== 'water').map((s) => (
              <option key={s.id} value={s.id}>
                {s.vietnameseName} (d = {s.densityGPerMl} g/mL)
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 flex flex-col justify-center">
          <div className="text-[11px] text-slate-400">Hệ Số Phân Bố (K_D) & LogP:</div>
          <div className="text-base font-mono font-bold text-teal-400 flex items-baseline gap-2 mt-0.5">
            <span>K_D = {enhancedKd.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-normal">
              LogP = {solute.logP_octanolWater.toFixed(2)}
            </span>
            {foldIncrease > 1.0 && (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 ml-auto">
                +{foldIncrease}x (析 muối)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SEPARATORY FUNNEL VISUALIZATION & EFFICIENCY COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Separatory Funnel SVG */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between items-center text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-300">
              ⚗️ Mô Phỏng Phễu Chiết Quả Lê (Separatory Funnel)
            </span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
              layers.organicIsTop ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {layers.organicIsTop ? 'Hữu cơ ở lớp TRÊN' : 'Hữu cơ ở lớp DƯỚI'}
            </span>
          </div>

          <svg viewBox="0 0 240 240" className="w-[200px] h-[200px] select-none">
            {/* Funnel Glass Body Outline */}
            <path
              d="M 60 40 L 180 40 L 180 60 C 180 120 135 160 130 180 L 130 215 L 110 215 L 110 180 C 105 160 60 120 60 60 Z"
              fill="none"
              stroke="#64748b"
              strokeWidth="2.5"
            />
            {/* Glass stopper on top */}
            <rect x="100" y="25" width="40" height="15" rx="3" fill="#475569" stroke="#94a3b8" strokeWidth="1" />

            {/* Stopcock valve at bottom */}
            <circle cx="120" cy="195" r="8" fill={isDraining ? '#f59e0b' : '#334155'} stroke="#64748b" strokeWidth="1.5" />
            <line x1="108" y1="195" x2="132" y2="195" stroke="#94a3b8" strokeWidth="2.5" />

            {/* Liquid Layers */}
            {layers.organicIsTop ? (
              <>
                {/* Upper Layer: Organic (e.g. Diethyl ether - Light Yellow/Blue) */}
                <path
                  d="M 62 65 C 62 95 85 115 120 115 C 155 115 178 95 178 65 L 178 50 L 62 50 Z"
                  fill="#38bdf8"
                  opacity={isShaking ? 0.8 : 0.6}
                  className="transition-all"
                />
                {/* Lower Layer: Aqueous (e.g. Water - Deep Cyan/Indigo) */}
                <path
                  d="M 75 115 C 90 145 115 170 120 185 C 125 170 150 145 165 115 C 155 115 85 115 75 115 Z"
                  fill="#6366f1"
                  opacity={isDraining ? 0.3 : 0.7}
                  className="transition-all"
                />
              </>
            ) : (
              <>
                {/* Upper Layer: Aqueous Water (Top when solvent is DCM/Chloroform) */}
                <path
                  d="M 62 65 C 62 95 85 115 120 115 C 155 115 178 95 178 65 L 178 50 L 62 50 Z"
                  fill="#6366f1"
                  opacity={isShaking ? 0.8 : 0.6}
                />
                {/* Lower Layer: Dense Halogenated Organic (Bottom) */}
                <path
                  d="M 75 115 C 90 145 115 170 120 185 C 125 170 150 145 165 115 C 155 115 85 115 75 115 Z"
                  fill="#f59e0b"
                  opacity={isDraining ? 0.3 : 0.7}
                />
              </>
            )}

            {/* Meniscus Boundary Line */}
            <line x1="75" y1="115" x2="165" y2="115" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="3,1" opacity="0.9" />

            {/* Layer Annotations */}
            <text x="120" y="85" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
              {layers.organicIsTop ? 'Pha Hữu Cơ' : 'Pha Nước'}
            </text>
            <text x="120" y="145" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
              {layers.organicIsTop ? 'Pha Nước (Đáy)' : 'Pha Hữu Cơ (Đáy)'}
            </text>
          </svg>

          <div className="w-full text-center text-xs text-slate-400 mt-2">
            <div>{layers.upperLayerNameVI}</div>
            <div className="mt-0.5 text-slate-500">{layers.lowerLayerNameVI}</div>
          </div>
        </div>

        {/* Extraction Efficiency Comparison */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
              📊 Nguyên Tắc Vàng: Chiết Nhiều Lần Với Lượng Nhỏ
            </span>
            <p className="text-xs text-slate-400 mt-1">
              So sánh hiệu suất giữa việc chiết {numExtractions} lần (mỗi lần {vOrgPerBatchMl} mL) với 1 lần duy nhất bằng toàn bộ {numExtractions * vOrgPerBatchMl} mL dung môi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-900 p-3 rounded-lg border border-teal-500/30">
              <span className="text-[11px] text-slate-400 block">
                Chiết {numExtractions} Lần ({vOrgPerBatchMl} mL/lần):
              </span>
              <span className="text-2xl font-mono font-bold text-teal-400 mt-1 block">
                {yieldResults.extractionEfficiencyPercent}%
              </span>
              <span className="text-[10px] text-slate-500">Còn lại: {yieldResults.remainingMassAqueousG} g</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block">
                Chiết 1 Lần Duy Nhất ({numExtractions * vOrgPerBatchMl} mL):
              </span>
              <span className="text-2xl font-mono font-bold text-slate-300 mt-1 block">
                {yieldResults.singleBatchComparisonYieldPercent}%
              </span>
              <span className="text-[10px] text-rose-400">
                Thua kém: -{(yieldResults.extractionEfficiencyPercent - yieldResults.singleBatchComparisonYieldPercent).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Batch Progress Stepping */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 block">Tiến trình thu hồi qua từng lần chiết:</span>
            {yieldResults.batchProgress.map((b) => (
              <div key={b.batch} className="flex items-center gap-2 text-xs">
                <span className="w-16 font-mono text-slate-400">Lần {b.batch}:</span>
                <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${b.cumulativeExtractedPercent}%` }}
                  />
                </div>
                <span className="font-mono text-slate-200 w-12 text-right">
                  {b.cumulativeExtractedPercent}%
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800 leading-relaxed">
            💡 <strong>Bằng chứng toán học:</strong> Vì hàm số dạng mũ [V_aq / (V_aq + K_D · V_org)]^n suy giảm nhanh hơn nhiều so với hàm bậc nhất, nên chiết làm nhiều mẻ nhỏ luôn triệt để hơn dùng chung 1 thể tích lớn!
          </div>
        </div>
      </div>

      {/* PEDAGOGICAL TABS */}
      <div className="space-y-4">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto">
          {[
            { id: 'funnel', label: '📐 Kỹ Thuật Sử Dụng Phễu Chiết', icon: '⚗️' },
            { id: 'efficiency', label: '🔢 Thiết Lập Thể Tích & Số Lần Chiết', icon: '📊' },
            { id: 'acidbase', label: '🧪 Chiết Tách Axit - Bazơ 3 Cấu Tử', icon: '⚖️' },
            { id: 'salting', label: '🧂 Hiệu Ứng析 Muối (Salting-Out NaCl)', icon: '✨' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playPhotodetectorBeep?.();
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-teal-400 text-teal-300 bg-slate-800/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: FUNNEL SAFETY & TECHNIQUE */}
        {activeTab === 'funnel' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>⚗️ Quy Trình Thao Tác Chuẩn An Toàn Phòng Thí Nghiệm GDPT 2018</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-semibold text-cyan-300">1. Đậy Nút & Giữ Chặt:</span>
                <p className="text-slate-400 leading-relaxed">
                  Một tay cầm đầu cuống phễu chiết ngón trỏ giữ chặt khóa, tay kia ôm chặt nút phễu để tránh áp suất đẩy bật nắp làm bắn hóa chất vào người.
                </p>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-semibold text-amber-300">2. Dốc Ngược & Xả Khí:</span>
                <p className="text-slate-400 leading-relaxed">
                  Dốc ngược phễu chiết, hướng đuôi phễu vào góc tủ hút an toàn (tránh người đối diện) và mở khóa xả áp khí sinh ra do bay hơi hoặc phản ứng tạo CO2.
                </p>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-semibold text-emerald-300">3. Tách Pha & Mở Nút Trên:</span>
                <p className="text-slate-400 leading-relaxed">
                  Để yên trên giá sắt cho 2 pha phân tách hoàn toàn. <strong>Bắt buộc mở nút trên</strong> trước khi vặn khóa xả để chất lỏng chảy đều không bị chân không cản trở.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EFFICIENCY PARAMETER TUNER */}
        {activeTab === 'efficiency' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">
              🔢 Điều Chỉnh Thông Số Thể Tích & Đánh Giá Thu Hồi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Thể tích pha nước (V_aq):</label>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={vAqueousMl}
                  onChange={(e) => setVAqueousMl(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-xs text-teal-300">{vAqueousMl} mL</span>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Thể tích mỗi mẻ chiết (V_org):</label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={vOrgPerBatchMl}
                  onChange={(e) => setVOrgPerBatchMl(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-xs text-teal-300">{vOrgPerBatchMl} mL</span>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Số lần chiết liên tiếp (n):</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={numExtractions}
                  onChange={(e) => setNumExtractions(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-xs text-teal-300">{numExtractions} lần</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACID-BASE 3-COMPONENT SEPARATION PROTOCOL */}
        {activeTab === 'acidbase' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>⚖️ Quy Trình Tách Hỗn Hợp 3 Cấu Tử: Axit Benzoic + Anilin + Naphtalen</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Khai thác sự biến đổi độ tan giữa dạng phân tử trung tính (tan trong ete) và dạng ion muối (tan trong nước).
                </p>
              </div>

              <div className="flex gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAcidBaseStepIndex(idx);
                      sound.playPhotodetectorBeep?.();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      acidBaseStepIndex === idx
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Bước {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Card */}
            {(() => {
              const step = ACID_BASE_EXTRACTION_PROTOCOL[acidBaseStepIndex];
              return (
                <div className="bg-slate-900 p-4 rounded-xl border border-purple-500/40 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-300">
                      Bước {step.stepNumber}: {step.titleVI}
                    </span>
                    <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-mono">
                      Thu hồi: {step.targetSoluteIsolated}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Thuốc thử phản ứng chiết:</span>
                      <strong className="text-cyan-300">{step.reagentAdded}</strong>
                      <div className="text-[11px] text-slate-400 mt-1">{step.reagentRoleVI}</div>
                      <div className="font-mono text-[11px] text-amber-300 mt-1">{step.chemicalEquation}</div>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Tái kết tủa thu sản phẩm:</span>
                      <strong className="text-rose-300">{step.precipitationReagent}</strong>
                      <div className="font-mono text-[11px] text-emerald-300 mt-1">{step.precipitationEquation}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded border border-slate-800 italic">
                    💡 {step.pedagogicalNoteVI}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 4: SALTING-OUT EFFECT (NACL) */}
        {activeTab === 'salting' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                🧂 Hiệu Ứng析 Muối (Salting-Out Effect Bằng NaCl)
              </h3>
              <p className="text-xs text-slate-400">
                Thêm muối ăn NaCl làm tăng lực ion của pha nước, cạnh tranh vỏ solvat hóa nước và đẩy chất hữu cơ sang pha ete.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-300 block uppercase">Nồng độ muối NaCl bổ sung:</span>
                <input
                  type="range"
                  min="0.0"
                  max="3.0"
                  step="0.2"
                  value={naclConcentration}
                  onChange={(e) => setNaclConcentration(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>0.0 M (Nước cất)</span>
                  <span className="text-amber-400 font-bold">{naclConcentration.toFixed(1)} mol/L NaCl</span>
                  <span>3.0 M (Gần bão hòa)</span>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-center">
                <span className="text-xs text-slate-400">Hệ số K_D sau khi析 muối (Setschenow equation):</span>
                <div className="text-2xl font-mono font-bold text-teal-400">
                  K_D = {enhancedKd.toFixed(2)}
                  <span className="text-xs text-amber-300 font-normal ml-2">({foldIncrease}x so với gốc)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Giúp phá bọt nhũ tương (emulsion) cứng đầu và tăng hiệu suất thu hồi chất tan lên tối đa!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
