// src/components/visualizations/ChemicalEnergeticsVisualizer.tsx
/**
 * ELEMENTA — Chemical Energetics, Enthalpy of Formation & Hess's Law Visualizer
 * Conforms strictly to GDPT 2018 Chemistry Grade 10 (Chủ đề 5: Năng lượng hóa học) & IUPAC standards.
 * 
 * Modes:
 * 1. FORMATION_CALORIMETRY_LAB: Reaction enthalpy from standard formation enthalpies (Δf H°298), energy profile diagram, and coffee-cup calorimeter simulation.
 * 2. BOND_ENERGY_ESTIMATOR: Gaseous reaction enthalpy estimation from average bond dissociation energies (Eb).
 * 3. HESS_LAW_CYCLE_BUILDER: Multi-step thermochemical cycles verifying path independence of state functions.
 */

import React, { useState, useMemo } from 'react';
import {
  SUBSTANCE_ENTHALPY_CATALOG,
  BOND_ENERGY_CATALOG,
  calculateEnthalpyFromFormation,
  calculateEnthalpyFromBondEnergies,
  simulateCalorimeterTemperature,
  simulateHessLawCycle,
  ReactionEnthalpyResult
} from '../../domain/chemicalEnergeticsEngine';
import { sound } from '../../audio/soundEngine';

export type EnergeticsVisualizerMode =
  | 'FORMATION_CALORIMETRY_LAB'
  | 'BOND_ENERGY_ESTIMATOR'
  | 'HESS_LAW_CYCLE_BUILDER';

