// src/components/visualizations/PeriodicTrendChart.tsx
// Interactive SVG Chart Visualizing Periodic Trends (Electronegativity chi, Ionization Energy I1, Atomic Weight, Reducing Power)
// Strictly grounded in IUPAC Ground Truth & Vietnam GDPT 2018 Chemistry Standards

import React, { useState, useMemo } from 'react';
import { CORE_MVP_ELEMENTS, ALL_ELEMENTS } from '../../data/elementsData';
import { ElementData } from '../../domain/types';
import { Info, Sparkles, TrendingUp, Filter } from 'lucide-react';

export type TrendMetric = 'IE1' | 'CHI' | 'ATOMIC_WEIGHT' | 'ATK_RED';
export type TrendScope = 'PERIOD_2' | 'PERIOD_3' | 'CORE_MVP' | 'ALL_118';

export const PeriodicTrendChart: React.FC = () => {
  const [metric, setMetric] = useState<TrendMetric>('IE1');
  const [scope, setScope] = useState<TrendScope>('PERIOD_2');
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  // Filter elements based on selected scope
  const elements = useMemo(() => {
    switch (scope) {
      case 'PERIOD_2':
        return ALL_ELEMENTS.filter(e => e.period === 2).sort((a, b) => a.z - b.z);
      case 'PERIOD_3':
        return ALL_ELEMENTS.filter(e => e.period === 3).sort((a, b) => a.z - b.z);
      case 'CORE_MVP':
        return [...CORE_MVP_ELEMENTS].sort((a, b) => a.z - b.z);
      case 'ALL_118':
        return [...ALL_ELEMENTS].sort((a, b) => a.z - b.z);
    }
  }, [scope]);

  const width = 680;
  const height = 240;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 30;
  const paddingBottom = 45;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Metric metadata
  const metricConfig = useMemo(() => {
    switch (metric) {
      case 'IE1':
        return {
          label: 'Năng Lượng I₁ (kJ/mol)',
          unit: 'kJ/mol',
          color: '#DE996A',
          colorClass: 'text-copper',
          bgClass: 'bg-copper text-white',
          maxVal: 2500,
          minVal: 0,
          getValue: (e: ElementData) => e.first_ionization_energy
        };
      case 'CHI':
        return {
          label: 'Độ Âm Điện χ (Pauling)',
          unit: 'Pauling',
          color: '#57C8C8',
          colorClass: 'text-cyan-ion',
          bgClass: 'bg-cyan-ion text-obsidian',
          maxVal: 4.0,
          minVal: 0,
          getValue: (e: ElementData) => e.electronegativity ?? 0
        };
      case 'ATOMIC_WEIGHT':
        return {
          label: 'Nguyên Tử Khối (amu)',
          unit: 'amu',
          color: '#A78BFA',
          colorClass: 'text-purple-400',
          bgClass: 'bg-purple-600 text-white',
          maxVal: scope === 'ALL_118' ? 300 : scope === 'PERIOD_2' ? 25 : scope === 'PERIOD_3' ? 45 : 205,
          minVal: 0,
          getValue: (e: ElementData) => e.atomic_weight
        };
      case 'ATK_RED':
        return {
          label: 'Lực Khử Hóa Trị (ATK_red)',
          unit: 'pts',
          color: '#F87171',
          colorClass: 'text-red-400',
          bgClass: 'bg-red-500 text-white',
          maxVal: 100,
          minVal: 0,
          getValue: (e: ElementData) => e.stats?.atk_red ?? 5
        };
    }
  }, [metric, scope]);

  // Compute points
  const points = useMemo(() => {
    return elements.map((elem, idx) => {
      const val = metricConfig.getValue(elem);
      const x = paddingLeft + (elements.length > 1 ? (idx / (elements.length - 1)) * chartW : chartW / 2);
      const y = paddingTop + chartH - ((val - metricConfig.minVal) / (metricConfig.maxVal - metricConfig.minVal)) * chartH;
      return { elem, val, x, y };
    });
  }, [elements, chartW, chartH, metricConfig]);

  const polylineStr = points.map(p => `${p.x},${p.y}`).join(' ');

  // Pedagogical explanation
  const pedagogicalExplanation = useMemo(() => {
    if (metric === 'IE1') {
      if (scope === 'PERIOD_2') {
        return 'Quy luật Chu kỳ 2: I₁ có xu hướng tăng dần từ Li (520 kJ/mol) đến Ne (2080 kJ/mol). Bất thường cấu hình: I₁(Be) = 899.5 > I₁(B) = 800.6 (phân lớp 2s² bão hòa bền vững hơn 2p¹); I₁(N) = 1402.3 > I₁(O) = 1313.9 (phân lớp 2p³ bán bão hòa với 3e độc thân theo Hund bền vững hơn 2p⁴).';
      }
      if (scope === 'PERIOD_3') {
        return 'Quy luật Chu kỳ 3: I₁ tăng dần từ Na (495.8 kJ/mol) đến Ar (1520.6 kJ/mol). Bất thường: I₁(Mg) = 737.7 > I₁(Al) = 577.5 do 3s² bão hòa; I₁(P) = 1011.8 > I₁(S) = 999.6 do 3p³ bán bão hòa.';
      }
      return 'Năng lượng ion hóa thứ nhất (I₁) là năng lượng tối thiểu cần để tách 1 electron khỏi nguyên tử ở trạng thái khí cơ bản. Đỉnh cực đại tại Khí hiếm (He, Ne, Ar); đáy cực tiểu tại Kim loại kiềm (Li, Na, K).';
    }
    if (metric === 'CHI') {
      return 'Độ âm điện Pauling (χ) biểu thị khả năng hút electron của nguyên tử khi hình thành liên kết. Trong cùng chu kỳ, χ tăng từ trái sang phải khi Zeff tăng và bán kính giảm, đạt cực đại ở Halogen (F: 3.98, Cl: 3.16). Khí hiếm có vỏ bão hòa nên không xác định (N/A).';
    }
    if (metric === 'ATOMIC_WEIGHT') {
      return 'Nguyên tử khối tăng theo tổng proton và neutron trong hạt nhân (A = Z + N). Trong chu kỳ, nguyên tử khối tăng đều đặn, phản ánh số lượng hạt nucleon tăng dần.';
    }
    return 'Lực khử hóa trị (ATK_red) phản ánh độ dễ nhường electron. Cực đại tại Kim loại kiềm nhóm IA (Li, Na, K) có electron lớp ngoài cùng dễ bị bứt phá, phù hợp với tính khử mạnh nhất trong bảng tuần hoàn.';
  }, [metric, scope]);

  return (
    <div className="p-4 bg-navy/80 rounded-2xl border border-navy-light/60 space-y-3.5 select-none text-xs">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-navy-light/40 pb-3">
        <div>
          <h4 className="font-serif font-bold text-sm text-ivory flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-ion" />
            <span>Đồ Thị Xu Hướng Biến Đổi Tuần Hoàn (IUPAC Ground Truth)</span>
          </h4>
          <p className="text-[11px] text-ivory-muted mt-0.5">
            Dữ liệu thực nghiệm nguyên tử chuẩn hóa theo IUPAC và chuẩn GDPT 2018
          </p>
        </div>

        {/* Filters and Metric Switches */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Scope Selector */}
          <div className="flex items-center rounded-lg bg-obsidian/70 p-0.5 border border-navy-light/50 font-mono text-[11px]">
            <span className="px-2 text-ivory-muted flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-ion" />
              <span>Phạm vi:</span>
            </span>
            <button
              onClick={() => setScope('PERIOD_2')}
              className={`px-2 py-0.5 rounded transition-all ${
                scope === 'PERIOD_2' ? 'bg-navy text-cyan-ion font-bold shadow-sm' : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Chu kỳ 2
            </button>
            <button
              onClick={() => setScope('PERIOD_3')}
              className={`px-2 py-0.5 rounded transition-all ${
                scope === 'PERIOD_3' ? 'bg-navy text-cyan-ion font-bold shadow-sm' : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              Chu kỳ 3
            </button>
            <button
              onClick={() => setScope('CORE_MVP')}
              className={`px-2 py-0.5 rounded transition-all ${
                scope === 'CORE_MVP' ? 'bg-navy text-cyan-ion font-bold shadow-sm' : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              28 TCG
            </button>
            <button
              onClick={() => setScope('ALL_118')}
              className={`px-2 py-0.5 rounded transition-all ${
                scope === 'ALL_118' ? 'bg-navy text-cyan-ion font-bold shadow-sm' : 'text-ivory-muted hover:text-ivory'
              }`}
            >
              118 Toàn Phần
            </button>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <button
              onClick={() => setMetric('IE1')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                metric === 'IE1' ? 'bg-copper text-white shadow' : 'bg-navy-light/50 text-ivory-muted hover:text-ivory'
              }`}
            >
              Năng Lượng I₁
            </button>
            <button
              onClick={() => setMetric('CHI')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                metric === 'CHI' ? 'bg-cyan-ion text-obsidian shadow' : 'bg-navy-light/50 text-ivory-muted hover:text-ivory'
              }`}
            >
              Độ Âm Điện χ
            </button>
            <button
              onClick={() => setMetric('ATOMIC_WEIGHT')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                metric === 'ATOMIC_WEIGHT' ? 'bg-purple-600 text-white shadow' : 'bg-navy-light/50 text-ivory-muted hover:text-ivory'
              }`}
            >
              Khối Lượng M
            </button>
            <button
              onClick={() => setMetric('ATK_RED')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                metric === 'ATK_RED' ? 'bg-red-500 text-white shadow' : 'bg-navy-light/50 text-ivory-muted hover:text-ivory'
              }`}
            >
              Lực Khử (ATK)
            </button>
          </div>
        </div>
      </div>

      {/* SVG Chart Rendering */}
      <div className="relative overflow-x-auto bg-obsidian/50 p-2 rounded-xl border border-navy-light/40">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible min-w-[560px]">
          {/* Y Axis Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
            const y = paddingTop + chartH - frac * chartH;
            const labelVal =
              metric === 'CHI'
                ? (frac * metricConfig.maxVal).toFixed(1)
                : Math.round(frac * metricConfig.maxVal);
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#233348"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#8E887E"
                  fontSize="8.5"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {labelVal}
                </text>
              </g>
            );
          })}

          {/* Area fill under curve */}
          <polygon
            points={`${points[0]?.x || paddingLeft},${paddingTop + chartH} ${polylineStr} ${points[points.length - 1]?.x || width - paddingRight},${paddingTop + chartH}`}
            fill={metricConfig.color}
            opacity="0.12"
          />

          {/* Connected Data Line */}
          <polyline
            fill="none"
            stroke={metricConfig.color}
            strokeWidth="2.5"
            points={polylineStr}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p) => {
            const isHovered = hoveredElement?.z === p.elem.z;
            const isAnomaly =
              (scope === 'PERIOD_2' && ['Be', 'B', 'N', 'O'].includes(p.elem.symbol) && metric === 'IE1') ||
              (scope === 'PERIOD_3' && ['Mg', 'Al', 'P', 'S'].includes(p.elem.symbol) && metric === 'IE1');

            return (
              <g
                key={p.elem.z}
                transform={`translate(${p.x}, ${p.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredElement(p.elem)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {/* Anomaly Highlight Ring */}
                {isAnomaly && (
                  <circle
                    cx="0"
                    cy="0"
                    r="8.5"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    opacity="0.8"
                  />
                )}

                <circle
                  cx="0"
                  cy="0"
                  r={isHovered ? 6 : scope === 'ALL_118' ? 2.5 : 4}
                  fill={isHovered ? '#FDFBF7' : metricConfig.color}
                  stroke="#10131B"
                  strokeWidth={scope === 'ALL_118' ? 0.8 : 1.5}
                  className="transition-all"
                />

                {/* X Axis Symbol Labels (only when element count is reasonable or hovered) */}
                {(scope !== 'ALL_118' || isHovered || p.elem.z % 10 === 0) && (
                  <text
                    x="0"
                    y={paddingTop + chartH - p.y + 16}
                    textAnchor="middle"
                    fill={isHovered ? '#57C8C8' : isAnomaly ? '#FBBF24' : '#B0A898'}
                    fontSize={scope === 'ALL_118' ? '7' : '8.5'}
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight={isHovered || isAnomaly ? 'bold' : 'normal'}
                  >
                    {p.elem.symbol}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Inspector Tooltip */}
        {hoveredElement && (
          <div className="mt-2 p-2.5 rounded-xl bg-obsidian border border-navy-light text-xs font-mono flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
            <div>
              <span className="font-serif font-bold text-copper text-sm mr-2">
                {hoveredElement.symbol} ({hoveredElement.name_iupac})
              </span>
              <span className="text-ivory-muted text-[10px]">
                Z={hoveredElement.z} • Nhóm {hoveredElement.group} • Chu kỳ {hoveredElement.period} • {hoveredElement.category}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span>
                χ = <strong className="text-cyan-ion">{hoveredElement.electronegativity ?? 'N/A (Trơ)'}</strong>
              </span>
              <span>
                I₁ = <strong className="text-copper">{hoveredElement.first_ionization_energy} kJ/mol</strong>
              </span>
              <span>
                M = <strong className="text-purple-400">{hoveredElement.atomic_weight} amu</strong>
              </span>
              <span>
                Lực khử = <strong className="text-red-400">{hoveredElement.stats?.atk_red ?? 5} pts</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Pedagogical Explanation Card */}
      <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 flex items-start gap-2.5 text-ivory-muted leading-relaxed">
        <Sparkles className="w-4 h-4 text-cyan-ion flex-shrink-0 mt-0.5" />
        <div className="text-[11px] space-y-1">
          <div className="font-bold text-ivory flex items-center gap-1.5">
            <span>Phân Tích Sư Phạm (GDPT 2018):</span>
            <span className="text-cyan-ion font-mono">[{metricConfig.label}]</span>
          </div>
          <div>{pedagogicalExplanation}</div>
        </div>
      </div>
    </div>
  );
};
