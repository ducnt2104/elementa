// src/domain/thermalAnalysisEngine.ts
// Milestone 51: Thermogravimetric Analysis (TGA), Differential Scanning Calorimetry (DSC) & Thermal Decomposition Engine
// Standards: ICTAC (International Confederation for Thermal Analysis and Calorimetry)
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Năng lượng hóa học & Enthalpy; Hóa học 11: Nhiệt phân muối; Hóa học 12: Nhiệt chuyển pha Polymer)

export type ThermalAtmosphere = 'INERT_NITROGEN' | 'OXIDIZING_AIR';
export type ThermalEventType = 'DEHYDRATION' | 'DECOMPOSITION' | 'CALCINATION' | 'MELTING' | 'CRYSTALLIZATION' | 'GLASS_TRANSITION';

export interface ThermalStageDef {
  stageIndex: number;
  eventType: ThermalEventType;
  startTempCelsius: number;
  endTempCelsius: number;
  peakTempCelsius: number;
  massLossPercentExpected: number;
  releasedEvolvedGasVI: string;
  solidResidueFormula: string;
  isEndothermic: boolean;
  enthalpyDeltaHkJPerMol: number;
  reactionEquationVI: string;
  descriptionVI: string;
}

export interface ThermalSampleSpec {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  sampleType: 'INORGANIC_HYDRATE' | 'MINERAL_CARBONATE' | 'THERMOPLASTIC_POLYMER' | 'METAL_OXIDE';
  initialMassMg: number;
  stages: ThermalStageDef[];
  finalResiduePercentExpected: number;
  glassTransitionTempCelsius?: number; // Tg
  meltingTempCelsius?: number; // Tm
  crystallizationTempCelsius?: number; // Tc
  descriptionVI: string;
  colorHex: string;
}

export interface TgaDataPoint {
  temperatureCelsius: number;
  massPercent: number; // TGA curve (% remaining)
  dtgRatePercentPerCelsius: number; // DTG curve (-dm/dT)
  dscHeatFlowMwPerMg: number; // DSC curve (mW/mg, endo down / exo up)
  currentResidueFormula: string;
}

export interface ThermalAnalysisResult {
  sample: ThermalSampleSpec;
  atmosphere: ThermalAtmosphere;
  heatingRateCelsiusPerMin: number; // e.g. 10 °C/min
  currentTempCelsius: number;

  // Real-time metrics at current temperature
  currentMassPercent: number;
  currentMassMg: number;
  currentDtgRate: number;
  currentHeatFlow: number;
  totalMassLossPercent: number;
  activeStage: ThermalStageDef | null;

  // Curves for SVG Plotting
  curveData: TgaDataPoint[];

  pedagogicalAnalysisVI: string;
}

