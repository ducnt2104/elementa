// src/components/visualizations/ElectronMicroscopyVisualizer.tsx
// Milestone 52: Scanning Electron Microscopy (SEM), Transmission Electron Microscopy (TEM) & De Broglie Wavelength Visualizer
// Standards: Nobel Prize in Physics 1929 (Louis de Broglie) & Nobel Prize in Physics 1986 (Ernst Ruska)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề: Sóng de Broglie & Kính hiển vi điện tử; Hóa học 12: Vật liệu Nano Carbon)

import React, { useState } from 'react';
import {
  NANOMATERIAL_CATALOG,
  MicroscopeMode,
  simulateElectronMicroscopy,
} from '../../domain/electronMicroscopyEngine';
import { sound } from '../../audio/soundEngine';
import {
  Eye,
  Zap,
  Activity,
  Layers,
  Sliders,
  Info,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Award,
  Thermometer,
  Radio,
  Search,
  Focus,
  Atom
} from 'lucide-react';

export interface ElectronMicroscopyVisualizerProps {
  initialSpecimenId?: string;
}

export const ElectronMicroscopyVisualizer: React.FC<ElectronMicroscopyVisualizerProps> = ({
  initialSpecimenId,
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(initialSpecimenId || 'multi_walled_cnt');
  const [voltageKv, setVoltageKv] = useState<number>(200.0);
  const [magnification, setMagnification] = useState<number>(250000);
  const [microscopeMode, setMicroscopeMode] = useState<MicroscopeMode>('TEM_HRTEM');
  const [activeTab, setActiveTab] = useState<'microscope_column_optics' | 'lattice_fringe_simulation' | 'interaction_volume_monte_carlo' | 'de_broglie_nobel_gdpt'>('lattice_fringe_simulation');

  const simResult = simulateElectronMicroscopy(
    selectedSpecimenId,
    microscopeMode,
    voltageKv,
    magnification
  );

  const handleSpecimenChange = (id: string) => {
    setSelectedSpecimenId(id);
    const spec = NANOMATERIAL_CATALOG[id];
    setVoltageKv(spec.recommendedVoltageKv);
    sound.playElectronBeamSweepScan();
  };

  const handleVoltageChange = (val: number) => {
    setVoltageKv(val);
    sound.playElectronBeamSweepScan();
  };

  const handleModeChange = (mode: MicroscopeMode) => {
    setMicroscopeMode(mode);
    if (mode === 'TEM_HRTEM') {
      sound.playAtomicLatticeLockTone();
    } else {
      sound.playElectronBeamSweepScan();
    }
  };

  const handleFocusAction = () => {
    sound.playAtomicLatticeLockTone();
  };

  return (
    <div className="w-full bg-navy/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header with Nobel Badges & GDPT 2018 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Eye className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Kính Hiển Vi Điện Tử SEM / TEM & Sóng de Broglie
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono">
                Nobel Vật Lý 1929 & 1986 • Vật lí 12 Chuyên đề
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory-muted">
            Bước sóng vật chất electron λ = h/p co ngắn picometer, Quang sai cầu Scherzer & Chụp ảnh vân mạng nguyên tử 0.34 nm.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-navy-dark/60 border border-cyan-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono">
            {simResult.mode} • λ = {simResult.electronWavelengthPicometers} pm
          </span>
        </div>
      </div>

      {/* 2. Specimen Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(NANOMATERIAL_CATALOG).map((spec) => {
          const isSelected = spec.id === selectedSpecimenId;
          return (
            <button
              key={spec.id}
              onClick={() => handleSpecimenChange(spec.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/10'
                  : 'bg-navy-dark/40 border-navy-light/30 hover:bg-navy-light/20 hover:border-cyan-500/30'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-1.5 py-0.5 rounded bg-black/40 text-cyan-300">
                  {spec.materialClassVI.split(' ')[0]}
                </span>
                <p className="font-semibold text-xs text-white mt-1 line-clamp-1">{spec.nameVI.split('(')[0]}</p>
              </div>
              <div className="text-[11px] text-ivory-muted mt-2 flex justify-between items-center font-mono">
                <span>{spec.chemicalFormula.split(' ')[0]}</span>
                <span className="text-cyan-300 font-bold">{spec.typicalFeatureSizeNm} nm</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Atom className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Bước Sóng de Broglie (λ)</p>
            <p className="text-base sm:text-lg font-bold font-mono text-cyan-300">
              {simResult.electronWavelengthPicometers} <span className="text-xs text-ivory-muted">pm</span>
            </p>
            <p className="text-[10px] text-ivory-muted">{simResult.electronWavelengthAngstrom} Å ({simResult.wavelengthRatioVsGreenLight.toLocaleString()}x &lt; Ánh sáng)</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Vận Tốc Tương Đối Tính</p>
            <p className="text-base sm:text-lg font-bold font-mono text-blue-300">
              {(simResult.electronVelocityFractionOfC * 100).toFixed(1)}% <span className="text-xs text-ivory-muted">c</span>
            </p>
            <p className="text-[10px] text-ivory-muted">Thế gia tốc: {voltageKv} kV</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Focus className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Độ Phân Giải Scherzer</p>
            <p className="text-base sm:text-lg font-bold font-mono text-emerald-300">
              {simResult.scherzerResolutionAngstrom} <span className="text-xs text-ivory-muted">Å</span>
            </p>
            <p className="text-[10px] text-ivory-muted">Giới hạn quang học: 200 nm</p>
          </div>
        </div>

        <div className="bg-navy-dark/70 border border-navy-light/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-ivory-muted font-medium">Độ Phóng Đại Hiện Tại</p>
            <p className="text-base sm:text-lg font-bold font-mono text-purple-300">
              {magnification.toLocaleString()}x
            </p>
            <p className="text-[10px] text-ivory-muted">Vùng xuyên sâu: ~{simResult.interactionDepthMicrons} µm</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Navigation Tabs */}
      <div className="flex border-b border-navy-light/30 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('lattice_fringe_simulation')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'lattice_fringe_simulation'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Atom className="w-3.5 h-3.5" />
          Thị Kính HRTEM & Vân Mạng Tinh Thể Nguyên Tử
        </button>

        <button
          onClick={() => setActiveTab('microscope_column_optics')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'microscope_column_optics'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Cột Quang Học Điện Tử & Thấu Kính Từ Trường
        </button>

        <button
          onClick={() => setActiveTab('interaction_volume_monte_carlo')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'interaction_volume_monte_carlo'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Vùng Tương Tác Giọt Nước Monte Carlo (SE vs BSE)
        </button>

        <button
          onClick={() => setActiveTab('de_broglie_nobel_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'de_broglie_nobel_gdpt'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Giải Nobel Vật Lý 1929 & 1986 (de Broglie & Ernst Ruska)
        </button>
      </div>

      {/* 5. Main Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Interactive Visualizations */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'lattice_fringe_simulation' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Focus className="w-4 h-4 text-cyan-400" />
                    Thị Kính Kính Hiển Vi HRTEM (Độ Phân Giải Từng Hàng Nguyên Tử)
                  </h3>
                  <p className="text-[11px] text-ivory-muted">
                    Vân giao thoa pha mạng tinh thể (Lattice fringes) hiện rõ với khoảng cách đúng d = {simResult.specimen.latticeSpacingNm || 0.34} nm.
                  </p>
                </div>

                <button
                  onClick={handleFocusAction}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-600/30 transition-all"
                >
                  <Focus className="w-3.5 h-3.5" /> Khóa Tiêu Cự Nguyên Tử
                </button>
              </div>

              {/* High Resolution Simulated Viewport */}
              <div className="w-full h-72 sm:h-80 bg-black rounded-xl border border-cyan-500/50 p-4 relative flex flex-col justify-between overflow-hidden shadow-2xl">
                {/* Circular Viewport Aperture */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none z-10"></div>

                {/* Simulated Atomic Columns / Lattice Grating */}
                <div className="absolute inset-4 flex items-center justify-center overflow-hidden opacity-90">
                  <div className="w-full h-full flex flex-col justify-around py-4">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
                      <div
                        key={i}
                        className="w-full flex justify-around items-center"
                        style={{
                          height: '2px',
                          backgroundColor: microscopeMode === 'SEM_BSE' ? '#ffffff' : '#38bdf8',
                          opacity: i % 2 === 0 ? 0.9 : 0.4,
                          boxShadow: '0 0 6px rgba(56, 189, 248, 0.6)',
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Viewport Scale Bar & Reticle */}
                <div className="z-20 flex justify-between items-center text-[10px] font-mono text-cyan-300 bg-black/60 px-3 py-1.5 rounded-lg border border-navy-light/30">
                  <span>Mẫu: {simResult.specimen.chemicalFormula}</span>
                  <span>Chế độ: {simResult.mode}</span>
                  <span className="font-bold">U = {voltageKv} kV (λ = {simResult.electronWavelengthPicometers} pm)</span>
                </div>

                {/* Scale Bar at Bottom Right */}
                <div className="z-20 flex justify-between items-end">
                  <div className="text-[10px] font-mono text-ivory-muted bg-black/60 p-2 rounded border border-navy-light/30">
                    <div>Khoảng cách mặt mạng d: <strong className="text-white">{simResult.specimen.latticeSpacingNm || 0.34} nm</strong></div>
                    <div>Độ tương phản: <span className="text-cyan-300">{simResult.contrastMechanismVI}</span></div>
                  </div>

                  <div className="flex flex-col items-end gap-1 bg-black/60 p-2 rounded border border-navy-light/30 font-mono">
                    <span className="text-xs font-bold text-white">1 nm</span>
                    <div className="w-16 h-1 bg-white border border-black shadow"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'microscope_column_optics' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Sơ Đồ Cột Quang Học Điện Tử (Electron Optical Column)
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Súng phát xạ trường FEG, thấu kính từ trường ngưng tụ, cuộn quét lệch hướng và cảm biến điện tử.
                </p>
              </div>

              {/* Column Schematic */}
              <div className="w-full h-72 sm:h-80 bg-black/40 rounded-xl border border-navy-light/20 p-4 relative flex flex-col justify-between overflow-hidden">
                <div className="space-y-3 z-10 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between">
                    <span className="text-cyan-300 font-bold">1. Súng Phát Xạ Trường FEG (Cathode Emitter)</span>
                    <span className="text-white">{voltageKv} kV (Tạo chùm electron cực mảnh)</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/40 flex items-center justify-between">
                    <span className="text-blue-300 font-bold">2. Thấu Kính Từ Trường (Electromagnetic Lenses)</span>
                    <span className="text-ivory-muted">Cuộn dây đồng hội tụ bằng lực Lorentz F = q(v × B)</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/40 flex items-center justify-between">
                    <span className="text-purple-300 font-bold">3. Cuộn Quét Quét Chùm Tia (Scan Coils)</span>
                    <span className="text-ivory-muted">Quét mành (Raster sweep) đồng bộ màn hình</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                    <span className="text-emerald-300 font-bold">4. Buồng Mẫu & Đầu Dò (Detectors)</span>
                    <span className="text-emerald-200">SE (Topography) | BSE (Z-Contrast) | TEM (Lattice)</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/60 border border-cyan-500/30 text-center font-mono text-xs text-cyan-200">
                  Áp suất chân không siêu cao: <strong className="text-white">P &lt; 10⁻⁷ Pa</strong> (Loại bỏ va chạm với phân tử khí)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interaction_volume_monte_carlo' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Vùng Tương Tác Giọt Nước Monte Carlo (Electron-Matter Interaction Volume)
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Độ sâu thoát của các tín hiệu vật lý khi chùm electron bắn phá mẫu chất rắn.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-black/30 border border-teal-500/30">
                  <div className="flex justify-between font-bold text-teal-300">
                    <span>1. Electron Auger (0 - 2 nm)</span>
                    <span className="font-mono">Cực nông bề mặt</span>
                  </div>
                  <p className="text-ivory-muted mt-1">Phân tích thành phần nguyên tố vài lớp đơn nguyên tử bề mặt.</p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-sky-500/30">
                  <div className="flex justify-between font-bold text-sky-300">
                    <span>2. Electron Thứ Cấp SE (5 - 10 nm)</span>
                    <span className="font-mono">Độ phân giải cao</span>
                  </div>
                  <p className="text-ivory-muted mt-1">
                    Cung cấp ảnh hình thái học 3D bề mặt sắc nét với độ sâu trường ảnh tuyệt vời.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-purple-500/30">
                  <div className="flex justify-between font-bold text-purple-300">
                    <span>3. Electron Tán Xạ Ngược BSE (0.5 - 1.5 µm)</span>
                    <span className="font-mono">Tương phản Z</span>
                  </div>
                  <p className="text-ivory-muted mt-1">
                    Tán xạ đàn hồi với hạt nhân nguyên tử. Nguyên tố nặng (Z cao như Au Z=79) tán xạ mạnh hơn nhiều so với C (Z=6), tạo ảnh tương phản sáng tối theo thành phần hóa học.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-amber-500/30">
                  <div className="flex justify-between font-bold text-amber-300">
                    <span>4. Tia X Đặc Trưng EDX (1 - 3 µm)</span>
                    <span className="font-mono">Định lượng nguyên tố</span>
                  </div>
                  <p className="text-ivory-muted mt-1">Xác định phổ năng lượng phân tích hàm lượng định lượng mọi nguyên tố trong bảng tuần hoàn.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'de_broglie_nobel_gdpt' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Giải Nobel Vật Lý 1929 & 1986: Từ Giả Thuyết Sóng Vật Chất Đến Cách Mạng Kính Hiển Vi
                </h3>
                <p className="text-[11px] text-ivory-muted">
                  Louis de Broglie đặt nền móng cơ học sóng, Ernst Ruska hiện thực hóa thành thấu kính từ trường.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-cyan-300">1. Giả Thuyết Bước Sóng de Broglie (Nobel 1929)</h4>
                  <p className="text-ivory-muted mt-1">
                    Mọi hạt vi mô có động lượng p đều có tính chất sóng với bước sóng <span className="font-mono text-white">λ = h / p</span>. Electron gia tốc ở hiệu điện thế hàng trăm kilovolt có bước sóng cỡ picometer, ngắn hơn bước sóng ánh sáng nhìn thấy hàng trăm nghìn lần.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30 border border-navy-light/20">
                  <h4 className="font-bold text-blue-300">2. Ernst Ruska & Kính Hiển Vi Điện Tử Đầu Tiên (Nobel 1986)</h4>
                  <p className="text-ivory-muted mt-1">
                    Nhận thấy thấu kính thủy tinh không thể khúc xạ chùm electron, Ernst Ruska phát minh ra thấu kính từ trường sử dụng lực từ Lorentz để bẻ cong quỹ đạo electron, chế tạo kính hiển vi điện tử đầu tiên năm 1931 vượt qua giới hạn phóng đại của quang học.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pedagogical Analysis Card */}
          <div className="p-3.5 rounded-xl bg-navy-dark/90 border border-cyan-500/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Info className="w-3.5 h-3.5" /> Phân Tích Sư Phạm & Quang Học Điện Tử Tương Đối Tính:
            </div>
            <p className="text-ivory-muted text-[11px] leading-relaxed">
              {simResult.pedagogicalAnalysisVI}
            </p>
          </div>
        </div>

        {/* Right Column (1/3): Interactive Controls & Sliders */}
        <div className="space-y-4">
          <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-5">
            <div className="flex items-center gap-2 border-b border-navy-light/30 pb-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Bảng Điều Khiển Kính Hiển Vi</h3>
            </div>

            {/* Microscope Mode Selector */}
            <div className="space-y-1.5">
              <span className="text-xs text-ivory-muted">Chế độ hiển vi:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { mode: 'SEM_SE' as MicroscopeMode, label: 'SEM (Địa hình SE)' },
                  { mode: 'SEM_BSE' as MicroscopeMode, label: 'SEM (Z-BSE)' },
                  { mode: 'TEM_BF' as MicroscopeMode, label: 'TEM (Trường sáng)' },
                  { mode: 'TEM_HRTEM' as MicroscopeMode, label: 'TEM (Vân mạng HR)' },
                ].map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => handleModeChange(item.mode)}
                    className={`p-1.5 rounded-lg border text-left text-[11px] font-bold transition-all ${
                      microscopeMode === item.mode
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-navy-light/10 border-navy-light/30 text-ivory-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Accelerating Voltage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Thế gia tốc (U):</span>
                <span className="font-mono text-cyan-300 font-bold">{voltageKv} kV</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={voltageKv}
                onChange={(e) => handleVoltageChange(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>5 kV (SEM)</span>
                <span>80 kV</span>
                <span>300 kV (Cryo-TEM)</span>
              </div>
            </div>

            {/* Slider 2: Magnification */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ivory-muted">Hệ số phóng đại:</span>
                <span className="font-mono text-purple-300 font-bold">{magnification.toLocaleString()}x</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={magnification}
                onChange={(e) => setMagnification(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                <span>10,000x</span>
                <span>250,000x</span>
                <span>1,000,000x (Nguyên tử)</span>
              </div>
            </div>

            {/* Spec Details Card */}
            <div className="space-y-2 pt-2 border-t border-navy-light/30">
              <h4 className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">Thông Số Mẫu Nano</h4>
              <div className="text-[11px] space-y-1.5 font-mono text-ivory-muted bg-black/30 p-3 rounded-xl border border-navy-light/20">
                <div className="flex justify-between">
                  <span>Kích thước đặc trưng:</span>
                  <span className="text-white font-bold">{simResult.specimen.typicalFeatureSizeNm} nm</span>
                </div>
                <div className="flex justify-between">
                  <span>Khoảng cách mạng d:</span>
                  <span className="text-cyan-300 font-bold">{simResult.specimen.latticeSpacingNm || 'N/A'} nm</span>
                </div>
                <div className="flex justify-between">
                  <span>Số hiệu nguyên tử Z:</span>
                  <span className="text-white font-bold">{simResult.specimen.atomicNumberZ}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phân lớp vật liệu:</span>
                  <span className="text-emerald-300 font-bold">{simResult.specimen.materialClassVI.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
