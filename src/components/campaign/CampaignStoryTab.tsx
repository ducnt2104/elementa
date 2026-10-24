// src/components/campaign/CampaignStoryTab.tsx
// Chemical Campaign & Story Conquest Mode (GDPT 2018 & IUPAC Compliant)

import React, { useState } from 'react';
import {
  Compass,
  Shield,
  Sword,
  Flame,
  Droplets,
  Gauge,
  Lock,
  Unlock,
  CheckCircle2,
  Award,
  ChevronRight,
  Play,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export interface CampaignStage {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  bossName: string;
  bossTitle: string;
  avatarBg: string;
  environmentHazard: {
    ph: number;
    temperatureK: number;
    pressureAtm: number;
    descriptionVI: string;
    combatModifierVI: string;
  };
  storyLoreVI: string;
  tacticalTipVI: string;
  rewardCardName: string;
  rewardCardId: string;
  fieldCardId?: string;
}

const CAMPAIGN_STAGES: CampaignStage[] = [
  {
    id: 'stage_1_acid_rain',
    chapterNumber: 1,
    title: 'Chương I: Hẻm Núi Mưa Axit Lưu Huỳnh',
    subtitle: 'Nồng độ ion H⁺ vượt ngưỡng cực hạn',
    bossName: 'Axiton — Chúa Tể Mưa Axit',
    bossTitle: 'H₂SO₄ Titan',
    avatarBg: 'from-red-600 to-amber-700',
    environmentHazard: {
      ph: 2.8,
      temperatureK: 298.15,
      pressureAtm: 1.0,
      descriptionVI: 'Cơn mưa axit pH 2.8 xối xả ăn mòn toàn bộ bề mặt kim loại trên đấu trường.',
      combatModifierVI: 'Quái Natri & Kim loại kiềm nhận +300 ATK nhưng bị giảm -200 DEF.'
    },
    storyLoreVI: 'Sau thảm họa xả thải công nghiệp khí SO₂ không qua xử lý, thung lũng bị bao phủ bởi làn mây axit dày đặc. Axiton canh giữ nguồn nước và đe dọa biến toàn bộ vùng đất thành sa mạc chua.',
    tacticalTipVI: 'Sử dụng thẻ Phép [Chuẩn Độ Trung Hòa] hoặc đá vôi CaCO₃ để triệt tiêu nồng độ H⁺ trước khi đối thủ bộc phát combo oxi hóa!',
    rewardCardName: 'Mưa Axit Khắc Nghiệt (Field Spell)',
    rewardCardId: 'card_field_acid_rain',
    fieldCardId: 'card_field_acid_rain'
  },
  {
    id: 'stage_2_volcano_thermite',
    chapterNumber: 2,
    title: 'Chương II: Miệng Núi Lửa Magma Rực Lửa',
    subtitle: 'Nhiệt luyện kim và phản ứng nhiệt nhôm 3000°C',
    bossName: 'Vulcanus — Hỏa Thần Dung Nham',
    bossTitle: 'Thermite Overlord',
    avatarBg: 'from-orange-600 to-red-800',
    environmentHazard: {
      ph: 7.0,
      temperatureK: 900.0,
      pressureAtm: 1.0,
      descriptionVI: 'Nhiệt độ môi trường lên tới 627°C (900 K), kích hoạt năng lượng hoạt hóa Ea của mọi phản ứng nung.',
      combatModifierVI: 'Toàn bộ quái thú hệ HỎA (PYRO) được tăng +350 ATK.'
    },
    storyLoreVI: 'Sâu trong lòng núi lửa Magma, Vulcanus sử dụng năng lượng nhiệt hạch tự nhiên để tôi luyện các hợp kim siêu cứng Al₂O₃ và Fe nóng chảy.',
    tacticalTipVI: 'Tận dụng quái thú Al và Fe₂O₃ trong Bộ Bài Phụ để triệu hồi dung hợp Hỏa Thần Nhiệt Nhôm Al₂O₃ tiêu diệt phòng tuyến địch!',
    rewardCardName: 'Miệng Núi Lửa Magma (Field Spell)',
    rewardCardId: 'card_field_volcanic_vent',
    fieldCardId: 'card_field_volcanic_vent'
  },
  {
    id: 'stage_3_cryo_freezing',
    chapterNumber: 3,
    title: 'Chương III: Hầm Lạnh Cryogenic Tuyệt Đối',
    subtitle: 'Đóng băng mạng tinh thể và phản ứng thu nhiệt',
    bossName: 'Glacies — Nữ Hoàng Băng Vĩnh Cửu',
    bossTitle: 'Cryo Sovereign',
    avatarBg: 'from-cyan-600 to-blue-800',
    environmentHazard: {
      ph: 7.0,
      temperatureK: 240.0,
      pressureAtm: 1.0,
      descriptionVI: 'Hầm lạnh -33°C (240 K) đóng băng chuyển động nhiệt của phân tử.',
      combatModifierVI: 'Quái thú hệ NƯỚC (AQUA) ngưng kết thành tinh thể băng, tăng +400 DEF.'
    },
    storyLoreVI: 'Glacies thống trị pháo đài băng tinh thể, có thể làm đông cứng thanh Mana của đối thủ bằng các dung môi lạnh sâu.',
    tacticalTipVI: 'Sử dụng các phản ứng tỏa nhiệt cực mạnh (ΔH << 0) để phá vỡ lớp giáp phòng thủ băng giá!',
    rewardCardName: 'Phòng Thí Nghiệm Lạnh Sâu (Field Spell)',
    rewardCardId: 'card_field_cryogenic_lab',
    fieldCardId: 'card_field_cryogenic_lab'
  },
  {
    id: 'stage_4_haber_chamber',
    chapterNumber: 4,
    title: 'Chương IV: Tháp Áp Suất Cao Haber-Bosch',
    subtitle: '200 atm và mạng xúc tác Sắt hoạt tính',
    bossName: 'Barometron — Đại Tướng Khí Nén',
    bossTitle: 'Haber-Bosch Synthesizer',
    avatarBg: 'from-purple-600 to-indigo-800',
    environmentHazard: {
      ph: 7.0,
      temperatureK: 723.15,
      pressureAtm: 200.0,
      descriptionVI: 'Buồng tổng hợp áp suất cực hạn 200 atm kèm lưới xúc tác Fe hoạt hóa bề mặt.',
      combatModifierVI: 'Áp suất cao thúc đẩy tổng hợp khí (+45% hiệu suất); xúc tác Fe tăng +150 ATK.'
    },
    storyLoreVI: 'Một cỗ máy tổng hợp khổng lồ thời kỳ công nghiệp hóa, có khả năng nén 4 thể tích khí thành 2 thể tích amoniac theo nguyên lý Le Chatelier.',
    tacticalTipVI: 'Triệu hồi liên kết Link-2 từ các nguyên tố khí H và N để chiếm ưu thế tuyệt đối trong môi trường nén!',
    rewardCardName: 'Lò Phản Ứng Haber-Bosch (Field Spell)',
    rewardCardId: 'card_field_haber_chamber',
    fieldCardId: 'card_field_haber_chamber'
  },
  {
    id: 'stage_5_buffer_sanctuary',
    chapterNumber: 5,
    title: 'Chương V: Đền Thờ Cân Bằng Hằng Định',
    subtitle: 'Hệ đệm Bicarbonate và thế cân bằng tuyệt đối',
    bossName: 'Equilibrion — Hiện Thân Cân Bằng Nhiệt Động',
    bossTitle: 'Grand Thermodynamic Arbiter',
    avatarBg: 'from-teal-600 to-emerald-800',
    environmentHazard: {
      ph: 7.4,
      temperatureK: 310.15,
      pressureAtm: 1.0,
      descriptionVI: 'Hệ đệm Bicarbonate sinh lý 4 tầng, hấp thụ mọi biến thiên pH đột ngột.',
      combatModifierVI: 'Kháng hoàn toàn các đòn sốc pH; đệm hấp thụ 75% sát thương ma pháp axit/bazơ.'
    },
    storyLoreVI: 'Vị thần tối cao bảo tồn định luật bảo toàn khối lượng và nguyên lý nhiệt động học. Chỉ những chiến thuật gia am hiểu sâu sắc bản chất liên kết hóa học mới có thể đánh bại ngài.',
    tacticalTipVI: 'Không phụ thuộc vào một loại nguyên tố đơn lẻ. Triệu hồi quái thú phức chất và hợp chất tinh khiết để phá vỡ thế cân bằng!',
    rewardCardName: 'Dung Dịch Đệm Bicarbonate (Field Spell)',
    rewardCardId: 'card_field_buffer_solution',
    fieldCardId: 'card_field_buffer_solution'
  },
  {
    id: 'stage_6_coordination_spire',
    chapterNumber: 6,
    title: 'Chương VI: Tháp Phối Trí Bát Diện Marie Curie',
    subtitle: 'Năng lượng trường tinh thể Δo và liên kết phối trí Alfred Werner',
    bossName: 'Viện Sĩ Marie Curie — Nữ Hoàng Phức Chất',
    bossTitle: 'Werner Coordination Grandmaster',
    avatarBg: 'from-fuchsia-600 to-purple-800',
    environmentHazard: {
      ph: 7.0,
      temperatureK: 298.15,
      pressureAtm: 1.0,
      descriptionVI: 'Điện trường bát diện đối xứng cực hạn, kích thích 6 liên kết phối trí NH₃ quanh lõi Co³⁺.',
      combatModifierVI: 'Toàn bộ quái thú Xyz và Phức chất tăng +400 ATK/DEF và nhận thêm 1 Nguyên Liệu Chồng Lớp (Overlay).'
    },
    storyLoreVI: 'Tại đài quan sát phóng xạ đỉnh cao, Viện Sĩ Marie Curie điều khiển các phức chất kim loại chuyển tiếp Co, Ni, Pt để tạo nên mạng lưới phòng thủ lập phương bất khả xâm phạm.',
    tacticalTipVI: 'Cẩn trọng với hiệu ứng Tách Nguyên Liệu Chồng Lớp (Detach Overlay Unit) tạo khiên miễn nhiễm sát thương của Hexammine Cobalt!',
    rewardCardName: 'Lưới Phối Tử Bát Diện Werner (Field Spell)',
    rewardCardId: 'card_field_octahedral_complex',
    fieldCardId: 'card_field_octahedral_complex'
  },
  {
    id: 'stage_7_zwitterion_rift',
    chapterNumber: 7,
    title: 'Chương VII: Khe Nứt Dao Động Đẳng Điện Dmitri Mendeleev',
    subtitle: 'Cổng Dao Động Thang Đo 1-8 và Đại Cầu Buckyball C₆₀',
    bossName: 'Đại Sư Hóa Học Dmitri Mendeleev — Chúa Tể Dao Động',
    bossTitle: 'Isoelectric Zwitterion Sovereign',
    avatarBg: 'from-amber-600 to-yellow-800',
    environmentHazard: {
      ph: 5.97,
      temperatureK: 300.0,
      pressureAtm: 1.0,
      descriptionVI: 'Điểm đẳng điện pI 5.97 kích hoạt điện trường lưỡng cực Zwitterion mở rộng biên độ thang đo.',
      combatModifierVI: 'Mở rộng Thang Đo Dao Động (Pendulum Scales) và cho phép rút 1 lá bài khi Triệu Hồi Dao Động thành công!'
    },
    storyLoreVI: 'Tọa lạc tại tâm điểm của Bảng Tuần Hoàn Nguyên Tố, Đại Sư Mendeleev sở hữu quyền năng cân bằng lưỡng tính tối thượng. Ngài sử dụng Thang Đo Dao Động Glycine và Glutamic Acid để triệu hồi hàng loạt quái thú và giáng lâm Đại Cầu Fullerene C₆₀.',
    tacticalTipVI: 'Phá hủy một trong hai Thang Đo Dao Động của Mendeleev ở cột 1 hoặc cột 5 bằng thẻ Phép Phản Ứng để phong tỏa khả năng Triệu Hồi Hàng Loạt!',
    rewardCardName: 'Cổng Dao Động Đẳng Điện pI (Field Spell)',
    rewardCardId: 'card_field_zwitterion_gate',
    fieldCardId: 'card_field_zwitterion_gate'
  }
];

interface CampaignStoryTabProps {
  completedStageIds?: string[];
  onStartStageDuel: (stage: CampaignStage) => void;
}

export const CampaignStoryTab: React.FC<CampaignStoryTabProps> = ({ completedStageIds = ['stage_1_acid_rain'], onStartStageDuel }) => {
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  const stage = CAMPAIGN_STAGES[selectedStageIdx];

  const handleLaunchDuel = () => {
    sound.playUiClick();
    onStartStageDuel(stage);
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-4 max-w-6xl mx-auto flex flex-col gap-4">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-navy/80 via-slate-900 to-navy/80 border border-teal-500/30 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-obsidian shadow-lg shadow-teal-500/30">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
              CHIẾN DỊCH CHINH PHỤC NGUYÊN TỐ (CAMPAIGN STORY)
            </h1>
            <p className="text-xs text-slate-400">
              Chinh phục 5 hẻm vực môi trường hóa học khắc nghiệt & đánh bại các Boss Thần Hóa Học
            </p>
          </div>
        </div>

        {/* Campaign Completion Progress */}
        <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-teal-500/40">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300">Tiến Độ Chinh Phục:</span>
          <span className="text-sm font-black font-mono text-teal-300">
            {completedStageIds.length} / {CAMPAIGN_STAGES.length} Chương
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Chapters Stage Selector (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chọn Vùng Đất Môi Trường:</span>
          <div className="flex flex-col gap-2.5">
            {CAMPAIGN_STAGES.map((s, idx) => {
              const isSelected = idx === selectedStageIdx;
              const isCompleted = completedStageIds.includes(s.id);
              const isLocked = idx > completedStageIds.length;

              return (
                <button
                  key={s.id}
                  disabled={isLocked}
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedStageIdx(idx);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-teal-950/50 border-teal-400 shadow-lg shadow-teal-950/50 scale-102'
                      : isLocked
                      ? 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.avatarBg} flex items-center justify-center font-bold text-xs text-white shadow`}
                    >
                      CH {s.chapterNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{s.title.split(':')[1] || s.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">{s.bossName}</p>
                    </div>
                  </div>

                  <div>
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-slate-600" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-teal-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stage Briefing, Boss Info & Launch (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-4">
            {/* Stage Title & Subtitle */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-teal-950 border border-teal-500/50 text-teal-300">
                  CHƯƠNG {stage.chapterNumber}
                </span>
                <h2 className="text-xl font-black text-white mt-1.5">{stage.title}</h2>
                <p className="text-xs text-slate-400">{stage.subtitle}</p>
              </div>

              {/* Boss Avatar Pill */}
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">ĐỐI THỦ TRÙM CUỐI</span>
                <span className="text-xs font-black text-rose-300">{stage.bossName}</span>
                <span className="text-[10px] text-slate-400 block">({stage.bossTitle})</span>
              </div>
            </div>

            {/* Environmental Conditions Telemetry */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-rose-400">
                  <Droplets className="w-4 h-4" />
                  <span>pH: <strong className="font-mono text-white">{stage.environmentHazard.ph.toFixed(1)}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span>Nhiệt độ: <strong className="font-mono text-white">{(stage.environmentHazard.temperatureK - 273.15).toFixed(0)}°C</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-400">
                  <Gauge className="w-4 h-4" />
                  <span>Áp suất: <strong className="font-mono text-white">{stage.environmentHazard.pressureAtm.toFixed(1)} atm</strong></span>
                </div>
              </div>
            </div>

            {/* Environmental Hazard & Combat Modifier */}
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Hiểm Họa Môi Trường:</span>
              </div>
              <p className="text-rose-100">{stage.environmentHazard.descriptionVI}</p>
              <p className="text-amber-300 font-semibold mt-1">▶ {stage.environmentHazard.combatModifierVI}</p>
            </div>

            {/* Story Lore */}
            <div className="text-xs text-slate-300 leading-relaxed p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 font-bold block mb-1">Bối cảnh lịch sử hóa học:</span>
              {stage.storyLoreVI}
            </div>

            {/* Tactical Advice */}
            <div className="text-xs p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/40 text-cyan-200">
              <span className="text-cyan-300 font-bold flex items-center gap-1 mb-0.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                Gợi Ý Chiến Thuật Đối Kháng:
              </span>
              {stage.tacticalTipVI}
            </div>

            {/* Reward Card & Launch Duel Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-400">Phần Thưởng Vượt Màn:</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950 border border-amber-500/50 text-amber-300">
                  {stage.rewardCardName}
                </span>
              </div>

              <button
                onClick={handleLaunchDuel}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-obsidian font-black text-xs shadow-lg shadow-teal-500/30 flex items-center gap-2 transition-all transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-obsidian" />
                <span>BẮT ĐẦU KHIÊU CHIẾN BOSS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