// ----------------------------------------------------------------------------
// THERMAL ANALYSIS BENCHMARK CATALOG
// ----------------------------------------------------------------------------
export const THERMAL_SAMPLES_CATALOG: Record<string, ThermalSampleSpec> = {
  calcium_oxalate_monohydrate: {
    id: 'calcium_oxalate_monohydrate',
    name: 'Calcium Oxalate Monohydrate (CaC2O4·H2O)',
    nameVI: 'Canxi Oxalat Ngậm Nước (CaC₂O₄·H₂O - Chuẩn Đo TGA 3 Bước Kinh Điển)',
    formula: 'CaC₂O₄·H₂O',
    sampleType: 'INORGANIC_HYDRATE',
    initialMassMg: 10.0,
    finalResiduePercentExpected: 38.38, // Pure CaO
    stages: [
      {
        stageIndex: 1,
        eventType: 'DEHYDRATION',
        startTempCelsius: 110,
        endTempCelsius: 210,
        peakTempCelsius: 165,
        massLossPercentExpected: 12.33,
        releasedEvolvedGasVI: 'H₂O(g) (Hơi nước)',
        solidResidueFormula: 'CaC₂O₄ (khan)',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +57.2,
        reactionEquationVI: 'CaC₂O₄·H₂O(s) → CaC₂O₄(s) + H₂O(g)↑',
        descriptionVI: 'Mất hoàn toàn 1 phân tử nước kết tinh trong mạng tinh thể đơn tà.',
      },
      {
        stageIndex: 2,
        eventType: 'DECOMPOSITION',
        startTempCelsius: 410,
        endTempCelsius: 530,
        peakTempCelsius: 485,
        massLossPercentExpected: 19.17,
        releasedEvolvedGasVI: 'CO(g) (Khí cacbon monoxit)',
        solidResidueFormula: 'CaCO₃ (Canxi cacbonat)',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +48.5, // Endothermic in N2 (becomes exothermic in air due to CO + 1/2 O2 -> CO2)
        reactionEquationVI: 'CaC₂O₄(s) → CaCO₃(s) + CO(g)↑',
        descriptionVI: 'Phân hủy gốc oxalat (-OOC-COO-) giải phóng khí CO độc hại tạo thành canxi cacbonat.',
      },
      {
        stageIndex: 3,
        eventType: 'CALCINATION',
        startTempCelsius: 670,
        endTempCelsius: 850,
        peakTempCelsius: 760,
        massLossPercentExpected: 30.12,
        releasedEvolvedGasVI: 'CO₂(g) (Khí cacbon dioxit)',
        solidResidueFormula: 'CaO(s) (Vôi sống)',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +178.2,
        reactionEquationVI: 'CaCO₃(s) → CaO(s) + CO₂(g)↑',
        descriptionVI: 'Canxi hóa canxi cacbonat tạo vôi sống CaO tinh khiết, phản ứng thu nhiệt cực mạnh.',
      },
    ],
    descriptionVI: 'Chất chuẩn quốc tế ICTAC để hiệu chuẩn cân nhiệt phân TGA. Ba bước mất khối lượng rành mạch tách biệt theo đúng tỷ lệ hợp thức khối lượng mol (146.11 → 128.10 → 100.09 → 56.08 g/mol).',
    colorHex: '#38bdf8', // Sky
  },

  copper_sulfate_pentahydrate: {
    id: 'copper_sulfate_pentahydrate',
    name: 'Copper(II) Sulfate Pentahydrate (CuSO4·5H2O)',
    nameVI: 'Đồng(II) Sunfat Ngậm 5 Nước (Phèn Xanh CuSO₄·5H₂O)',
    formula: 'CuSO₄·5H₂O',
    sampleType: 'INORGANIC_HYDRATE',
    initialMassMg: 10.0,
    finalResiduePercentExpected: 31.86, // CuO
    stages: [
      {
        stageIndex: 1,
        eventType: 'DEHYDRATION',
        startTempCelsius: 70,
        endTempCelsius: 125,
        peakTempCelsius: 105,
        massLossPercentExpected: 14.43,
        releasedEvolvedGasVI: '2 H₂O(g)',
        solidResidueFormula: 'CuSO₄·3H₂O',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +108.0,
        reactionEquationVI: 'CuSO₄·5H₂O(s) → CuSO₄·3H₂O(s) + 2 H₂O(g)↑',
        descriptionVI: 'Mất 2 phân tử nước liên kết yếu ngoài khối bát diện đồng.',
      },
      {
        stageIndex: 2,
        eventType: 'DEHYDRATION',
        startTempCelsius: 125,
        endTempCelsius: 165,
        peakTempCelsius: 145,
        massLossPercentExpected: 14.43,
        releasedEvolvedGasVI: '2 H₂O(g)',
        solidResidueFormula: 'CuSO₄·H₂O',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +112.0,
        reactionEquationVI: 'CuSO₄·3H₂O(s) → CuSO₄·H₂O(s) + 2 H₂O(g)↑',
        descriptionVI: 'Mất tiếp 2 phân tử nước phối trí chuyển từ màu lam sang lam nhạt.',
      },
      {
        stageIndex: 3,
        eventType: 'DEHYDRATION',
        startTempCelsius: 210,
        endTempCelsius: 280,
        peakTempCelsius: 245,
        massLossPercentExpected: 7.21,
        releasedEvolvedGasVI: 'H₂O(g)',
        solidResidueFormula: 'CuSO₄ (khan trắng)',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +72.0,
        reactionEquationVI: 'CuSO₄·H₂O(s) → CuSO₄(s) + H₂O(g)↑',
        descriptionVI: 'Mất phân tử nước liên kết hydro cuối cùng tạo muối đồng sunfat khan màu trắng.',
      },
      {
        stageIndex: 4,
        eventType: 'DECOMPOSITION',
        startTempCelsius: 650,
        endTempCelsius: 820,
        peakTempCelsius: 740,
        massLossPercentExpected: 32.07,
        releasedEvolvedGasVI: 'SO₃(g) / SO₂ + ½ O₂',
        solidResidueFormula: 'CuO(s) (Đồng oxit đen)',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +265.0,
        reactionEquationVI: 'CuSO₄(s) → CuO(s) + SO₃(g)↑',
        descriptionVI: 'Phân hủy muối sunfat thành đồng(II) oxit màu đen ở nhiệt độ cao.',
      },
    ],
    descriptionVI: 'Ví dụ điển hình trong SGK Hóa học 10 và 12 về liên kết phối trí của phân tử nước với ion kim loại chuyển tiếp Cu²⁺ và sự biến đổi màu sắc từ lam đậm sang trắng khan và đen oxit.',
    colorHex: '#3b82f6', // Blue
  },

  calcium_carbonate_limestone: {
    id: 'calcium_carbonate_limestone',
    name: 'Calcium Carbonate / Limestone (CaCO3)',
    nameVI: 'Đá Vôi Canxi Cacbonat (CaCO₃ - Nung Vôi Công Nghiệp)',
    formula: 'CaCO₃',
    sampleType: 'MINERAL_CARBONATE',
    initialMassMg: 10.0,
    finalResiduePercentExpected: 56.03, // Pure CaO
    stages: [
      {
        stageIndex: 1,
        eventType: 'CALCINATION',
        startTempCelsius: 650,
        endTempCelsius: 880,
        peakTempCelsius: 780,
        massLossPercentExpected: 43.97,
        releasedEvolvedGasVI: 'CO₂(g) (Khí cacbonic)',
        solidResidueFormula: 'CaO(s) (Vôi sống)',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +178.2,
        reactionEquationVI: 'CaCO₃(s) → CaO(s) + CO₂(g)↑ (ΔH = +178.2 kJ/mol)',
        descriptionVI: 'Phản ứng nung vôi công nghiệp sản xuất vật liệu xây dựng và xi măng.',
      },
    ],
    descriptionVI: 'Nền tảng của ngành công nghiệp silicat và xi măng Việt Nam. Phản ứng phân hủy 1 bước sạch sẽ, giải phóng 44% khối lượng khí CO2 và để lại 56% vôi sống CaO.',
    colorHex: '#10b981', // Emerald
  },

  pet_polymer_pellet: {
    id: 'pet_polymer_pellet',
    name: 'Polyethylene Terephthalate (PET Plastic)',
    nameVI: 'Nhựa Nhiệt Dẻo PET (Chai Nhựa Tái Chế - Chuyển Pha Nhiệt DSC & TGA)',
    formula: '(C₁₀H₈O₄)ₙ',
    sampleType: 'THERMOPLASTIC_POLYMER',
    initialMassMg: 10.0,
    finalResiduePercentExpected: 0.0, // Complete pyrolysis
    glassTransitionTempCelsius: 78,
    crystallizationTempCelsius: 135,
    meltingTempCelsius: 255,
    stages: [
      {
        stageIndex: 1,
        eventType: 'DECOMPOSITION',
        startTempCelsius: 390,
        endTempCelsius: 480,
        peakTempCelsius: 440,
        massLossPercentExpected: 84.5,
        releasedEvolvedGasVI: 'Acetaldehyde, CO, CO₂, oligomers',
        solidResidueFormula: 'Cặn than carbon (Char)',
        isEndothermic: true,
        enthalpyDeltaHkJPerMol: +95.0,
        reactionEquationVI: '[-CO-C₆H₄-CO-O-CH₂CH₂-O-]ₙ → Monomers + Gases',
        descriptionVI: 'Cắt đứt liên kết este phân hủy mạch polymer thành các phân đoạn bay hơi.',
      },
      {
        stageIndex: 2,
        eventType: 'DECOMPOSITION',
        startTempCelsius: 490,
        endTempCelsius: 620,
        peakTempCelsius: 560,
        massLossPercentExpected: 15.5,
        releasedEvolvedGasVI: 'CO₂, H₂O (Cháy kiệt cặn than)',
        solidResidueFormula: 'Tro xỉ vô cơ (0%)',
        isEndothermic: false, // Exothermic burning in air
        enthalpyDeltaHkJPerMol: -150.0,
        reactionEquationVI: 'Cặn than (Char) + O₂ → CO₂↑',
        descriptionVI: 'Oxi hóa hoàn toàn cặn than carbon thành khí CO2.',
      },
    ],
    descriptionVI: 'Vật liệu kinh điển minh họa 3 đặc trưng nhiệt động học polymer trên đường quét DSC: Nhiệt độ thủy tinh hóa Tg (78°C), Đỉnh kết tinh lạnh Tc (135°C, tỏa nhiệt), và Đỉnh nóng chảy Tm (255°C, thu nhiệt).',
    colorHex: '#8b5cf6', // Violet
  },
};

