// src/components/SettingsModal.tsx
import React, { useState } from 'react';
import { UserSettings, GameStorage, GraphicsQuality } from '../storage/localStore';
import { PlayerProfile } from '../domain/types';
import { sound } from '../audio/soundEngine';
import { DeckManagementService } from '../domain/deckManagement';
import { RankedSystem } from '../domain/rankedSystem';
import {
  Settings,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Trash2,
  X,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface SettingsModalProps {
  settings: UserSettings;
  profile: PlayerProfile;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onUpdateProfile: (newProfile: PlayerProfile) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  profile,
  onUpdateSettings,
  onUpdateProfile,
  onClose
}) => {
  const [volume, setVolume] = useState(settings.volume);
  const [isMuted, setIsMuted] = useState(settings.isMuted);
  const [reducedMotion, setReducedMotion] = useState(settings.reducedMotion);
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(settings.graphicsQuality || 'BALANCED');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    sound.setVolume(newVol);
    const updated = { ...settings, volume: newVol };
    onUpdateSettings(updated);
  };

  const handleMuteToggle = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sound.setMute(nextMute);
    const updated = { ...settings, isMuted: nextMute };
    onUpdateSettings(updated);
  };

  const handleExportData = () => {
    sound.playUiClick();
    const exportBundle = GameStorage.exportSaveBundle();
    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elementa_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg('Đã xuất file tiến trình thành công!');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const result = GameStorage.importSaveBundle(text);
        if (result.success) {
          const freshProfile = GameStorage.loadProfile();
          const freshSettings = GameStorage.loadSettings();
          onUpdateProfile(freshProfile);
          onUpdateSettings(freshSettings);
          setVolume(freshSettings.volume);
          setIsMuted(freshSettings.isMuted);
          setReducedMotion(freshSettings.reducedMotion);
          setGraphicsQuality(freshSettings.graphicsQuality || 'BALANCED');
          sound.playVictory();
          setStatusMsg('Nhập dữ liệu thành công!');
        } else {
          sound.playErrorFizzle();
          setStatusMsg(`Lỗi: ${result.error || 'Dữ liệu không hợp lệ!'}`);
        }
        setTimeout(() => setStatusMsg(null), 3500);
      } catch (err: any) {
        sound.playErrorFizzle();
        setStatusMsg('Lỗi: File dữ liệu không hợp lệ!');
        setTimeout(() => setStatusMsg(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('Cảnh báo: Toàn bộ tiến trình chơi, bộ bài và lịch CA-SRS sẽ bị xóa về trạng thái ban đầu. Bạn có chắc chắn không?')) {
      GameStorage.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-navy to-obsidian border border-navy-light rounded-2xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-light/40 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-ion" />
            <h3 className="font-serif text-lg font-bold text-ivory">Cài Đặt Hệ Thống & Lưu Trữ</h3>
          </div>
          <button
            onClick={() => {
              sound.playUiClick();
              onClose();
            }}
            className="p-1 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {statusMsg && (
          <div className="p-3 rounded-xl bg-cyan-ion/15 border border-cyan-ion/40 text-cyan-ion text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Audio Settings */}
        <div className="p-4 rounded-xl bg-obsidian border border-navy-light/60 space-y-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-copper flex items-center gap-2">
            <Sliders className="w-4 h-4 text-copper" />
            <span>Âm Lượng & Hiệu Ứng Âm Thanh</span>
          </h4>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleMuteToggle}
                className="p-2 rounded-lg bg-navy hover:bg-navy-light text-cyan-ion transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-coral-reaction" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-ivory font-mono">{isMuted ? 'Đang Tắt Tiếng' : `Âm Lượng: ${Math.round(volume * 100)}%`}</span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              disabled={isMuted}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-32 accent-cyan-ion"
            />
          </div>
        </div>

        {/* Accessibility Settings */}
        <div className="p-4 rounded-xl bg-obsidian border border-navy-light/60 space-y-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-lime-mineral">
            Tiếp Cận & Khả Năng Hiển Thị
          </h4>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-ivory font-semibold block">Giảm hiệu ứng chuyển động (Reduced Motion)</span>
              <span className="text-[10px] text-ivory-muted">Giảm rung lắc và hoạt ảnh khi chiến đấu</span>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => {
                const next = e.target.checked;
                setReducedMotion(next);
                onUpdateSettings({ ...settings, reducedMotion: next });
              }}
              className="w-4 h-4 accent-cyan-ion cursor-pointer"
            />
          </div>
        </div>

        {/* Graphics & Rendering Performance Profile */}
        <div className="p-4 rounded-xl bg-obsidian border border-navy-light/60 space-y-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-cyan-ion flex items-center justify-between">
            <span>Đồ Họa & Hiệu Năng 60 FPS</span>
            <span className="font-mono text-[10px] text-ivory-muted font-normal">Adaptive VFX</span>
          </h4>

          <div className="grid grid-cols-3 gap-2">
            {(['PERFORMANCE', 'BALANCED', 'ULTRA'] as const).map((q) => {
              const isSel = graphicsQuality === q;
              const labels = {
                PERFORMANCE: { name: 'Hiệu Năng', desc: '80 hạt VFX • Mượt mà' },
                BALANCED: { name: 'Cân Bằng', desc: '200 hạt • Mặc định' },
                ULTRA: { name: 'Tối Đa (Ultra)', desc: '350 hạt • Đầy đủ hiệu ứng' }
              }[q];

              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setGraphicsQuality(q);
                    onUpdateSettings({ ...settings, graphicsQuality: q });
                    sound.playUiClick();
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSel
                      ? 'bg-cyan-ion/20 border-cyan-ion text-cyan-ion shadow-md shadow-cyan-ion/20'
                      : 'bg-navy/70 border-navy-light/40 text-ivory-muted hover:border-navy-light hover:text-ivory'
                  }`}
                >
                  <div className="font-bold text-xs">{labels.name}</div>
                  <div className="text-[9px] opacity-80 mt-0.5">{labels.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Persistence & Backup */}
        <div className="p-4 rounded-xl bg-obsidian border border-navy-light/60 space-y-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-ivory">
            Quản Lý Tiến Trình (Offline LocalStorage)
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={handleExportData}
              className="p-2 rounded-xl bg-navy hover:bg-navy-light text-cyan-ion border border-cyan-ion/40 font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Dữ Liệu JSON</span>
            </button>

            <label className="p-2 rounded-xl bg-navy hover:bg-navy-light text-copper border border-copper/40 font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span>Nhập Dữ Liệu</span>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
          </div>

          <button
            onClick={handleResetData}
            className="w-full py-2 rounded-xl bg-coral-reaction/10 hover:bg-coral-reaction/20 text-coral-reaction border border-coral-reaction/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Khôi Phục Cài Đặt Gốc (Xóa Tiến Trình)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
