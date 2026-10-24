// src/components/visualizations/FlameTestVisualizer.tsx
// Interactive Flame Test Spectroscopy Visualizer (Thí nghiệm Thử Màu Ngọn Lửa & Quang phổ Phát xạ)
// Standardized for Vietnam GDPT 2018 Grade 10 & 12 Chemistry Curriculum & IUPAC Analytical Standards

import React, { useState } from 'react';
import { Flame, Sparkles, Info, Filter, Zap, BookOpen } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export interface SpectralLine {
  wavelength: number; // in nm
  colorHex: string;
  intensity?: number; // 0.1 to 1.0
  label?: string;
}

export interface FlameTestData {
  hasFlameColor: boolean;
  colorNameVI: string;
  colorHex: string;
  secondaryHex?: string;
  glowHex: string;
  wavelengthNm?: string;
  primaryWavelength?: number; // in nm
  secondaryWavelength?: number; // in nm
  discreteLines?: SpectralLine[];
  electronicTransitionVI?: string;
  spectralLineDescVI: string;
  experimentalNoteVI: string;
  requiresCobaltGlass?: boolean;
}

export function calculatePhotonEnergy(wavelengthNm: number): {
  energyEv: number;
  energyKjPerMol: number;
  frequencyTHz: number;
} {
  // Planck's Law: E = hc / lambda
  // E (eV) = 1239.84193 / lambda(nm)
  // E (kJ/mol) = 119626.6 / lambda(nm)
  // nu (THz) = c / lambda = 299792.458 / lambda(nm)
  const energyEv = Math.round((1239.84193 / wavelengthNm) * 100) / 100;
  const energyKjPerMol = Math.round(119626.6 / wavelengthNm);
  const frequencyTHz = Math.round((299792.458 / wavelengthNm) * 10) / 10;
  return { energyEv, energyKjPerMol, frequencyTHz };
}

