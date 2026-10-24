// src/components/visualizations/GasLawsKineticVisualizer.tsx
// ============================================================================
// ELEMENTA GAS LAWS, KINETIC MOLECULAR THEORY & MAXWELL-BOLTZMANN SPEED SIMULATOR
// Standards: IUPAC Physical Chemistry & Vietnam GDPT 2018 Chemistry 10
// Covers: Ideal Gas Equation (PV = nRT), Real Gas Van der Waals [(P + a(n/V)^2)(V - nb) = nRT],
// Compressibility Factor (Z), Graham's Law of Effusion, and Maxwell-Boltzmann Speed Distribution.
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  GAS_SPECIES,
  GasSpecies,
  calculateMaxwellBoltzmannDistribution,
  calculateRealVsIdealGasComparison,
  calculateGrahamEffusion,
} from '../../domain/gasLawsKineticEngine';
import { sound } from '../../audio/soundEngine';

export interface GasLawsKineticVisualizerProps {
  initialGasId?: string;
}

export const GasLawsKineticVisualizer: React.FC<GasLawsKineticVisualizerProps> = ({
  initialGasId,
}) => {
  const [selectedGasId, setSelectedGasId] = useState<string>(initialGasId || 'nitrogen');
  const [temperatureK, setTemperatureK] = useState<number>(298.15); // 25 °C
  const [volumeL, setVolumeL] = useState<number>(5.0); // Liters
  const [moles, setMoles] = useState<number>(1.0); // Moles
  const [activeTab, setActiveTab] = useState<'maxwell' | 'vanderwaals' | 'piston' | 'graham'>('maxwell');

  // Graham effusion comparison state
  const [grahamGas2Id, setGrahamGas2Id] = useState<string>('hydrogen');

  const gas: GasSpecies = GAS_SPECIES[selectedGasId] || GAS_SPECIES.nitrogen;

  // Calculate Maxwell-Boltzmann distribution
  const maxwell = useMemo(() => {
    return calculateMaxwellBoltzmannDistribution(selectedGasId, temperatureK, 2500, 25);
  }, [selectedGasId, temperatureK]);

  // Calculate Real vs Ideal Gas
  const realComparison = useMemo(() => {
    return calculateRealVsIdealGasComparison(selectedGasId, temperatureK, volumeL, moles);
  }, [selectedGasId, temperatureK, volumeL, moles]);

  // Calculate Graham's Effusion
  const graham = useMemo(() => {
    return calculateGrahamEffusion(selectedGasId, grahamGas2Id);
  }, [selectedGasId, grahamGas2Id]);

  // Action handlers
  const handlePistonChange = (newVol: number) => {
    setVolumeL(newVol);
    sound.playGasPistonCompressionWhoosh?.();
  };

  return (
    <div className="bg-navy/90 border border-sky-500/40 rounded-2xl p-5 sm:p-6 text-ivory shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              IUPAC THERMODYNAMICS & GDPT 2018 (HÓA 10)
            </span>
            <span className="text-xs text-ivory-muted font-mono">Động Học Phân Tử Chất Khí & Phân Bố Maxwell-Boltzmann</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>💨 Mô Phỏng Định Luật Khí & Tốc Độ Phân Tử Maxwell-Boltzmann</span>
          </h2>
          <p className="text-xs text-ivory-muted mt-1 max-w-3xl">
            Khảo sát phương trình trạng thái khí lý tưởng (PV = nRT), phương trình khí thực Van der Waals,
            hệ số nén Z, định luật khuếch tán Graham và phân bố tốc độ phân tử v_mp &lt; v_avg &lt; v_rms.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-1.5 bg-obsidian/60 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('maxwell');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'maxwell'
                ? 'bg-sky-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Phân Bố Tốc Độ (Maxwell)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('vanderwaals');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'vanderwaals'
                ? 'bg-sky-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Khí Thực (Van der Waals)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              sound.playGasPistonCompressionWhoosh?.();
              setActiveTab('piston');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'piston'
                ? 'bg-sky-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Xi Lanh Piston (P-V-T)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('graham');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'graham'
                ? 'bg-sky-500 text-obsidian shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Khuếch Tán (Graham)
          </button>
        </div>
      </div>

      {/* Gas Species Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {Object.values(GAS_SPECIES).map((g) => (
          <button
            key={g.id}
            onClick={() => {
              sound.playUiClick();
              setSelectedGasId(g.id);
            }}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              selectedGasId === g.id
                ? 'bg-sky-950/70 border-sky-400 text-white shadow ring-1 ring-sky-400'
                : 'bg-obsidian/40 border-navy-light/40 text-ivory-muted hover:text-white hover:bg-obsidian/70'
            }`}
          >
            <div className="font-extrabold text-sm" style={{ color: g.colorHex }}>
              {g.formula}
            </div>
            <div className="text-[10px] font-bold truncate mt-0.5">{g.nameVI.split(' ')[0]}</div>
            <div className="text-[9px] font-mono text-ivory-muted">{g.molarMassGPerMol} g/mol</div>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MAXWELL-BOLTZMANN SPEED DISTRIBUTION CURVE                         */}
      {/* ========================================================================= */}
      {activeTab === 'maxwell' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Động Học & Vận Tốc Phân Tử {gas.nameVI}</span>
              <span className="font-mono text-xs text-sky-300 font-bold">
                M = {gas.molarMassGPerMol} g/mol
              </span>
            </h3>

            {/* Temperature Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Nhiệt độ tuyệt đối (T):</span>
                <span className="font-mono text-amber-300 font-bold">
                  {temperatureK.toFixed(0)} K ({maxwell.temperatureC} °C)
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                step="10"
                value={temperatureK}
                onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
                <span>50 K (Rất lạnh)</span>
                <span>298 K (Phòng)</span>
                <span>1200 K (Rất nóng)</span>
              </div>
            </div>

            {/* Characteristic Molecular Speeds Output Box */}
            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/40 space-y-2 text-xs font-mono">
              <div className="text-sky-300 font-bold flex items-center justify-between">
                <span>TỐC ĐỘ PHÂN TỬ ĐẶC TRƯNG:</span>
                <span className="text-[10px] text-ivory-muted">v_mp &lt; v_avg &lt; v_rms</span>
              </div>

              <div className="flex justify-between items-center p-1.5 rounded bg-black/40">
                <span className="text-amber-300 font-semibold">Tốc độ có xác suất lớn nhất (v_mp):</span>
                <span className="font-bold text-white text-sm">{maxwell.vMostProbableMPerS} m/s</span>
              </div>

              <div className="flex justify-between items-center p-1.5 rounded bg-black/40">
                <span className="text-teal-300 font-semibold">Tốc độ trung bình (v_avg):</span>
                <span className="font-bold text-white text-sm">{maxwell.vAverageMPerS} m/s</span>
              </div>

              <div className="flex justify-between items-center p-1.5 rounded bg-black/40">
                <span className="text-cyan-300 font-semibold">Tốc độ căn quân phương (v_rms):</span>
                <span className="font-bold text-white text-sm">{maxwell.vRootMeanSquareMPerS} m/s</span>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-white/10 text-[11px]">
                <span className="text-ivory-muted">Động năng tịnh tiến trung bình (3/2 RT):</span>
                <span className="font-bold text-amber-200">{maxwell.kineticEnergyPerMoleJ} J/mol</span>
              </div>
            </div>

            <p className="text-[11px] text-ivory-muted leading-relaxed">
              Theo thuyết động học phân tử chất khí, khi tăng nhiệt độ T, đỉnh phân bố dịch sang phải (tốc độ cao hơn)
              và bè thấp xuống, nhưng tổng diện tích dưới đường cong luôn chuẩn hóa bằng 1.0 (bảo toàn tổng số phân tử).
            </p>
          </div>

          {/* SVG Maxwell-Boltzmann Speed Curve */}
          <div className="lg:col-span-7 bg-obsidian/70 p-5 rounded-xl border border-navy-light/40 flex flex-col items-center">
            <h4 className="text-xs font-mono text-ivory-muted mb-2">
              Hàm Mật Độ Xác Suất Tốc Độ f(v) Theo Vận Tốc v (m/s)
            </h4>

            <svg viewBox="0 0 460 280" className="w-full h-auto select-none">
              {/* Axes */}
              <line x1="50" y1="230" x2="430" y2="230" stroke="#64748b" strokeWidth="1.5" />
              <line x1="50" y1="30" x2="50" y2="230" stroke="#64748b" strokeWidth="1.5" />
              <text x="240" y="260" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Vận tốc phân tử v (m/s)
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
                Mật độ xác suất f(v)
              </text>

              {/* Gridlines */}
              <line x1="50" y1="180" x2="430" y2="180" stroke="#334155" strokeDasharray="3 3" />
              <line x1="50" y1="130" x2="430" y2="130" stroke="#334155" strokeDasharray="3 3" />
              <line x1="50" y1="80" x2="430" y2="80" stroke="#334155" strokeDasharray="3 3" />

              {/* Curve Path */}
              {(() => {
                // Find max probability density for scaling
                let maxP = 0.0001;
                for (const pt of maxwell.curvePoints) {
                  if (pt.probabilityDensity > maxP) maxP = pt.probabilityDensity;
                }
                const pts = maxwell.curvePoints.map((pt) => {
                  const x = 50 + (pt.speedMPerS / 2500) * 380;
                  const y = 230 - (pt.probabilityDensity / (maxP * 1.15)) * 190;
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                });

                return (
                  <path
                    d={`M 50,230 L ${pts.join(' L ')}`}
                    fill="none"
                    stroke={gas.colorHex}
                    strokeWidth="3"
                  />
                );
              })()}

              {/* Characteristic Speed Vertical Markers */}
              {(() => {
                const xMp = 50 + (maxwell.vMostProbableMPerS / 2500) * 380;
                const xAvg = 50 + (maxwell.vAverageMPerS / 2500) * 380;
                const xRms = 50 + (maxwell.vRootMeanSquareMPerS / 2500) * 380;

                return (
                  <g>
                    {/* v_mp */}
                    <line x1={xMp} y1="30" x2={xMp} y2="230" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x={xMp} y="25" fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      v_mp
                    </text>

                    {/* v_avg */}
                    <line x1={xAvg} y1="45" x2={xAvg} y2="230" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x={xAvg} y="40" fill="#14b8a6" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      v_avg
                    </text>

                    {/* v_rms */}
                    <line x1={xRms} y1="60" x2={xRms} y2="230" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x={xRms} y="55" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      v_rms
                    </text>
                  </g>
                );
              })()}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono text-ivory-muted mt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-amber-400 inline-block" /> v_mp = {maxwell.vMostProbableMPerS} m/s
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-teal-400 inline-block" /> v_avg = {maxwell.vAverageMPerS} m/s
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> v_rms = {maxwell.vRootMeanSquareMPerS} m/s
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REAL VS IDEAL GAS VAN DER WAALS DEVIATION                          */}
      {/* ========================================================================= */}
      {activeTab === 'vanderwaals' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
            <h3 className="text-sm font-bold text-white">
              Phương Trình Khí Thực Van der Waals
            </h3>
            <p className="text-xs text-ivory-muted">
              [P + a·(n/V)²] · (V - n·b) = n·R·T.
              Thông số a đặc trưng cho lực hút liên phân tử (làm giảm P); thông số b đặc trưng cho thể tích riêng bị chiếm chỗ.
            </p>

            {/* Volume Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Thể tích bình chứa (V):</span>
                <span className="font-mono text-cyan-300 font-bold">{volumeL.toFixed(1)} L</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25.0"
                step="0.5"
                value={volumeL}
                onChange={(e) => handlePistonChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Moles Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Số mol khí (n):</span>
                <span className="font-mono text-white font-bold">{moles.toFixed(2)} mol</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.1"
                value={moles}
                onChange={(e) => setMoles(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-ivory-muted">Nhiệt độ (T):</span>
                <span className="font-mono text-amber-300 font-bold">{temperatureK.toFixed(0)} K</span>
              </div>
              <input
                type="range"
                min="100"
                max="800"
                step="10"
                value={temperatureK}
                onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Van der Waals Constants for current gas */}
            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40 text-xs font-mono space-y-1">
              <div className="text-sky-300 font-bold">HẰNG SỐ VAN DER WAALS {gas.nameVI}:</div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Lực hút phân tử a:</span>
                <span className="font-bold text-white">{gas.vanDerWaalsA} bar·L²/mol²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Thể tích riêng b:</span>
                <span className="font-bold text-white">{gas.vanDerWaalsB} L/mol</span>
              </div>
            </div>
          </div>

          {/* Comparison Output & Compressibility Factor Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ideal Gas Pressure */}
              <div className="p-4 rounded-xl bg-obsidian/70 border border-sky-500/30 space-y-1">
                <div className="text-xs font-mono text-sky-400 font-bold">ÁP SUẤT LÝ TƯỞNG (P_ideal):</div>
                <div className="text-2xl font-extrabold text-white font-mono">
                  {realComparison.idealPressureAtm} atm
                </div>
                <div className="text-[11px] text-ivory-muted">Tính theo PV = nRT (bỏ qua thể tích & lực hút)</div>
              </div>

              {/* Van der Waals Real Gas Pressure */}
              <div className="p-4 rounded-xl bg-obsidian/70 border border-amber-500/30 space-y-1">
                <div className="text-xs font-mono text-amber-400 font-bold">ÁP SUẤT THỰC (P_real):</div>
                <div className="text-2xl font-extrabold text-amber-200 font-mono">
                  {realComparison.vanDerWaalsPressureAtm} atm
                </div>
                <div className="text-[11px] text-ivory-muted">Đã hiệu chỉnh lực hút liên phân tử a & thể tích b</div>
              </div>
            </div>

            {/* Compressibility Factor Z Card */}
            <div className="p-4 rounded-xl bg-navy/80 border border-teal-500/40 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-teal-300">HỆ SỐ NÉN Z = (P·V) / (n·R·T):</span>
                <span className="text-xl text-white font-extrabold">{realComparison.compressibilityFactorZ}</span>
              </div>
              <div className="text-xs font-semibold text-cyan-200">
                {realComparison.dominantIntermolecularRegimeVI}
              </div>
              <div className="text-[11px] text-ivory-muted">
                Độ sai lệch áp suất so với khí lý tưởng: <strong>{realComparison.deviationPercent}%</strong>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PISTON CYLINDER KINETIC EXPERIMENT                                 */}
      {/* ========================================================================= */}
      {activeTab === 'piston' && (
        <div className="space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white">Thí Nghiệm Xi Lanh Piston Chuyển Động Nhiệt</h3>
              <p className="text-xs text-ivory-muted">
                Các phân tử khí va chạm đàn hồi hoàn toàn vào thành bình tạo ra áp suất.
                Nén piston làm giảm thể tích, tăng mật độ phân tử và tần số va chạm.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePistonChange(Math.max(1.0, volumeL - 1.0))}
                className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-obsidian font-bold text-xs"
              >
                ▼ Nén Piston (Giảm V)
              </button>
              <button
                onClick={() => handlePistonChange(Math.min(20.0, volumeL + 1.0))}
                className="px-3 py-1.5 rounded-lg bg-navy border border-navy-light text-white font-bold text-xs"
              >
                ▲ Nâng Piston (Tăng V)
              </button>
            </div>
          </div>

          {/* SVG Piston Visualization */}
          <div className="flex justify-center p-3">
            <svg viewBox="0 0 320 240" className="w-80 h-auto select-none rounded-xl bg-black/60 border border-white/10">
              {/* Cylinder Outer Wall */}
              <rect x="60" y="30" width="200" height="180" rx="4" fill="none" stroke="#64748b" strokeWidth="4" />

              {/* Movable Piston Head: Y depends on volumeL (from 1L to 20L -> Y from 180 to 40) */}
              {(() => {
                const pistonY = 200 - (volumeL / 20.0) * 150;
                return (
                  <g>
                    {/* Piston Rod */}
                    <rect x="154" y="0" width="12" height={pistonY} fill="#94a3b8" />
                    {/* Piston Head */}
                    <rect x="62" y={pistonY} width="196" height="16" rx="2" fill="#38bdf8" opacity="0.8" />
                    {/* Bouncing Molecules in gas chamber under piston */}
                    <g>
                      {[
                        { cx: 90, cy: pistonY + 30, r: 4 },
                        { cx: 140, cy: pistonY + 50, r: 4 },
                        { cx: 200, cy: pistonY + 25, r: 4 },
                        { cx: 110, cy: pistonY + 70, r: 4 },
                        { cx: 175, cy: pistonY + 65, r: 4 },
                        { cx: 230, cy: pistonY + 80, r: 4 },
                      ].map((mol, idx) => (
                        <circle
                          key={idx}
                          cx={mol.cx}
                          cy={Math.min(200, mol.cy)}
                          r={mol.r}
                          fill={gas.colorHex}
                          className="animate-pulse"
                        />
                      ))}
                    </g>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: GRAHAM'S LAW OF EFFUSION & DIFFUSION                               */}
      {/* ========================================================================= */}
      {activeTab === 'graham' && (
        <div className="space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
          <div>
            <h3 className="text-sm font-bold text-white">Định Luật Khuếch Tán & Thoát Khí Graham</h3>
            <p className="text-xs text-ivory-muted">
              r1 / r2 = √(M2 / M1). Ở cùng nhiệt độ và áp suất, tốc độ khuếch tán hoặc thoát khí qua lỗ xốp
              tỉ lệ nghịch với căn bậc hai của khối lượng mol phân tử chất khí.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40">
              <span className="text-xs text-ivory-muted block mb-1">Khí thứ nhất (Gas 1):</span>
              <div className="font-bold text-white text-sm" style={{ color: gas.colorHex }}>
                {gas.nameVI} ({gas.molarMassGPerMol} g/mol)
              </div>
            </div>

            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40">
              <span className="text-xs text-ivory-muted block mb-1">So sánh với khí thứ hai (Gas 2):</span>
              <select
                value={grahamGas2Id}
                onChange={(e) => setGrahamGas2Id(e.target.value)}
                className="w-full bg-obsidian border border-navy-light rounded px-2.5 py-1 text-xs text-white"
              >
                {Object.values(GAS_SPECIES).map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nameVI} ({g.molarMassGPerMol} g/mol)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Graham Result Box */}
          <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-teal-300">TỈ SỐ TỐC ĐỘ KHUẾCH TÁN (r1 / r2):</span>
              <span className="text-xl text-white font-extrabold">{graham.effusionRateRatio}</span>
            </div>
            <div className="text-xs font-semibold text-cyan-200">
              {graham.pedagogicalInsightVI}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