// ----------------------------------------------------------------------------
// TGA / DSC SIMULATION ENGINE
// ----------------------------------------------------------------------------

export function simulateThermalAnalysis(
  sampleId: string,
  atmosphere: ThermalAtmosphere = 'INERT_NITROGEN',
  heatingRateCelsiusPerMin = 10.0,
  targetTempCelsius = 500.0
): ThermalAnalysisResult {
  const sample = THERMAL_SAMPLES_CATALOG[sampleId] || THERMAL_SAMPLES_CATALOG.calcium_oxalate_monohydrate;
  const currentT = Math.max(25.0, Math.min(1000.0, targetTempCelsius));

  // Generate full curve from 25 to 1000 °C in 10 °C increments
  const curveData: TgaDataPoint[] = [];
  let cumMassLoss = 0.0;

  for (let t = 25; t <= 1000; t += 10) {
    let massPct = 100.0;
    let dtgRate = 0.0;
    let dscHeat = 0.0; // mW/mg
    let currentFormula = sample.formula;

    // Evaluate stages
    for (const stage of sample.stages) {
      if (t >= stage.startTempCelsius) {
        if (t <= stage.endTempCelsius) {
          // Inside transition zone: use smooth sigmoid
          const progress = 1.0 / (1.0 + Math.exp(-0.08 * (t - stage.peakTempCelsius)));
          const stageLoss = stage.massLossPercentExpected * progress;
          massPct -= stageLoss;

          // Derivative Gaussian-like bell
          const dtg = (stage.massLossPercentExpected * 0.08 * Math.exp(-0.08 * (t - stage.peakTempCelsius))) /
            Math.pow(1.0 + Math.exp(-0.08 * (t - stage.peakTempCelsius)), 2);
          dtgRate += dtg;

          // DSC heat flow: Endothermic = negative peak, Exothermic = positive peak
          let isEndo = stage.isEndothermic;
          if (atmosphere === 'OXIDIZING_AIR' && stage.releasedEvolvedGasVI.includes('CO(g)')) {
            isEndo = false; // CO burns exothermically in air!
          }
          const sign = isEndo ? -1.0 : 1.0;
          dscHeat += sign * dtg * 1.8;
          currentFormula = stage.solidResidueFormula;
        } else {
          // Completed stage
          massPct -= stage.massLossPercentExpected;
          currentFormula = stage.solidResidueFormula;
        }
      }
    }

    // Polymer DSC Phase Transitions (PET)
    if (sample.glassTransitionTempCelsius && Math.abs(t - sample.glassTransitionTempCelsius) < 15) {
      // Step jump in heat capacity Cp (baseline shift)
      dscHeat -= 0.15 / (1.0 + Math.exp(-0.3 * (t - sample.glassTransitionTempCelsius)));
    }
    if (sample.crystallizationTempCelsius && Math.abs(t - sample.crystallizationTempCelsius) < 25) {
      // Exothermic cold crystallization peak (pointing up)
      const g = Math.exp(-Math.pow((t - sample.crystallizationTempCelsius) / 8.0, 2));
      dscHeat += g * 1.2;
    }
    if (sample.meltingTempCelsius && Math.abs(t - sample.meltingTempCelsius) < 25) {
      // Endothermic melting peak (pointing down)
      const g = Math.exp(-Math.pow((t - sample.meltingTempCelsius) / 8.0, 2));
      dscHeat -= g * 2.4;
    }

    massPct = Math.max(sample.finalResiduePercentExpected, massPct);

    curveData.push({
      temperatureCelsius: t,
      massPercent: Number(massPct.toFixed(2)),
      dtgRatePercentPerCelsius: Number(dtgRate.toFixed(3)),
      dscHeatFlowMwPerMg: Number(dscHeat.toFixed(3)),
      currentResidueFormula: currentFormula,
    });
  }

  // Current operating values
  const currentPointIndex = Math.min(curveData.length - 1, Math.max(0, Math.round((currentT - 25) / 10)));
  const currentPt = curveData[currentPointIndex];
  const currentMassMg = Number(((sample.initialMassMg * currentPt.massPercent) / 100.0).toFixed(2));
  const totalLoss = Number((100.0 - currentPt.massPercent).toFixed(2));

  // Determine active stage
  let activeStage: ThermalStageDef | null = null;
  for (const st of sample.stages) {
    if (currentT >= st.startTempCelsius && currentT <= st.endTempCelsius) {
      activeStage = st;
      break;
    }
  }

  // Pedagogical analysis
  let summary = `Mẫu phân tích: ${sample.nameVI}. Khối lượng ban đầu m₀ = ${sample.initialMassMg.toFixed(1)} mg. `;
  summary += `Tại T = ${currentT.toFixed(0)} °C (Tốc độ gia nhiệt ${heatingRateCelsiusPerMin} °C/phút trong khí quyển ${atmosphere === 'INERT_NITROGEN' ? 'N₂ trơ' : 'Không khí oxi hóa'}): `;
  summary += `Khối lượng còn lại đạt ${currentPt.massPercent.toFixed(1)}% (${currentMassMg.toFixed(2)} mg), đã mất ${totalLoss.toFixed(1)}% khối lượng. `;
  if (activeStage) {
    summary += `ĐANG DIỄN RA GIAI ĐOẠN ${activeStage.stageIndex}: ${activeStage.reactionEquationVI} (Đỉnh phân hủy T_peak = ${activeStage.peakTempCelsius} °C). Khí thoát ra: ${activeStage.releasedEvolvedGasVI}. `;
  } else {
    summary += `Chất rắn ổn định ở trạng thái: ${currentPt.currentResidueFormula}. `;
  }
  summary += `Đoạn cuối ở 1000 °C để lại cặn ${sample.finalResiduePercentExpected.toFixed(1)}% khối lượng lý thuyết.`;

  return {
    sample,
    atmosphere,
    heatingRateCelsiusPerMin,
    currentTempCelsius: currentT,
    currentMassPercent: currentPt.massPercent,
    currentMassMg,
    currentDtgRate: currentPt.dtgRatePercentPerCelsius,
    currentHeatFlow: currentPt.dscHeatFlowMwPerMg,
    totalMassLossPercent: totalLoss,
    activeStage,
    curveData,
    pedagogicalAnalysisVI: summary,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR THERMAL ANALYSIS & DECOMPOSITION
// ----------------------------------------------------------------------------

export function getMatchingThermalAnalysisCard(card: { id?: string; name?: string; description?: string }): ThermalSampleSpec | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();
  const descLower = (card.description || '').toLowerCase();

  for (const s of Object.values(THERMAL_SAMPLES_CATALOG)) {
    if (idLower.includes(s.id) || idLower.includes(s.formula.toLowerCase())) {
      return s;
    }
  }

  // Keywords
  if (nameLower.includes('oxalat') || nameLower.includes('oxalate') || nameLower.includes('c2o4') || idLower.includes('oxalat')) {
    return THERMAL_SAMPLES_CATALOG.calcium_oxalate_monohydrate;
  }
  if (nameLower.includes('phèn xanh') || nameLower.includes('cuso4') || nameLower.includes('đồng sunfat') || nameLower.includes('vitriol')) {
    return THERMAL_SAMPLES_CATALOG.copper_sulfate_pentahydrate;
  }
  if (nameLower.includes('đá vôi') || nameLower.includes('caco3') || nameLower.includes('vôi sống') || nameLower.includes('nung vôi') || nameLower.includes('limestone')) {
    return THERMAL_SAMPLES_CATALOG.calcium_carbonate_limestone;
  }
  if (nameLower.includes('pet') || nameLower.includes('nhựa') || nameLower.includes('polymer') || nameLower.includes('nóng chảy') || nameLower.includes('plastic')) {
    return THERMAL_SAMPLES_CATALOG.pet_polymer_pellet;
  }
  if (nameLower.includes('tga') || nameLower.includes('dsc') || nameLower.includes('nhiệt phân') || descLower.includes('nhiệt phân')) {
    return THERMAL_SAMPLES_CATALOG.calcium_oxalate_monohydrate;
  }

  return null;
}