export const FLAME_TEST_CATALOG: Record<string, FlameTestData> = {
  Li: {
    hasFlameColor: true,
    colorNameVI: 'Đỏ thẫm (Crimson Red)',
    colorHex: '#E0115F',
    secondaryHex: '#FF1493',
    glowHex: 'rgba(224, 17, 95, 0.65)',
    wavelengthNm: '670.8 nm',
    primaryWavelength: 670.8,
    discreteLines: [
      { wavelength: 670.8, colorHex: '#E0115F', intensity: 1.0, label: '670.8 nm (2p → 2s)' }
    ],
    electronicTransitionVI: 'Li*(1s² 2p¹) → Li(1s² 2s¹) + hν (670.8 nm)',
    spectralLineDescVI: 'Vạch phát xạ đơn sắc đỏ rực rỡ tại 670.8 nm khi electron phân lớp 2p chuyển dời về 2s.',
    experimentalNoteVI: 'Muối LiCl hoặc LiNO₃ nhuộm ngọn lửa đèn khí thành màu đỏ thẫm đặc trưng, ứng dụng trong pháo hoa màu hồng đỏ rực.'
  },
  Na: {
    hasFlameColor: true,
    colorNameVI: 'Vàng chói rực rỡ (Bright Golden Yellow)',
    colorHex: '#FFD700',
    secondaryHex: '#FFA500',
    glowHex: 'rgba(255, 215, 0, 0.75)',
    wavelengthNm: '589.0 nm & 589.6 nm',
    primaryWavelength: 589.0,
    secondaryWavelength: 589.6,
    discreteLines: [
      { wavelength: 589.0, colorHex: '#FFD700', intensity: 1.0, label: '589.0 nm (D2: 3p3/2 → 3s)' },
      { wavelength: 589.6, colorHex: '#FFA500', intensity: 0.85, label: '589.6 nm (D1: 3p1/2 → 3s)' }
    ],
    electronicTransitionVI: 'Na*(3p¹) → Na(3s¹) + hν (vạch D kép 589.0 / 589.6 nm)',
    spectralLineDescVI: 'Vạch D kép kinh điển của Natri (Sodium D-lines) do bước chuyển 3p → 3s sinh ra.',
    experimentalNoteVI: 'Màu vàng của Natri cực kỳ nhạy và lấn át hầu hết các màu khác; chỉ cần một lượng vết ion Na⁺ cũng làm ngọn lửa chuyển vàng chói.'
  },
  K: {
    hasFlameColor: true,
    colorNameVI: 'Tím hoa cà (Lilac / Pale Violet)',
    colorHex: '#DA70D6',
    secondaryHex: '#9370DB',
    glowHex: 'rgba(218, 112, 214, 0.65)',
    wavelengthNm: '766.5 nm & 404.4 nm',
    primaryWavelength: 766.5,
    secondaryWavelength: 404.4,
    discreteLines: [
      { wavelength: 404.4, colorHex: '#DA70D6', intensity: 0.75, label: '404.4 nm (5p → 4s)' },
      { wavelength: 766.5, colorHex: '#DC143C', intensity: 0.95, label: '766.5 nm (4p → 4s)' },
      { wavelength: 769.9, colorHex: '#B22222', intensity: 0.7, label: '769.9 nm (4p → 4s)' }
    ],
    electronicTransitionVI: 'K*(5p¹) → K(4s¹) (404.4 nm) & K*(4p¹) → K(4s¹) (766.5 nm)',
    spectralLineDescVI: 'Hai cụm vạch cực hạn: cận hồng ngoại 766.5 nm và cận tử ngoại tím 404.4 nm.',
    experimentalNoteVI: 'Thường bị tạp chất Na⁺ che lấp, bắt buộc phải quan sát qua tấm kính thủy tinh Coban màu xanh để lọc sạch ánh sáng vàng!',
    requiresCobaltGlass: true
  },
  Rb: {
    hasFlameColor: true,
    colorNameVI: 'Đỏ tím sẫm (Reddish-Violet)',
    colorHex: '#C71585',
    secondaryHex: '#8B008B',
    glowHex: 'rgba(199, 21, 133, 0.65)',
    wavelengthNm: '780.0 nm & 794.8 nm',
    primaryWavelength: 780.0,
    secondaryWavelength: 794.8,
    discreteLines: [
      { wavelength: 420.2, colorHex: '#9370DB', intensity: 0.65, label: '420.2 nm (6p → 5s)' },
      { wavelength: 780.0, colorHex: '#C71585', intensity: 1.0, label: '780.0 nm (5p → 5s)' }
    ],
    electronicTransitionVI: 'Rb*(5p¹) → Rb(5s¹) + hν (780.0 nm)',
    spectralLineDescVI: 'Tên gọi Rubidium bắt nguồn từ tiếng Latin "rubidus" (đỏ sẫm) do các vạch quang phổ phát xạ đỏ thẫm.',
    experimentalNoteVI: 'Tạo ngọn lửa màu đỏ tím huyền bí, được phát hiện lần đầu năm 1861 nhờ phương pháp phân tích quang phổ của Bunsen & Kirchhoff.'
  },
  Cs: {
    hasFlameColor: true,
    colorNameVI: 'Xanh lam nhạt (Sky Blue / Azure)',
    colorHex: '#00BFFF',
    secondaryHex: '#1E90FF',
    glowHex: 'rgba(0, 191, 255, 0.65)',
    wavelengthNm: '455.5 nm & 459.3 nm',
    primaryWavelength: 455.5,
    secondaryWavelength: 459.3,
    discreteLines: [
      { wavelength: 455.5, colorHex: '#00BFFF', intensity: 1.0, label: '455.5 nm (6p → 6s)' },
      { wavelength: 459.3, colorHex: '#1E90FF', intensity: 0.85, label: '459.3 nm (6p → 6s)' }
    ],
    electronicTransitionVI: 'Cs*(6p¹) → Cs(6s¹) + hν (455.5 / 459.3 nm)',
    spectralLineDescVI: 'Tên gọi Caesium bắt nguồn từ tiếng Latin "caesius" (xanh da trời) từ 2 vạch lam sáng chói.',
    experimentalNoteVI: 'Kim loại kiềm có bán kính nguyên tử lớn nhất chu kỳ, ion hóa cực nhanh tạo ngọn lửa xanh lam lạnh.'
  },
  Ca: {
    hasFlameColor: true,
    colorNameVI: 'Đỏ da cam / Đỏ gạch (Brick Red)',
    colorHex: '#FF4500',
    secondaryHex: '#FF6347',
    glowHex: 'rgba(255, 69, 0, 0.65)',
    wavelengthNm: '622 nm & 553 nm',
    primaryWavelength: 622.0,
    secondaryWavelength: 553.3,
    discreteLines: [
      { wavelength: 553.3, colorHex: '#ADFF2F', intensity: 0.65, label: '553.3 nm (Ca I)' },
      { wavelength: 622.0, colorHex: '#FF4500', intensity: 0.95, label: '622.0 nm (dải CaOH)' }
    ],
    electronicTransitionVI: 'CaOH* → CaOH + hν (622 nm) & Ca*(4s4p) → Ca(4s²) (553.3 nm)',
    spectralLineDescVI: 'Quang phổ dải của phân tử CaOH và vạch Ca nguyên tử ở vùng cam đỏ.',
    experimentalNoteVI: 'Muối CaCl₂ cho ngọn lửa màu đỏ gạch nung rõ rệt, dễ dàng phân biệt với màu đỏ son của Stronti.'
  },
  Sr: {
    hasFlameColor: true,
    colorNameVI: 'Đỏ son rực rỡ (Crimson / Scarlet Red)',
    colorHex: '#DC143C',
    secondaryHex: '#FF0000',
    glowHex: 'rgba(220, 20, 60, 0.75)',
    wavelengthNm: '650 nm - 680 nm & 460.7 nm',
    primaryWavelength: 650.0,
    secondaryWavelength: 460.7,
    discreteLines: [
      { wavelength: 460.7, colorHex: '#00BFFF', intensity: 0.8, label: '460.7 nm (Sr I: 5s5p → 5s²)' },
      { wavelength: 650.0, colorHex: '#DC143C', intensity: 0.95, label: '650.0 nm (dải SrOH)' },
      { wavelength: 670.0, colorHex: '#FF0000', intensity: 0.75, label: '670.0 nm (dải SrOH)' }
    ],
    electronicTransitionVI: 'Sr*(5s5p) → Sr(5s²) (460.7 nm) kết hợp phát xạ phân tử SrOH vùng đỏ thẫm',
    spectralLineDescVI: 'Dải phát xạ phân tử SrOH vùng đỏ thắm phối hợp vạch đơn sắc lam 460.7 nm.',
    experimentalNoteVI: 'Hợp chất Sr(NO₃)₂ là thành phần chính tạo nên pháo hoa và pháo sáng cứu nạn màu đỏ tươi rực rỡ nhất thế giới.'
  },
  Ba: {
    hasFlameColor: true,
    colorNameVI: 'Vàng lục / Lục nõn chuối (Apple Green)',
    colorHex: '#7FFF00',
    secondaryHex: '#32CD32',
    glowHex: 'rgba(127, 255, 0, 0.65)',
    wavelengthNm: '524 nm & 514 nm',
    primaryWavelength: 524.2,
    secondaryWavelength: 514.0,
    discreteLines: [
      { wavelength: 514.0, colorHex: '#32CD32', intensity: 0.8, label: '514.0 nm (dải BaOH)' },
      { wavelength: 524.2, colorHex: '#7FFF00', intensity: 1.0, label: '524.2 nm (dải BaOH)' },
      { wavelength: 553.5, colorHex: '#98FB98', intensity: 0.65, label: '553.5 nm (Ba I)' }
    ],
    electronicTransitionVI: 'BaOH* → BaOH + hν (524.2 nm / 514.0 nm) & Ba*(6s6p) → Ba(6s²)',
    spectralLineDescVI: 'Các dải phát xạ đặc trưng của phân tử BaOH và vạch nguyên tử Ba 553.5 nm.',
    experimentalNoteVI: 'Hợp chất Ba(NO₃)₂ và BaCl₂ là tiêu chuẩn công nghiệp chế tạo pháo hoa xanh lục lá cây lộng lẫy.'
  },
  Cu: {
    hasFlameColor: true,
    colorNameVI: 'Xanh lục bảo / Xanh lam ngọc (Emerald Blue-Green)',
    colorHex: '#00FA9A',
    secondaryHex: '#00CED1',
    glowHex: 'rgba(0, 250, 154, 0.65)',
    wavelengthNm: '510 nm - 520 nm (CuCl)',
    primaryWavelength: 510.5,
    secondaryWavelength: 521.8,
    discreteLines: [
      { wavelength: 510.5, colorHex: '#00FA9A', intensity: 1.0, label: '510.5 nm (Cu I: 4p → 4s)' },
      { wavelength: 521.8, colorHex: '#00CED1', intensity: 0.8, label: '521.8 nm (dải CuCl)' }
    ],
    electronicTransitionVI: 'Cu*(4p¹) → Cu(4s¹) (510.5 nm) & phát xạ dải phân tử kích thích CuCl',
    spectralLineDescVI: 'Dải phân tử CuCl vùng xanh lam ngọc và các vạch nguyên tử đồng 324.7 nm / 510.5 nm.',
    experimentalNoteVI: 'Đồng halide (CuCl₂) cháy cho ngọn lửa xanh lam ngọc quyến rũ; đồng kim loại chưa tạo halide cho màu xanh lục.'
  },
  B: {
    hasFlameColor: true,
    colorNameVI: 'Xanh lục tươi sáng (Bright Apple Green)',
    colorHex: '#39FF14',
    secondaryHex: '#00FF00',
    glowHex: 'rgba(57, 255, 20, 0.65)',
    wavelengthNm: '546 nm (BO₂ radical)',
    primaryWavelength: 546.0,
    discreteLines: [
      { wavelength: 546.0, colorHex: '#39FF14', intensity: 1.0, label: '546.0 nm (gốc BO₂)' }
    ],
    electronicTransitionVI: 'BO₂* → BO₂ + hν (dải phân tử xanh lục 546 nm)',
    spectralLineDescVI: 'Phát xạ kích thích từ gốc tự do BO₂ trong ngọn lửa đèn khí.',
    experimentalNoteVI: 'Thử nghiệm este hóa axit boric H₃BO₃ với methanol tạo trimetyl borat B(OCH₃)₃ bốc cháy màu xanh lục lá cây tuyệt đẹp.'
  },
  In: {
    hasFlameColor: true,
    colorNameVI: 'Xanh chàm / Lam đậm (Indigo / Violet-Blue)',
    colorHex: '#4B0082',
    secondaryHex: '#4169E1',
    glowHex: 'rgba(75, 0, 130, 0.7)',
    wavelengthNm: '451.1 nm & 410.2 nm',
    primaryWavelength: 451.1,
    secondaryWavelength: 410.2,
    discreteLines: [
      { wavelength: 410.2, colorHex: '#8A2BE2', intensity: 0.75, label: '410.2 nm (5p → 5s)' },
      { wavelength: 451.1, colorHex: '#4B0082', intensity: 1.0, label: '451.1 nm (5p → 5s)' }
    ],
    electronicTransitionVI: 'In*(5p3/2) → In(5s) + hν (451.1 nm)',
    spectralLineDescVI: 'Vạch chàm đơn sắc rực rỡ tại 451.1 nm — chính vạch phổ này đã giúp Reich và Richter phát hiện ra nguyên tố Indium năm 1863.',
    experimentalNoteVI: 'Hợp chất InCl₃ nhuộm ngọn lửa thành màu xanh chàm sẫm huyền bí.'
  },
  Tl: {
    hasFlameColor: true,
    colorNameVI: 'Lục bảo tươi sáng (Brilliant Emerald Green)',
    colorHex: '#00FF7F',
    secondaryHex: '#32CD32',
    glowHex: 'rgba(0, 255, 127, 0.7)',
    wavelengthNm: '535.0 nm',
    primaryWavelength: 535.0,
    discreteLines: [
      { wavelength: 535.0, colorHex: '#00FF7F', intensity: 1.0, label: '535.0 nm (6p → 6s)' }
    ],
    electronicTransitionVI: 'Tl*(7s) → Tl(6p1/2) + hν (535.0 nm)',
    spectralLineDescVI: 'Vạch phổ đơn sắc xanh lục sắc nét tại 535.0 nm bắt nguồn từ từ Hy Lạp "thallos" (chồi non xanh biếc) của William Crookes.',
    experimentalNoteVI: 'Muối Thallium rất độc, vạch phổ xanh lục 535 nm là dấu vân tay quang phổ nhạy bậc nhất.'
  },
  Pb: {
    hasFlameColor: true,
    colorNameVI: 'Xanh lam xám nhạt (Pale Greyish Blue)',
    colorHex: '#B0C4DE',
    secondaryHex: '#87CEEB',
    glowHex: 'rgba(176, 196, 222, 0.55)',
    wavelengthNm: '405.8 nm',
    primaryWavelength: 405.8,
    discreteLines: [
      { wavelength: 405.8, colorHex: '#B0C4DE', intensity: 0.9, label: '405.8 nm (Pb I)' }
    ],
    electronicTransitionVI: 'Pb*(7s) → Pb(6p²) + hν (405.8 nm)',
    spectralLineDescVI: 'Vạch phát xạ cực tím tím 405.8 nm phát ra ngọn lửa màu xanh xám nhạt.',
    experimentalNoteVI: 'Đốt chì halide trên đèn khí cần lưu ý bảo hộ thông gió cẩn thận trong phòng thí nghiệm.'
  },
  Zn: {
    hasFlameColor: true,
    colorNameVI: 'Lục lam ánh trắng (Whitish Turquoise / Green-Blue)',
    colorHex: '#AFEEEE',
    secondaryHex: '#7FFFD4',
    glowHex: 'rgba(175, 238, 238, 0.65)',
    wavelengthNm: '472.2 nm & 481.1 nm',
    primaryWavelength: 472.2,
    secondaryWavelength: 481.1,
    discreteLines: [
      { wavelength: 472.2, colorHex: '#AFEEEE', intensity: 0.9, label: '472.2 nm (Zn I: 5s → 4p)' },
      { wavelength: 481.1, colorHex: '#7FFFD4', intensity: 0.85, label: '481.1 nm (Zn I: 5s → 4p)' }
    ],
    electronicTransitionVI: 'Zn*(5s) → Zn(4p) + hν (472.2 / 481.1 nm)',
    spectralLineDescVI: 'Cụm vạch phát xạ xanh lam 472.2 nm và 481.1 nm tạo ánh sáng lục lam nhạt xen lẫn hạt oxit ZnO.',
    experimentalNoteVI: 'Bột kẽm cháy trong không khí tạo khói trắng ZnO (bông len trắng của triết gia) cùng ngọn lửa lục lam nhạt.'
  },
  Mg: {
    hasFlameColor: true,
    colorNameVI: 'Trắng chói lòa (Blinding White Light)',
    colorHex: '#FFFFFF',
    secondaryHex: '#E0FFFF',
    glowHex: 'rgba(255, 255, 255, 0.85)',
    wavelengthNm: '285.2 nm (UV) + Toàn bộ quang phổ liên tục',
    primaryWavelength: 285.2,
    discreteLines: [
      { wavelength: 383.8, colorHex: '#E0FFFF', intensity: 0.85, label: '383.8 nm (Mg I)' },
      { wavelength: 518.4, colorHex: '#98FB98', intensity: 0.9, label: '518.4 nm (Mg b-triplet)' }
    ],
    electronicTransitionVI: 'Mg*(3p¹) → Mg(3s²) (285.2 nm) + Bức xạ vật đen nhiệt độ cao T ≈ 3100 K',
    spectralLineDescVI: 'Nhiệt độ ngọn lửa đạt 3100 K tạo bức xạ vật đen chói lòa kết hợp vạch phát xạ MgO và Mg.',
    experimentalNoteVI: 'Dây Magie cháy trong không khí phát ra ánh sáng trắng cực mạnh kèm tia cực tím, từng dùng làm đèn flash máy ảnh cổ điển.'
  },
  Fe: {
    hasFlameColor: true,
    colorNameVI: 'Tia lửa vàng kim lấp lánh (Golden Sparks)',
    colorHex: '#F4A460',
    secondaryHex: '#FF8C00',
    glowHex: 'rgba(244, 164, 96, 0.55)',
    wavelengthNm: '371.9 nm, 385.9 nm & quang phổ nhiệt',
    primaryWavelength: 385.9,
    discreteLines: [
      { wavelength: 385.9, colorHex: '#BA55D3', intensity: 0.7, label: '385.9 nm (Fe I)' },
      { wavelength: 438.3, colorHex: '#4169E1', intensity: 0.8, label: '438.3 nm (Fe I)' },
      { wavelength: 527.0, colorHex: '#00FF7F', intensity: 0.75, label: '527.0 nm (Fe I)' }
    ],
    electronicTransitionVI: 'Hàng ngàn bước chuyển điện tử Fe(3d⁶ 4s²) đan xen hiện tượng cháy hạt sắt nóng sáng',
    spectralLineDescVI: 'Hàng nghìn vạch phát xạ nguyên tử Fe đan xen với hiện tượng cháy hạt sắt nóng sáng phát ra tia lửa.',
    experimentalNoteVI: 'Bột sắt rắc vào ngọn lửa tạo các chùm tia lửa vàng kim bung nở lấp lánh, ứng dụng trong que pháo bông sinh nhật.'
  }
};

