// src/components/DebriefModal.tsx
import React from 'react';
import { BattleDebriefData } from '../domain/battleEngine';
import { sound } from '../audio/soundEngine';
import {
  Trophy,
  AlertTriangle,
  RotateCcw,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  XCircle,
  BookOpen
} from 'lucide-react';

interface DebriefModalProps {
  debrief: BattleDebriefData;
  onClose: () => void;
  onPlayAgain: () => void;
  onGoToSrs: () => void;
}

export const DebriefModal: React.FC<DebriefModalProps> = ({
  debrief,
  onClose,
  onPlayAgain,
  onGoToSrs
}) => {
  const isVictory = debrief.outcome === 'VICTORY';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-navy to-obsidian border border-navy-light rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Banner Header */}
        <div className="text-center space-y-2 border-b border-navy-light/40 pb-4">
          <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-copper/20 to-coral-reaction/20 border border-copper/50">
            {isVictory ? (
              <Trophy className="w-10 h-10 text-copper animate-bounce" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-coral-reaction" />
            )}
          </div>

          <h2 className={`font-serif text-3xl font-black tracking-wider ${isVictory ? 'text-copper' : 'text-coral-reaction'}`}>
            {isVictory ? 'CHIẾN THẮNG QUANH LIỆT!' : 'TRẬN ĐẤU KẾT THÚC'}
          </h2>
          <p className="text-xs text-ivory-muted max-w-md mx-auto">
            {isVictory
              ? 'Bạn đã vận dụng xuất sắc quy luật tuần hoàn và điều kiện phản ứng hóa học để khắc chế đối thủ!'
              : 'Đối thủ đã làm chủ điều kiện phản ứng tốt hơn. Đừng lo, mọi sai sót hôm nay sẽ được chuyển thành bài học ôn tập!'}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-ion/15 border border-cyan-ion/30 text-cyan-ion font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{debrief.xpGained} Knowledge XP Thu Thập Được</span>
          </div>
        </div>

        {/* Successful Reactions Section */}
        <div className="space-y-2">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-lime-mineral flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-lime-mineral" />
            <span>Các Phản Ứng Đã Kích Hoạt Thành Công ({debrief.successfulReactions.length})</span>
          </h3>

          {debrief.successfulReactions.length === 0 ? (
            <div className="p-3 rounded-xl bg-obsidian/40 border border-navy-light/30 text-xs text-ivory-muted italic text-center">
              Chưa kích hoạt thành công phản ứng nào trong trận.
            </div>
          ) : (
            <div className="space-y-2">
              {debrief.successfulReactions.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-lime-mineral/10 border border-lime-mineral/30 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ivory">{item.rule.name_vi}</span>
                    <span className="text-[10px] text-lime-mineral font-semibold">Lượt {item.turn} • {item.rule.thermodynamics === 'EXOTHERMIC' ? 'Tỏa nhiệt' : 'Thu nhiệt'}</span>
                  </div>
                  <div className="text-lime-mineral font-bold">{item.rule.equation}</div>
                  <p className="text-[11px] text-ivory-muted font-sans pt-1 border-t border-lime-mineral/20">
                    {item.rule.pedagogicalExplanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Failed Combinations & Scientific Guidance */}
        <div className="space-y-2">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-coral-reaction flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-coral-reaction" />
            <span>Nhật Ký Sai Sót & Hướng Dẫn Khoa Học ({debrief.failedCombinations.length})</span>
          </h3>

          {debrief.failedCombinations.length === 0 ? (
            <div className="p-3 rounded-xl bg-obsidian/40 border border-navy-light/30 text-xs text-lime-mineral text-center font-medium">
              Tuyệt đối hoàn hảo! Bạn không mắc phải sai sót hay bẫy nhận thức nào trong trận.
            </div>
          ) : (
            <div className="space-y-2">
              {debrief.failedCombinations.map((err, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-coral-reaction/10 border border-coral-reaction/30 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-coral-reaction">Tổ hợp: {err.symbolOrPair}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-coral-reaction/20 text-coral-reaction font-bold">
                      Cấp Độ {err.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-ivory font-sans">{err.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 border-t border-navy-light/40 pt-4">
          {debrief.failedCombinations.length > 0 && (
            <button
              onClick={() => {
                sound.playUiClick();
                onGoToSrs();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-copper to-coral-reaction text-white text-xs font-bold transition-all hover:scale-105"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tra Cứu Cẩm Nang Phản Ứng</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playUiClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-light hover:bg-navy-light/80 text-ivory text-xs font-semibold transition-all border border-cyan-ion/40 shadow-sm"
            title="Khởi tạo lại ván đấu bài chiến thuật TCG 8000 LP"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-ion" />
            <span>Tái Tạo Lại Trận Đấu</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-ion hover:bg-cyan-ion/90 text-obsidian text-xs font-bold transition-all shadow-md"
          >
            Về Sảnh Chính
          </button>
        </div>
      </div>
    </div>
  );
};