export const ChemicalEnergeticsVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<EnergeticsVisualizerMode>('FORMATION_CALORIMETRY_LAB');

  // Mode 1: Formation Enthalpy & Calorimetry
  const [selectedFormationRxn, setSelectedFormationRxn] = useState<string>('CH4_COMBUSTION');
  const [rxnMoles, setRxnMoles] = useState<number>(0.02);
  const [calorimeterWaterG, setCalorimeterWaterG] = useState<number>(100);

  // Mode 2: Bond Energy
  const [selectedBondRxn, setSelectedBondRxn] = useState<string>('H2_CL2');

  // Mode 3: Hess's Law
  const [selectedHessCycle, setSelectedHessCycle] = useState<'CO_SYNTHESIS' | 'NO2_SYNTHESIS' | 'C2H2_HYDROGENATION'>('CO_SYNTHESIS');

  // Computed Mode 1 Reaction Result
  const formationRxnResult: ReactionEnthalpyResult = useMemo(() => {
    switch (selectedFormationRxn) {
      case 'CH4_COMBUSTION':
        return calculateEnthalpyFromFormation(
          [{ key: 'CH4(g)', coeff: 1 }, { key: 'O2(g)', coeff: 2 }],
          [{ key: 'CO2(g)', coeff: 1 }, { key: 'H2O(l)', coeff: 2 }],
          'Đốt cháy hoàn toàn khí metan (CH4)',
          'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)',
          65.0,
          'Phản ứng cháy của khí thiên nhiên, dùng làm nhiên liệu đun nấu và phát điện sạch.'
        );
      case 'CACO3_DECOMP':
        return calculateEnthalpyFromFormation(
          [{ key: 'CaCO3(s)', coeff: 1 }],
          [{ key: 'CaO(s)', coeff: 1 }, { key: 'CO2(g)', coeff: 1 }],
          'Nhiệt phân đá vôi (CaCO3) sản xuất vôi sống',
          'CaCO3(s) --(t°=900°C)--> CaO(s) + CO2(g)',
          120.0,
          'Phản ứng thu nhiệt mạnh trong lò nung vôi công nghiệp, cần cung cấp nhiệt liên tục bằng cách đốt than đá.'
        );
      case 'THERMITE_REACTION':
        return calculateEnthalpyFromFormation(
          [{ key: 'Al(s)', coeff: 2 }, { key: 'Fe2O3(s)', coeff: 1 }],
          [{ key: 'Al2O3(s)', coeff: 1 }, { key: 'Fe(s)', coeff: 2 }],
          'Phản ứng nhiệt nhôm hàn đường ray xe lửa',
          '2Al(s) + Fe2O3(s) --(t°)--> Al2O3(s) + 2Fe(l)',
          95.0,
          'Phản ứng tỏa nhiệt dữ dội (>2500°C), sinh ra sắt nóng chảy tự lấp đầy khe hở mối nối đường ray.'
        );
      default:
        return calculateEnthalpyFromFormation(
          [{ key: 'C(graphite)', coeff: 1 }, { key: 'O2(g)', coeff: 1 }],
          [{ key: 'CO2(g)', coeff: 1 }],
          'Đốt cháy than chì (C)',
          'C(graphite) + O2(g) -> CO2(g)',
          70.0,
          'Nhiệt lượng tỏa ra là chuẩn mực cho nhiệt tạo thành của khí cacbonic.'
        );
    }
  }, [selectedFormationRxn]);

  // Calorimetry simulation
  const calorimeterResult = useMemo(() => {
    return simulateCalorimeterTemperature(
      formationRxnResult.deltaRH298Kj,
      rxnMoles,
      calorimeterWaterG,
      25.0
    );
  }, [formationRxnResult.deltaRH298Kj, rxnMoles, calorimeterWaterG]);

  // Computed Mode 2 Bond Energy Result
  const bondEnergyResult: ReactionEnthalpyResult = useMemo(() => {
    switch (selectedBondRxn) {
      case 'HABER_BOSCH':
        return calculateEnthalpyFromBondEnergies(
          [{ bondKey: 'N≡N', count: 1 }, { bondKey: 'H-H', count: 3 }],
          [{ bondKey: 'N-H', count: 6 }],
          'Tổng hợp amoniac (Haber-Bosch)',
          'N2(g) + 3H2(g) -> 2NH3(g)',
          160.0
        );
      case 'CH4_COMBUSTION_GAS':
        return calculateEnthalpyFromBondEnergies(
          [{ bondKey: 'C-H', count: 4 }, { bondKey: 'O=O', count: 2 }],
          [{ bondKey: 'C=O_in_CO2', count: 2 }, { bondKey: 'O-H', count: 4 }],
          'Đốt cháy metan thể khí',
          'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)',
          75.0
        );
      default: // H2_CL2
        return calculateEnthalpyFromBondEnergies(
          [{ bondKey: 'H-H', count: 1 }, { bondKey: 'Cl-Cl', count: 1 }],
          [{ bondKey: 'H-Cl', count: 2 }],
          'Tổng hợp khí hiđro clorua',
          'H2(g) + Cl2(g) -> 2HCl(g)',
          50.0
        );
    }
  }, [selectedBondRxn]);

  // Mode 3 Hess Cycle Result
  const hessResult = useMemo(() => {
    return simulateHessLawCycle(selectedHessCycle);
  }, [selectedHessCycle]);

  const handleModeChange = (mode: EnergeticsVisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="bg-slate-900 border border-orange-500/30 rounded-xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-orange-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30">
              GDPT 2018 Hóa Học 10 — Chủ Đề 5
            </span>
            <span className="text-xs text-slate-400">Chemical Energetics & Thermochemical Laws</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-orange-400 tracking-wide mt-1">
            Phòng Thí Nghiệm Năng Lượng Hóa Học & Định Luật Hess
          </h2>
          <p className="text-sm text-slate-300">
            Mô phỏng giản đồ năng lượng phản ứng (Δr H°298), nhiệt kế nhiệt lượng kế, tính enthalpy từ năng lượng liên kết Eb và chu trình Hess
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeChange('FORMATION_CALORIMETRY_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'FORMATION_CALORIMETRY_LAB'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Nhiệt Tạo Thành & Nhiệt Lượng Kế
          </button>
          <button
            onClick={() => handleModeChange('BOND_ENERGY_ESTIMATOR')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'BOND_ENERGY_ESTIMATOR'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Năng Lượng Liên Kết (Eb)
          </button>
          <button
            onClick={() => handleModeChange('HESS_LAW_CYCLE_BUILDER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'HESS_LAW_CYCLE_BUILDER'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Chu Trình Định Luật Hess
          </button>
        </div>
      </div>

      {/* MODE 1: FORMATION ENTHALPY & CALORIMETRY LAB */}
      {activeMode === 'FORMATION_CALORIMETRY_LAB' && (
        <div className="space-y-6">
          {/* Reaction Selectors & Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Reaction Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chọn Phản Ứng Hóa Học
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'CH4_COMBUSTION', label: '🔥 Đốt cháy metan (Tỏa nhiệt)' },
                  { id: 'THERMITE_REACTION', label: '⚡ Nhiệt nhôm Fe2O3 (Tỏa nhiệt dữ dội)' },
                  { id: 'CACO3_DECOMP', label: '❄️ Nhiệt phân đá vôi (Thu nhiệt)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedFormationRxn(item.id);
                    }}
                    className={`px-3 py-2 rounded text-xs text-left font-medium border transition-all ${
                      selectedFormationRxn === item.id
                        ? 'bg-orange-500/20 border-orange-400 text-orange-300 font-bold'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Moles Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Số Mol Phản Ứng (n):
                </label>
                <span className="text-xs font-bold text-orange-400 font-mono">{rxnMoles} mol</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.05"
                step="0.005"
                value={rxnMoles}
                onChange={e => setRxnMoles(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Điều chỉnh lượng chất đưa vào nhiệt lượng kế</span>
            </div>

            {/* Water Mass Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Khối Lượng Nước (m_nước):
                </label>
                <span className="text-xs font-bold text-cyan-400 font-mono">{calorimeterWaterG} g</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={calorimeterWaterG}
                onChange={e => setCalorimeterWaterG(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Nhiệt dung riêng c = 4.184 J/(g·°C)</span>
            </div>
          </div>

          {/* Visual Display Grid: Energy Profile Diagram & Calorimeter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: SVG Potential Energy Curve */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-300">
                  Giản Đồ Năng Lượng Phản Ứng (Potential Energy Diagram)
                </h3>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-bold border ${
                    formationRxnResult.isExothermic
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  }`}
                >
                  {formationRxnResult.isExothermic ? 'TỎA NHIỆT (Δr H° < 0)' : 'THU NHIỆT (Δr H° > 0)'}
                </span>
              </div>

              {/* SVG Potential Energy Profile */}
              <div className="flex justify-center items-center py-2 bg-slate-950 rounded-lg p-3 border border-slate-800">
                <svg width="340" height="210" viewBox="0 0 340 210" className="overflow-visible">
                  {/* Axes */}
                  <line x1="40" y1="180" x2="310" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="40" y1="180" x2="40" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="315" y="184" fill="#94a3b8" fontSize="10">Tiến trình</text>
                  <text x="35" y="15" fill="#94a3b8" fontSize="10" textAnchor="end">H (kJ)</text>

                  {/* Reactant plateau (x: 40 to 90) */}
                  <line x1="40" y1="110" x2="100" y2="110" stroke="#f97316" strokeWidth="3" />
                  <text x="70" y="103" fill="#fdba74" fontSize="10" fontWeight="bold" textAnchor="middle">Chất đầu</text>

                  {/* Curve through activation energy peak */}
                  {formationRxnResult.isExothermic ? (
                    // Exothermic: products plateau lower (y: 155)
                    <g>
                      <path
                        d="M 100 110 Q 155 35 180 35 T 230 155 L 290 155"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <text x="260" y="148" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Sản phẩm</text>

                      {/* Transition state indicator */}
                      <circle cx="170" cy="40" r="4" fill="#facc15" />
                      <text x="170" y="30" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">Trạng thái chuyển tiếp (‡)</text>

                      {/* Delta H arrow */}
                      <line x1="210" y1="110" x2="210" y2="155" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="215" y="136" fill="#f87171" fontSize="11" fontWeight="bold">
                        Δr H° = {formationRxnResult.deltaRH298Kj} kJ
                      </text>
                    </g>
                  ) : (
                    // Endothermic: products plateau higher (y: 65)
                    <g>
                      <path
                        d="M 100 140 Q 155 40 180 40 T 230 75 L 290 75"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <text x="260" y="68" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">Sản phẩm</text>

                      <circle cx="170" cy="45" r="4" fill="#facc15" />
                      <text x="170" y="32" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">Trạng thái chuyển tiếp (‡)</text>

                      {/* Delta H arrow */}
                      <line x1="210" y1="140" x2="210" y2="75" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="215" y="112" fill="#22d3ee" fontSize="11" fontWeight="bold">
                        Δr H° = +{formationRxnResult.deltaRH298Kj} kJ
                      </text>
                    </g>
                  )}

                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>

              {/* Chemical Equation & Breakdown */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700/70 font-mono text-xs text-orange-200 overflow-x-auto">
                {formationRxnResult.equation}
              </div>
              <div className="text-xs font-mono text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                {formationRxnResult.stepByStepBreakdownVi}
              </div>
            </div>

            {/* Right: Coffee-cup Calorimeter Simulator */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  Nhiệt Lượng Kế Đẳng Áp (Coffee-Cup Calorimeter)
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Đo trực tiếp hiệu ứng nhiệt qua sự biến thiên nhiệt độ của môi trường nước (q = mcΔT)
                </p>
              </div>

              {/* SVG Calorimeter Diagram */}
              <div className="flex justify-center items-center py-2">
                <svg width="220" height="190" viewBox="0 0 220 190" className="overflow-visible">
                  {/* Double styrofoam cup outline */}
                  <path
                    d="M 50 40 L 65 160 A 15 15 0 0 0 80 170 L 140 170 A 15 15 0 0 0 155 160 L 170 40 Z"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="3"
                  />
                  <ellipse cx="110" cy="40" rx="60" ry="10" fill="#334155" stroke="#94a3b8" strokeWidth="2" />

                  {/* Water liquid inside cup */}
                  <path
                    d="M 56 80 L 67 158 A 12 12 0 0 0 79 166 L 141 166 A 12 12 0 0 0 153 158 L 164 80 Z"
                    fill={calorimeterResult.isHeating ? '#f97316' : '#06b6d4'}
                    opacity="0.6"
                  />

                  {/* Thermometer glass & mercury */}
                  <rect x="135" y="10" width="10" height="130" rx="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
                  {/* Mercury bulb */}
                  <circle cx="140" cy="140" r="9" fill={calorimeterResult.isHeating ? '#ef4444' : '#38bdf8'} />
                  {/* Mercury liquid column height depending on temperature */}
                  <rect
                    x="137"
                    y={Math.max(20, 140 - Math.min(110, calorimeterResult.finalTempC * 1.8))}
                    width="6"
                    height={Math.min(120, calorimeterResult.finalTempC * 1.8)}
                    fill={calorimeterResult.isHeating ? '#ef4444' : '#38bdf8'}
                  />

                  {/* Temperature readout badge */}
                  <g transform="translate(155, 30)">
                    <rect x="0" y="0" width="60" height="24" rx="4" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
                    <text x="30" y="16" fill="#f97316" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {calorimeterResult.finalTempC}°C
                    </text>
                  </g>
                </svg>
              </div>

              {/* Calorimeter Data Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-semibold">Độ Biến Thiên Nhiệt Độ (ΔT):</span>
                  <div className={`text-base font-bold font-mono ${calorimeterResult.isHeating ? 'text-rose-400' : 'text-cyan-400'}`}>
                    {calorimeterResult.deltaTempC > 0 ? `+${calorimeterResult.deltaTempC}` : calorimeterResult.deltaTempC}°C
                  </div>
                  <span className="text-[10px] text-slate-400">từ {calorimeterResult.initialTempC}°C ban đầu</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-semibold">Nhiệt Lượng Trao Đổi (|q|):</span>
                  <div className="text-base font-bold font-mono text-amber-300">
                    {calorimeterResult.heatJoules} J
                  </div>
                  <span className="text-[10px] text-slate-400">ứng với {rxnMoles} mol chất phản ứng</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700 text-xs text-slate-300">
                {calorimeterResult.explanationVi}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: BOND ENERGY ESTIMATOR */}
      {activeMode === 'BOND_ENERGY_ESTIMATOR' && (
        <div className="space-y-6">
          {/* Reaction Selectors */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Chọn Phản Ứng Khí Để Ước Tính Enthalpy Bằng Năng Lượng Liên Kết (Eb)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'H2_CL2', label: 'H2(g) + Cl2(g) -> 2HCl(g)' },
                { id: 'HABER_BOSCH', label: 'N2(g) + 3H2(g) -> 2NH3(g) (Haber-Bosch)' },
                { id: 'CH4_COMBUSTION_GAS', label: 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedBondRxn(item.id);
                  }}
                  className={`px-3 py-2 rounded text-xs font-bold border transition-all ${
                    selectedBondRxn === item.id
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Outcome Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-200">
                {bondEnergyResult.nameVi}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold border ${
                  bondEnergyResult.isExothermic
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                }`}
              >
                Δr H°298 = {bondEnergyResult.deltaRH298Kj} kJ
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-700 font-mono text-xs text-orange-200 overflow-x-auto">
              {bondEnergyResult.equation}
            </div>

            {/* Step by step math */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-amber-200">
              {bondEnergyResult.stepByStepBreakdownVi}
            </div>

            {/* Crucial Concept Box */}
            <div className="p-3 bg-blue-950/30 border border-blue-500/40 rounded-lg text-xs space-y-1.5 text-blue-200">
              <span className="font-bold block">💡 Quy Tắc Vàng IUPAC & GDPT 2018:</span>
              <p>
                - Bẻ gãy liên kết (Chất đầu): Luôn là quá trình <strong>THU NĂNG LƯỢNG</strong> (+Eb).
              </p>
              <p>
                - Hình thành liên kết mới (Sản phẩm): Luôn là quá trình <strong>TỎA NĂNG LƯỢNG</strong> (-Eb).
              </p>
              <p className="font-mono text-amber-300">
                ⇒ Δr H°298 = Σ Eb(chất đầu) - Σ Eb(sản phẩm) (Ngược chiều so với nhiệt tạo thành chuẩn!)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: HESS'S LAW CYCLE BUILDER */}
      {activeMode === 'HESS_LAW_CYCLE_BUILDER' && (
        <div className="space-y-6">
          {/* Cycle Selector */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Chọn Chu Trình Nhiệt Động Học Định Luật Hess
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'CO_SYNTHESIS', label: '1. Khí CO gián tiếp từ than chì & oxi (Bài toán kinh điển)' },
                { id: 'NO2_SYNTHESIS', label: '2. Khí NO2 qua 2 nấc oxy hóa liên tiếp' },
                { id: 'C2H2_HYDROGENATION', label: '3. Hidro hóa axetilen (C2H2 -> C2H4 -> C2H6)' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedHessCycle(item.id as any);
                  }}
                  className={`px-3 py-2 rounded text-xs font-bold border transition-all ${
                    selectedHessCycle === item.id
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hess Steps Breakdown */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-slate-200 block">{hessResult.targetReactionNameVi}</span>
                <span className="font-mono text-xs text-orange-400">{hessResult.targetEquation}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 border border-orange-400 text-orange-300 font-mono">
                Δr H° = {hessResult.calculatedDeltaRH298Kj} kJ/mol
              </span>
            </div>

            {/* Individual Steps */}
            <div className="space-y-2">
              {hessResult.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{step.stepNameVi}</span>
                    <span className={`font-mono font-bold ${step.deltaHKj < 0 ? 'text-rose-400' : 'text-cyan-400'}`}>
                      ΔH = {step.deltaHKj > 0 ? `+${step.deltaHKj}` : step.deltaHKj} kJ
                    </span>
                  </div>
                  <div className="font-mono text-slate-400">{step.equation}</div>
                </div>
              ))}
            </div>

            {/* Verification */}
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-xs space-y-1 text-emerald-200">
              <span className="font-bold block">✓ Chứng Minh Định Luật Hess:</span>
              <p>{hessResult.verificationVi}</p>
            </div>

            {/* Path Independence Note */}
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
              {hessResult.pathIndependenceNoteVi}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