export interface FlameTestVisualizerProps {
  symbol: string;
  nameVi: string;
  contextFormula?: string;
  contextName?: string;
}

export const FlameTestVisualizer: React.FC<FlameTestVisualizerProps> = ({
  symbol,
  nameVi,
  contextFormula,
  contextName
}) => {
  const [isBurning, setIsBurning] = useState<boolean>(true);
  const [useCobaltGlass, setUseCobaltGlass] = useState<boolean>(false);
  const [showQuantumDetails, setShowQuantumDetails] = useState<boolean>(false);

  const flameData = FLAME_TEST_CATALOG[symbol];

  if (!flameData) {
    return (
      <div className="p-3 rounded-xl bg-obsidian/60 border border-navy-light/40 flex items-center justify-between text-xs text-ivory-muted">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-slate-500" />
          <span>
            {contextFormula ? (
              <>Mẫu thử <strong>{contextFormula}</strong> chứa cation <strong>{symbol} ({nameVi})</strong> không có ngọn lửa phát xạ màu đặc trưng trong phổ nhìn thấy thông thường.</>
            ) : (
              <>Nguyên tố <strong>{symbol} ({nameVi})</strong> không có ngọn lửa phát xạ màu đặc trưng trong phổ nhìn thấy thông thường.</>
            )}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy text-slate-400">Không màu / Phổ nền</span>
      </div>
    );
  }

  // If using Cobalt Glass on Potassium (K), adjust view to filtered lilac
  const effectiveColor = (symbol === 'K' && useCobaltGlass)
    ? '#BA55D3'
    : (symbol === 'Na' && useCobaltGlass)
    ? '#4169E1' // Sodium yellow is absorbed by cobalt glass!
    : flameData.colorHex;

  const toggleBurn = () => {
    if (!isBurning) {
      sound.playBunsenBurnerHiss(0.6);
      sound.triggerHaptic(35);
    } else {
      sound.playUiClick();
    }
    setIsBurning(!isBurning);
  };

  // Quantum photon calculations for primary wavelength
  const quantumCalc = flameData.primaryWavelength
    ? calculatePhotonEnergy(flameData.primaryWavelength)
    : null;

  return (
    <div className="p-4 rounded-xl bg-obsidian/90 border border-navy-light/60 text-xs flex flex-col gap-3 shadow-xl">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/40 pb-2.5">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-mono font-bold text-ivory">
            THÍ NGHIỆM THỬ MÀU NGỌN LỬA
            {contextFormula ? (
              <span className="text-cyan-300 ml-1">
                (MẪU {contextFormula} — CATION {symbol})
              </span>
            ) : (
              <span className="text-cyan-300 ml-1">({symbol} — {nameVi})</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {flameData.requiresCobaltGlass && (
            <button
              onClick={() => {
                sound.playUiClick();
                setUseCobaltGlass(!useCobaltGlass);
              }}
              className={`px-2 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1 transition-all border ${
                useCobaltGlass
                  ? 'bg-blue-600 border-blue-400 text-white shadow-sm shadow-blue-500/50'
                  : 'bg-navy/60 border-blue-500/40 text-blue-300 hover:bg-navy'
              }`}
              title="Kính Coban lọc sạch ánh sáng vàng của tạp chất Natri để nhận diện ngọn lửa Kali"
            >
              <Filter className="w-3 h-3" />
              <span>Kính Coban: {useCobaltGlass ? 'ĐANG BẬT' : 'TẮT'}</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playUiClick();
              setShowQuantumDetails(!showQuantumDetails);
            }}
            className={`px-2 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1 transition-all border ${
              showQuantumDetails
                ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                : 'bg-navy/60 border-navy-light text-slate-300 hover:text-white'
            }`}
            title="Xem chi tiết lượng tử quang phổ (Quang năng photon hν và bước chuyển electron)"
          >
            <Zap className="w-3 h-3 text-purple-400" />
            <span>Lượng Tử {showQuantumDetails ? '▲' : '▼'}</span>
          </button>

          <button
            onClick={toggleBurn}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all border ${
              isBurning
                ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-sm shadow-amber-500/30'
                : 'bg-navy border-navy-light text-slate-400 hover:text-white'
            }`}
          >
            {isBurning ? 'Đang Đốt Mẫu 🔥' : 'Tắt Lửa'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        {/* Left: Interactive Bunsen Burner & Animated Flame Canvas (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/80 border border-navy-light/40 relative overflow-hidden">
          {/* Cobalt Glass Filter Overlay effect */}
          {useCobaltGlass && (
            <div className="absolute inset-0 bg-blue-900/40 pointer-events-none backdrop-blur-[0.5px] border-2 border-blue-500/50 rounded-xl flex items-start justify-end p-1.5 z-20">
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-400/40">
                Lọc qua Kính Coban
              </span>
            </div>
          )}

          {/* SVG Animated Flame */}
          <div className="w-28 h-36 flex items-end justify-center relative select-none">
            {isBurning ? (
              <div className="relative flex flex-col items-center">
                {/* Outer Heat Glow aura */}
                <div
                  className="w-20 h-28 rounded-full blur-xl absolute -top-4 opacity-75 animate-pulse"
                  style={{ backgroundColor: effectiveColor }}
                />

                {/* Main Flame Tongue */}
                <svg viewBox="0 0 100 140" className="w-24 h-32 overflow-visible relative z-10">
                  <defs>
                    <radialGradient id={`flameGrad_${symbol}`} cx="50%" cy="80%" r="60%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="35%" stopColor={effectiveColor} />
                      <stop offset="85%" stopColor={flameData.secondaryHex || effectiveColor} />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>

                  {/* Outer Flickering Petal */}
                  <path
                    d="M 50,5 C 65,35 90,65 80,105 C 70,135 30,135 20,105 C 10,65 35,35 50,5 Z"
                    fill={`url(#flameGrad_${symbol})`}
                    className="animate-[pulse_1.2s_ease-in-out_infinite]"
                    filter="drop-shadow(0 0 8px rgba(255,255,255,0.4))"
                  />

                  {/* Inner White Hot Core */}
                  <path
                    d="M 50,45 C 57,65 70,85 65,110 C 60,125 40,125 35,110 C 30,85 43,65 50,45 Z"
                    fill="#FFFFFF"
                    opacity="0.85"
                  />
                </svg>

                {/* Platinum Wire Loop Sampling */}
                <div className="absolute bottom-6 -right-5 w-14 h-0.5 bg-slate-400 origin-left rotate-[-25deg] shadow z-15">
                  <div className="w-2.5 h-2.5 rounded-full border border-amber-300 absolute -right-1 -top-1 bg-amber-400/30" />
                </div>
              </div>
            ) : (
              <div className="h-28 flex items-center justify-center text-slate-500 font-mono text-[11px]">
                [Ngọn lửa đã tắt]
              </div>
            )}

            {/* Bunsen Burner Metal Top */}
            <div className="w-12 h-4 rounded-t bg-gradient-to-r from-slate-600 via-slate-400 to-slate-700 border-t border-slate-300 mt-1 shadow-md z-10" />
          </div>

          <span className="text-[10px] font-mono text-slate-400 mt-1">Đèn khí Bunsen + Dây Platin</span>
        </div>

        {/* Right: Scientific Spectroscopy Metrics & Curriculum Details (8 cols) */}
        <div className="md:col-span-8 flex flex-col gap-2.5">
          {/* Flame Color Name & Wavelength Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-navy/60 border border-navy-light/40">
            <div>
              <span className="text-[10px] text-ivory-muted uppercase tracking-wider block font-mono">
                Màu Sắc Ngọn Lửa Đặc Trưng:
              </span>
              <strong className="text-sm font-bold" style={{ color: effectiveColor }}>
                {flameData.colorNameVI}
              </strong>
            </div>

            {flameData.wavelengthNm && (
              <div className="text-right">
                <span className="text-[10px] text-ivory-muted uppercase tracking-wider block font-mono">
                  Bước Sóng Phát Xạ λ:
                </span>
                <span className="px-2 py-0.5 rounded bg-obsidian text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
                  {flameData.wavelengthNm}
                </span>
              </div>
            )}
          </div>

          {/* Spectrograph View 1: Dark Emission Line Spectrum (GDPT 2018 Quang phổ vạch phát xạ nền đen) */}
          <div className="p-2.5 rounded-lg bg-black border border-cyan-500/40 flex flex-col gap-1.5 font-mono">
            <div className="flex items-center justify-between text-[10px] text-ivory-muted">
              <span className="text-cyan-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Quang Phổ Vạch Phát Xạ Nền Đen (380 nm – 750 nm):
              </span>
              <span className="text-amber-300 font-mono text-[9px]">ΔE = hν = hc/λ</span>
            </div>

            {/* Dark Spectrometer Chamber with Glowing Emission Slits */}
            <div className="w-full h-6 rounded bg-slate-950 border border-slate-700 relative overflow-hidden flex items-center shadow-inner">
              {/* Discrete Emission Slit Lines */}
              {isBurning && flameData.discreteLines && flameData.discreteLines.map((line, idx) => {
                const percent = Math.min(100, Math.max(0, ((line.wavelength - 380) / 370) * 100));
                return (
                  <div
                    key={idx}
                    className="absolute top-0 bottom-0 w-1 pointer-events-auto group cursor-pointer transition-transform hover:scale-125 z-10"
                    style={{
                      left: `calc(${percent}% - 2px)`,
                      backgroundColor: line.colorHex,
                      boxShadow: `0 0 6px ${line.colorHex}, 0 0 12px ${line.colorHex}`
                    }}
                    title={`${line.label || `${line.wavelength} nm`}`}
                  >
                    {/* Hover Tooltip */}
                    <div className="hidden group-hover:block absolute bottom-full mb-1 -left-12 bg-black/90 text-white text-[9px] px-1.5 py-0.5 rounded border border-cyan-400 whitespace-nowrap z-30 pointer-events-none font-mono">
                      {line.label || `${line.wavelength} nm`}
                    </div>
                  </div>
                );
              })}

              {!isBurning && (
                <div className="w-full text-center text-[10px] text-slate-600 font-mono">
                  [Không có vạch phát xạ khi tắt lửa]
                </div>
              )}
            </div>

            {/* Spectrometer scale marks */}
            <div className="flex items-center justify-between text-[8px] text-slate-500 px-0.5">
              <span>380nm (Tím)</span>
              <span>450nm (Lam)</span>
              <span>520nm (Lục)</span>
              <span>580nm (Vàng)</span>
              <span>650nm (Đỏ)</span>
              <span>750nm (Đỏ thẫm)</span>
            </div>
          </div>

          {/* Continuous Reference Spectrum Bar for comparison */}
          <div className="p-2 rounded-lg bg-obsidian border border-navy-light/40 flex flex-col gap-1 font-mono">
            <span className="text-[9px] text-slate-400">Quang phổ liên tục đối chiếu:</span>
            <div className="w-full h-2 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 via-blue-500 via-emerald-400 via-yellow-400 to-red-600 relative opacity-80" />
          </div>

          {/* Quantum Physical Chemistry Box (Collapsible / Extended) */}
          {showQuantumDetails && quantumCalc && (
            <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/40 text-[11px] font-mono flex flex-col gap-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-purple-300 font-bold">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  THÔNG SỐ LƯỢNG TỬ ÁNH SÁNG PHOTON (PLANCK - EINSTEIN)
                </span>
                <span className="text-xs text-amber-300">λ = {flameData.primaryWavelength} nm</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-1">
                <div className="p-1 rounded bg-black/50 border border-purple-500/20">
                  <span className="text-[9px] text-slate-400 block">Năng lượng E (eV):</span>
                  <span className="font-bold text-cyan-300">{quantumCalc.energyEv} eV</span>
                </div>
                <div className="p-1 rounded bg-black/50 border border-purple-500/20">
                  <span className="text-[9px] text-slate-400 block">Quang năng mol:</span>
                  <span className="font-bold text-amber-300">{quantumCalc.energyKjPerMol} kJ/mol</span>
                </div>
                <div className="p-1 rounded bg-black/50 border border-purple-500/20">
                  <span className="text-[9px] text-slate-400 block">Tần số sóng ν:</span>
                  <span className="font-bold text-emerald-300">{quantumCalc.frequencyTHz} THz</span>
                </div>
              </div>
              {flameData.electronicTransitionVI && (
                <div className="text-[10px] text-purple-200 mt-1 bg-black/40 p-1.5 rounded border border-purple-500/20">
                  <strong className="text-purple-300 mr-1">Chuyển dời mức năng lượng:</strong>
                  {flameData.electronicTransitionVI}
                </div>
              )}
            </div>
          )}

          {/* Spectral Line Explanation */}
          <div className="p-2.5 rounded-lg bg-navy/40 border border-navy-light/30 text-ivory-muted text-[11px] leading-relaxed">
            <span className="text-cyan-ion font-bold mr-1">Cơ chế phát xạ:</span>
            {flameData.spectralLineDescVI}
          </div>

          {/* Practical Lab Note (GDPT 2018) */}
          <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200/90 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 mr-1">Kỹ thuật phòng thí nghiệm:</strong>
              {contextFormula ? (
                <>
                  Mẫu thử <strong>{contextFormula}</strong> chứa cation <strong>{symbol}</strong>. {flameData.experimentalNoteVI}
                </>
              ) : (
                flameData.experimentalNoteVI
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
