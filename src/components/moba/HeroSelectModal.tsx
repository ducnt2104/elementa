// src/components/moba/HeroSelectModal.tsx
// Hero Draft & Match Configuration Modal for ELEMENTA MOBA Arena
// Features 12 IUPAC Champions, Role & Element Filters, Mode Selection, In-Depth Skill Inspection, Tactical Combos & Summoner Spell Loadout

import React, { useState, useMemo } from 'react';
import { HeroDefinition, MobaGameMode } from '../../game/types';
import { HEROES_CATALOG } from '../../game/data/heroesData';
import { BotDifficulty } from '../../game/ai/mobaBotAi';
import { sound } from '../../audio/soundEngine';
import { ElementalCrest } from '../../assets/svg/ElementalCrests';
import {
  Shield,
  Zap,
  Sword,
  Crosshair,
  Sparkles,
  Bot,
  Play,
  FlaskConical,
  Flame,
  Droplets,
  Layers,
  ChevronRight,
  Info,
  Users,
  Search,
  Filter,
  Activity,
  Target,
  Compass,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Lock
} from 'lucide-react';

interface HeroSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMatch: (selectedHeroId: string, mode: MobaGameMode, difficulty: BotDifficulty) => void;
  unlockedHeroIds?: string[];
  onOpenShop?: () => void;
}

type RoleFilter = 'ALL' | 'TANK' | 'FIGHTER' | 'MAGE' | 'MARKSMAN' | 'SUPPORT' | 'ASSASSIN';

export interface SummonerSpellDef {
  id: string;
  name: string;
  keySlot: 'D' | 'F';
  cooldown: number;
  description: string;
  iconBg: string;
}

export const SUMMONER_SPELLS_CATALOG: { D: SummonerSpellDef[]; F: SummonerSpellDef[] } = {
  D: [
    {
      id: 'flash',
      name: 'Tốc Biến (Flash)',
      keySlot: 'D',
      cooldown: 120,
      description: 'Dịch chuyển tức thời nhân vật 400px về hướng con trỏ chuột.',
      iconBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    {
      id: 'ghost',
      name: 'Tăng Tốc (Ghost)',
      keySlot: 'D',
      cooldown: 90,
      description: 'Tăng 35% tốc độ di chuyển và xuyên qua lính trong 10 giây.',
      iconBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    },
    {
      id: 'smite',
      name: 'Trừng Phạt (Smite)',
      keySlot: 'D',
      cooldown: 60,
      description: 'Gây 450 sát thương chuẩn ngay lập tức lên quái rừng hoặc lính địch.',
      iconBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    }
  ],
  F: [
    {
      id: 'heal',
      name: 'Hồi Phục (Heal)',
      keySlot: 'F',
      cooldown: 90,
      description: 'Hồi 240 (+25/cấp) Máu cho bản thân và tăng 20% tốc độ chạy trong 1.5 giây.',
      iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'exhaust',
      name: 'Kiệt Sức (Exhaust)',
      keySlot: 'F',
      cooldown: 105,
      description: 'Làm chậm mục tiêu 30% và giảm 35% sát thương đầu ra của đối thủ trong 3 giây.',
      iconBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    },
    {
      id: 'cleanse',
      name: 'Thanh Tẩy (Cleanse)',
      keySlot: 'F',
      cooldown: 110,
      description: 'Hóa giải mọi hiệu ứng khống chế bất lợi và tăng 65% kháng hiệu ứng trong 3 giây.',
      iconBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    }
  ]
};

const CHAMPION_TACTICAL_GUIDES: Record<string, { combo: string; tip: string; bestWith: string; counters: string }> = {
  hero_na_brawler: {
    combo: 'W (Hào Quang Xút) ➔ Q (Thủy Kích Đẩy Lùi) ➔ Đánh Thường (Nội Tại Kiềm) ➔ R (Natri Nóng Chảy)',
    tip: 'Tiếp cận trước bằng W để làm chậm và bào giáp, sau đó tung Q đẩy lùi kẻ địch vào góc tường hoặc lính.',
    bestWith: 'Clo (Cl) tạo muối NaCl bảo vệ, Oxy (O) gia tăng phản ứng nhiệt tỏa mạnh.',
    counters: 'Hiệu quả cao khi đè đường tướng cận chiến máu mỏng; cẩn trọng trước Pháp Sư khống chế tầm xa.'
  },
  hero_fe_juggernaut: {
    combo: 'Q (Chém Oxi Hóa tích gỉ sét) ➔ W (Khiên Từ Trường Fe₃O₄) ➔ E (Cường Hóa Kim Loại) ➔ R (Từ Trường Sắt Giam Cầm)',
    tip: 'Tận dụng lượng máu và giáp hộ mệnh để tiên phong mở giao tranh. Giữ chiêu cuối R để bắt gọn xạ thủ đối phương.',
    bestWith: 'Oxy (O) kích hoạt gỉ sét DoT Fe₂O₃, Nhôm (Al) kích nổ Nhiệt Nhôm siêu nhiệt.',
    counters: 'Khắc chế mạnh các Sát Thủ vật lý nhờ giáp dày; dễ bị thả diều bởi tướng cơ động có tầm đánh xa.'
  },
  hero_cl_toxic_mage: {
    combo: 'Q (Phun Khí Clo độc ăn mòn diện rộng) ➔ E (Tẩy Màu Axit làm mù) ➔ W (Muối Clorua) ➔ R (Bão Tẩy Trắng Halogen)',
    tip: 'Duy trì khoảng cách tối đa. Đặt Q chặn đường rút lui của địch trước khi xả chiêu cuối bão clo diện rộng.',
    bestWith: 'Natri (Na) tạo kết tủa muối, Hydro (H) tạo axit HCl siêu ăn mòn.',
    counters: 'Rất mạnh trong việc cấu rỉa và đẩy lính; dễ tổn thương trước sát thủ áp sát bất ngờ.'
  },
  hero_cu_conduit: {
    combo: 'E (Quăng Dây Đồng tiếp cận) ➔ W (Dẫn Nhiệt Điện tích tụ) ➔ Q (Chém Ion Đồng Cu²⁺) ➔ R (Lưới Đồng Tinh Luyện)',
    tip: 'Dùng E để vượt địa hình hoặc tiếp cận chủ lực đối phương, sau đó kích hoạt W để gia tăng tốc đánh.',
    bestWith: 'Clo (Cl) và Lưu Huỳnh (S) tạo phức chất bán dẫn.',
    counters: 'Đấu tay đôi 1v1 vượt trội nhờ tốc độ đánh; cần chú ý né các hiệu ứng khống chế cứng.'
  },
  hero_al_striker: {
    combo: 'W (Màng Oxit Al₂O₃ phản đòn) ➔ Q (Cú Đấm Nhiệt Nhôm) ➔ E (Hợp Kim Duralumin) ➔ R (Nhiệt Nhôm Hủy Diệt)',
    tip: 'Bật W trước khi lao vào để chặn sát thương dồn, sau đó dùng R gây sát thương chuẩn diện rộng.',
    bestWith: 'Sắt (Fe) kích hoạt phản ứng Nhiệt Nhôm Al + Fe₂O₃ tỏa nhiệt 2000°C.',
    counters: 'Rất cơ động và sát thương bùng nổ cao; chú ý quản lý năng lượng khi tung combo liên tục.'
  },
  hero_o_aeromancer: {
    combo: 'W (Khí Quyển Oxi Hóa) ➔ Q (Tia Cháy Sinh Khí) ➔ E (Lá Chắn Khí Ozon O₃) ➔ R (Bão Lửa Siêu Nhiệt)',
    tip: 'Sử dụng Ozon E để bảo vệ đồng đội yếu máu, đồng thời duy trì Q để cấu rỉa liên tục từ xa.',
    bestWith: 'Hydro (H) tạo H₂O hồi phục và bão hơi nước; Natri (Na) tạo phản ứng cháy kiềm.',
    counters: 'Hỗ trợ giao tranh tổng tuyệt vời; cần người đi kèm bảo kê khi bị đối thủ áp sát.'
  },
  hero_h_fusion_marksman: {
    combo: 'Q (Tia Hydro H⁺ xuyên thấu) ➔ W (Bay Lượn Khí Nhẹ tăng tốc) ➔ Đánh thường dồn sát thương ➔ R (Bùng Nổ Nhiệt Hạch)',
    tip: 'Giữ vị trí ở rìa giao tranh. Tận dụng tầm bắn xa nhất game và chiêu W để thả diều kẻ địch đuổi theo.',
    bestWith: 'Oxy (O) và Canxi (Ca) bảo kê tạo vùng an toàn.',
    counters: 'Sát thương cuối trận hủy diệt; giai đoạn đầu trận cần tập trung tích lũy vàng mua trang bị.'
  },
  hero_ba_bastion: {
    combo: 'W (Bức Tường BaSO₄ Bất Tử) ➔ Q (Đập Búa Trầm Tích) ➔ E (Hào Quang Lục Bảo) ➔ R (Đại Địa Chấn Kiềm Thổ)',
    tip: 'Chặn đứng mọi kỹ năng định hướng của đối thủ bằng tường BaSO₄, tạo tiền đề cho đồng đội xả sát thương.',
    bestWith: 'Lưu Huỳnh (S) kích hoạt kết tủa vĩnh cửu BaSO₄.',
    counters: 'Khắc chế hoàn toàn các tướng cấu rỉa tầm xa; di chuyển tương đối chậm.'
  },
  hero_c_allotrope_assassin: {
    combo: 'E (Lướt Ống Nanotube áp sát) ➔ Q (Chém Than Chì làm chậm) ➔ W (Hóa Cương Kim Cương) ➔ R (Hóa Thạch Kim Cương)',
    tip: 'Ẩn nấp trong bụi cỏ, chờ chủ lực đối phương sơ hở rồi dùng E lướt tới kết liễu bằng R chớp nhoáng.',
    bestWith: 'Hydro (H) và Oxy (O) tạo chuỗi phản ứng hữu cơ phân rã.',
    counters: 'Ám sát mục tiêu đơn lẻ xuất sắc; cần tính toán thời điểm rút lui cẩn thận.'
  },
  hero_s_pyroclast: {
    combo: 'Q (Khí SO₂ làm cay mắt & choáng) ➔ W (Lưu Huỳnh Nóng Chảy) ➔ E (Axit H₂SO₄ ăn mòn giáp) ➔ R (Hỏa Diệm Sơn)',
    tip: 'Tạo vùng dung nham lưu huỳnh khống chế khu vực mục tiêu lớn (Rồng, Baron) khiến đối phương không dám tiến vào.',
    bestWith: 'Bari (Ba) và Sắt (Fe) tạo kết tủa và ăn mòn hóa học.',
    counters: 'Sát thương DoT và kiểm soát diện rộng vượt trội; cần giữ vị trí không bị bắt lẻ.'
  },
  hero_ca_sentinel: {
    combo: 'W (Tôi Vôi Tỏa Nhiệt tạo Ca(OH)₂) ➔ Q (Cú Húc Đá Vôi CaCO₃) ➔ E (Khung Xương Canxi) ➔ R (Địa Chấn Vôi Hóa)',
    tip: 'Mở giao tranh bằng cú húc Q hất tung, sau đó dùng W tôi vôi gây sát thương tỏa nhiệt và hồi phục cho bản thân.',
    bestWith: 'Cacbon (C) tạo đá vôi CaCO₃ bất hoại.',
    counters: 'Khả năng càn quét và hồi phục trụ đường cực mạnh.'
  },
  hero_n_cryo_stalker: {
    combo: 'W (Phun Nitơ Lỏng Đóng Băng) ➔ Q (Mũi Tên Amoniac NH₃) ➔ E (Khí Cười N₂O gây hoang mang) ➔ R (Vụ Nổ Haber-Bosch)',
    tip: 'Đóng băng mục tiêu bằng W trước, sau đó kích hoạt R vụ nổ Haber-Bosch với áp suất cực đại để dồn sát thương sốc.',
    bestWith: 'Hydro (H) kích hoạt chuỗi Haber-Bosch.',
    counters: 'Khống chế diện rộng và đóng băng liên tục; đòi hỏi tung kỹ năng định hướng chính xác.'
  }
};

export const HeroSelectModal: React.FC<HeroSelectModalProps> = ({
  isOpen,
  onClose,
  onStartMatch,
  unlockedHeroIds,
  onOpenShop
}) => {
  const [selectedHeroId, setSelectedHeroId] = useState<string>('hero_na_brawler');
  const [gameMode, setGameMode] = useState<MobaGameMode>('SOLO_AI_5V5');
  const [difficulty, setDifficulty] = useState<BotDifficulty>('STANDARD');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkillTab, setActiveSkillTab] = useState<'q' | 'w' | 'e' | 'r' | 'p'>('q');
  const [selectedSpellD, setSelectedSpellD] = useState<string>('flash');
  const [selectedSpellF, setSelectedSpellF] = useState<string>('heal');

  const filteredHeroes = useMemo(() => {
    return HEROES_CATALOG.filter((hero) => {
      const matchesRole = roleFilter === 'ALL' || hero.role === roleFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        hero.name_vi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hero.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hero.title_vi.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [roleFilter, searchQuery]);

  if (!isOpen) return null;

  const currentHero = HEROES_CATALOG.find(h => h.id === selectedHeroId) || HEROES_CATALOG[0];
  const heroGuide = CHAMPION_TACTICAL_GUIDES[currentHero.id] || {
    combo: 'Q ➔ W ➔ Đòn đánh thường ➔ R',
    tip: 'Tận dụng đặc tính nguyên tố để áp đảo đối thủ.',
    bestWith: 'Các nguyên tố tương thích trong bảng tuần hoàn.',
    counters: 'Đạt hiệu quả cao khi phối hợp đồng đội.'
  };

  const handleSelectHero = (hero: HeroDefinition) => {
    sound.playCardSelect();
    setSelectedHeroId(hero.id);
  };

  const handleStart = () => {
    sound.playVictory();
    onStartMatch(selectedHeroId, gameMode, difficulty);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'TANK': return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
      case 'FIGHTER': return <Sword className="w-3.5 h-3.5 text-orange-400" />;
      case 'MAGE': return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'MARKSMAN': return <Crosshair className="w-3.5 h-3.5 text-cyan-400" />;
      case 'ASSASSIN': return <Zap className="w-3.5 h-3.5 text-yellow-400" />;
      default: return <Droplets className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const getTargetTypeBadge = (targetType?: string) => {
    switch (targetType) {
      case 'SKILLSHOT_LINE': return { label: 'Tia Định Hướng', color: 'text-amber-400 bg-amber-950/60 border-amber-500/30' };
      case 'SKILLSHOT_AOE': return { label: 'Vùng Ảnh Hưởng (AoE)', color: 'text-rose-400 bg-rose-950/60 border-rose-500/30' };
      case 'TARGET_UNIT': return { label: 'Chỉ Định Mục Tiêu', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30' };
      default: return { label: 'Tức Thì (Quanh Bản Thân)', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-navy border-2 border-navy-light/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-navy-light/60 bg-obsidian/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-ion via-navy to-coral-reaction p-0.5 shadow-md shadow-cyan-ion/30 flex items-center justify-center">
              <span className="font-serif font-black text-ivory text-xl">E</span>
            </div>
            <div>
              <h2 className="font-serif font-black text-base sm:text-lg text-ivory tracking-wide flex items-center gap-2">
                CHỌN TƯỚNG NGUYÊN TỐ & CHẾ ĐỘ ĐẤU TRƯỜNG MOBA
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 font-bold">
                  12 TƯỚNG IUPAC
                </span>
              </h2>
              <p className="text-xs text-ivory-muted">Cân bằng nhịp độ giao tranh, máu khởi điểm 850 HP, 750g vàng và tương tác phản ứng tự nhiên</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-ivory-muted hover:text-ivory hover:bg-navy-light/60 border border-navy-light/60 transition-all"
            >
              Hủy
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Heroes Roster (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-obsidian/50 p-2.5 rounded-xl border border-navy-light/60">
              {/* Role Filter Chips */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {[
                  { id: 'ALL', label: 'Tất Cả' },
                  { id: 'TANK', label: 'Đỡ Đòn' },
                  { id: 'FIGHTER', label: 'Đấu Sĩ' },
                  { id: 'MAGE', label: 'Pháp Sư' },
                  { id: 'MARKSMAN', label: 'Xạ Thủ' },
                  { id: 'ASSASSIN', label: 'Sát Thủ' },
                  { id: 'SUPPORT', label: 'Hỗ Trợ' },
                ].map((chip) => {
                  const isActive = roleFilter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => {
                        sound.playUiClick();
                        setRoleFilter(chip.id as RoleFilter);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        isActive
                          ? 'bg-cyan-ion text-obsidian shadow-sm'
                          : 'bg-navy text-ivory-muted hover:text-ivory hover:bg-navy-light'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-40">
                <Search className="w-3.5 h-3.5 text-ivory-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tướng..."
                  className="w-full pl-8 pr-2.5 py-1 rounded-lg bg-navy text-xs text-ivory border border-navy-light focus:outline-none focus:border-cyan-ion font-mono"
                />
              </div>
            </div>

            {/* Grid of Heroes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[310px] overflow-y-auto pr-1">
              {filteredHeroes.map(hero => {
                const isSelected = hero.id === selectedHeroId;
                const isLocked = unlockedHeroIds && !unlockedHeroIds.includes(hero.id);
                return (
                  <div
                    key={hero.id}
                    onClick={() => handleSelectHero(hero)}
                    className={`relative p-3 rounded-xl cursor-pointer transition-all border flex flex-col items-center text-center group ${
                      isSelected
                        ? 'bg-navy-light/90 border-cyan-ion shadow-lg shadow-cyan-ion/25 scale-[1.02]'
                        : isLocked
                        ? 'bg-obsidian/40 border-navy-light/30 opacity-70 hover:opacity-100 hover:border-amber-500/40'
                        : 'bg-navy/60 border-navy-light/50 hover:bg-navy-light/50 hover:border-ivory/30'
                    }`}
                  >
                    {isLocked && (
                      <div className="absolute top-1.5 left-1.5 p-1 rounded-md bg-obsidian/80 text-amber-400 border border-amber-500/30" title="Chưa mở khóa">
                        <Lock className="w-3 h-3" />
                      </div>
                    )}

                    {/* Bespoke Elemental Crest */}
                    <div className="w-12 h-12 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 drop-shadow-md">
                      <ElementalCrest heroIdOrSymbol={hero.symbol} size={46} glow={isSelected} />
                    </div>

                    <div className="w-full">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        {getRoleIcon(hero.role)}
                        <span className="text-xs font-bold text-ivory truncate">{hero.name_vi.split('—')[0]}</span>
                      </div>
                      <span className="text-[10px] text-ivory-muted font-mono block truncate">
                        {hero.title_vi.split('(')[0]}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-ion text-obsidian flex items-center justify-center text-xs font-bold shadow-md">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Match Configuration Controls */}
            <div className="p-3.5 rounded-xl bg-obsidian/60 border border-navy-light/60 flex flex-col gap-2.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-ivory-muted flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-coral-reaction" />
                Cấu Hình Trận Đấu & Bản Đồ
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Game Mode Picker */}
                <div>
                  <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Chế Độ Bản Đồ:</label>
                  <select
                    value={gameMode}
                    onChange={(e) => setGameMode(e.target.value as MobaGameMode)}
                    className="w-full px-3 py-1.5 rounded-lg bg-navy border border-navy-light text-xs text-ivory focus:border-cyan-ion focus:outline-none"
                  >
                    <option value="SOLO_AI_5V5">Đấu Đội 5v5 — Thung Lũng Liên Kết (3 Làn)</option>
                    <option value="SOLO_AI_3V3">Đấu Nhanh 3v3 — Giao Tranh Tiết Tấu Cao</option>
                    <option value="CUSTOM_SANDBOX">Hộp Cát Thử Nghiệm Sandbox (Vô Hạn Chiêu & Vàng)</option>
                    <option value="CHEMISTRY_CHALLENGE">Thử Thách Phản Ứng Hóa Học (Boss Quái Rừng)</option>
                  </select>
                </div>

                {/* Difficulty Picker */}
                <div>
                  <label className="text-[11px] text-ivory-muted block mb-1 font-mono">Độ Khó AI Đối Thủ:</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as BotDifficulty)}
                    className="w-full px-3 py-1.5 rounded-lg bg-navy border border-navy-light text-xs text-ivory focus:border-cyan-ion focus:outline-none"
                  >
                    <option value="NOVICE">Tân Thủ (Novice AI - Nhẹ nhàng làm quen)</option>
                    <option value="STANDARD">Tiêu Chuẩn (Standard AI - Chiến thuật cân bằng)</option>
                    <option value="ADVANCED">Chuyên Gia (Advanced AI - Đảo đường & cướp rừng)</option>
                    <option value="CHALLENGER">Đại Sư Mendeleev (Expert AI - Phản xạ đỉnh cao)</option>
                  </select>
                </div>
              </div>

              {/* Customizer: Summoner Spells Selection Loadout */}
              <div className="pt-2 border-t border-navy-light/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-ivory font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-ion" />
                    Bộ Phép Bổ Trợ Tự Chọn (Summoner Spells):
                  </span>
                  <span className="text-yellow-400 font-bold">Vàng Đầu Trận: 750g</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Slot D Picker */}
                  <div className="p-2 rounded-lg bg-navy/70 border border-navy-light/60">
                    <span className="text-[10px] text-ivory-muted font-mono block mb-1">[Phím D] Phép Cơ Động / Đi Rừng:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {SUMMONER_SPELLS_CATALOG.D.map((spell) => {
                        const isChosen = selectedSpellD === spell.id;
                        return (
                          <button
                            key={spell.id}
                            type="button"
                            onClick={() => { sound.playUiClick(); setSelectedSpellD(spell.id); }}
                            className={`p-1.5 rounded border text-[11px] font-bold text-center transition-all ${
                              isChosen
                                ? 'bg-cyan-500 text-obsidian border-cyan-300 shadow-sm'
                                : 'bg-obsidian/60 text-ivory-muted border-navy-light/40 hover:text-ivory'
                            }`}
                            title={spell.description}
                          >
                            {spell.name.split('(')[0].trim()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Slot F Picker */}
                  <div className="p-2 rounded-lg bg-navy/70 border border-navy-light/60">
                    <span className="text-[10px] text-ivory-muted font-mono block mb-1">[Phím F] Phép Sinh Tồn / Chiến Thuật:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {SUMMONER_SPELLS_CATALOG.F.map((spell) => {
                        const isChosen = selectedSpellF === spell.id;
                        return (
                          <button
                            key={spell.id}
                            type="button"
                            onClick={() => { sound.playUiClick(); setSelectedSpellF(spell.id); }}
                            className={`p-1.5 rounded border text-[11px] font-bold text-center transition-all ${
                              isChosen
                                ? 'bg-emerald-500 text-obsidian border-emerald-300 shadow-sm'
                                : 'bg-obsidian/60 text-ivory-muted border-navy-light/40 hover:text-ivory'
                            }`}
                            title={spell.description}
                          >
                            {spell.name.split('(')[0].trim()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Hero Detail View (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 bg-obsidian/50 p-4.5 rounded-xl border border-navy-light/60 justify-between">
            <div className="space-y-3">
              {/* Champion Title & Role */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center shrink-0 drop-shadow-xl">
                  <ElementalCrest heroIdOrSymbol={currentHero.symbol} size={56} glow={true} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ivory">{currentHero.name_vi}</h3>
                  <p className="text-xs text-cyan-ion font-mono">{currentHero.title_vi}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-navy-light/80 text-ivory font-mono font-bold">
                      {currentHero.role}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-mono">
                      Số hiệu Z = {currentHero.elementData.z}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Tabs (Passive, Q, W, E, R) */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-muted">
                  Bộ Kỹ Năng & Thông Số Sát Thương:
                </span>
                <div className="flex items-center gap-1.5 bg-navy/80 p-1 rounded-lg border border-navy-light/50">
                  {(['p', 'q', 'w', 'e', 'r'] as const).map(slotKey => {
                    const skill = slotKey === 'p' ? currentHero.skills.passive : currentHero.skills[slotKey];
                    const isActive = activeSkillTab === slotKey;
                    return (
                      <button
                        key={slotKey}
                        onClick={() => { sound.playUiClick(); setActiveSkillTab(slotKey); }}
                        className={`flex-1 py-1 rounded text-xs font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-cyan-ion text-obsidian shadow-sm'
                            : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/40'
                        }`}
                      >
                        {slotKey.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                {/* Active Skill Info Card with In-Depth Data */}
                {(() => {
                  const skill = activeSkillTab === 'p' ? currentHero.skills.passive : currentHero.skills[activeSkillTab];
                  const badge = getTargetTypeBadge(skill.targetType);
                  return (
                    <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/50 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ivory flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-cyan-ion/20 text-cyan-ion font-mono text-[10px] flex items-center justify-center font-bold">
                            {skill.slot}
                          </span>
                          {skill.name_vi}
                        </span>
                        {skill.cooldownSeconds > 0 && (
                          <span className="text-[11px] text-ivory-muted font-mono">
                            Hồi: <span className="text-cyan-300 font-bold">{skill.cooldownSeconds}s</span> | MP: <span className="text-blue-300 font-bold">{skill.manaCost}</span>
                          </span>
                        )}
                      </div>

                      {/* Combat Details Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className={`px-2 py-0.5 rounded border ${badge.color}`}>
                          {badge.label}
                        </span>
                        {skill.baseDamage > 0 && (
                          <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-300 font-bold">
                            Sát thương: {skill.baseDamage} {skill.scalingRatio ? `(+${Math.round(skill.scalingRatio * 100)}% ${skill.scalingStat || 'AD'})` : ''}
                          </span>
                        )}
                        {skill.range > 0 && (
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                            Tầm: {skill.range}px
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-ivory-muted leading-relaxed">
                        {skill.description_vi}
                      </p>

                      <div className="pt-1.5 border-t border-navy-light/40 text-[11px] text-cyan-ion/90 font-mono flex items-start gap-1">
                        <FlaskConical className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-ion" />
                        <span>{skill.chemicalPrincipleVI}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Tactical Combos & Synergy Box */}
              <div className="p-3 rounded-lg bg-navy/80 border border-amber-500/30 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHUỖI COMBO CHIẾN THUẬT:</span>
                </div>
                <div className="p-1.5 rounded bg-obsidian/70 border border-white/5 font-mono text-cyan-200 font-semibold text-[11px] leading-relaxed">
                  {heroGuide.combo}
                </div>
                <div className="text-ivory-muted italic leading-relaxed text-[10px]">
                  💡 <span className="text-ivory">{heroGuide.tip}</span>
                </div>
              </div>

              {/* Base Stats Overview (Tuned Balanced Metrics) */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-ivory-muted bg-navy/40 p-2.5 rounded-lg border border-navy-light/40">
                <div>Máu cơ bản: <span className="text-emerald-400 font-bold">{currentHero.baseStats.maxHp} HP</span></div>
                <div>Năng lượng: <span className="text-cyan-400 font-bold">{currentHero.baseStats.maxMana} MP</span></div>
                <div>Sát thương: <span className="text-orange-400 font-bold">{currentHero.baseStats.attackDamage} AD</span></div>
                <div>Giáp vật lý: <span className="text-yellow-400 font-bold">{currentHero.baseStats.armor} Giáp</span></div>
                <div>Kháng phép: <span className="text-purple-400 font-bold">{currentHero.baseStats.magicResist} Kháng</span></div>
                <div>Tốc độ chạy: <span className="text-blue-400 font-bold">{currentHero.baseStats.movementSpeed} MS</span></div>
              </div>
            </div>

            {/* Launch Button */}
            {unlockedHeroIds && !unlockedHeroIds.includes(currentHero.id) ? (
              <button
                onClick={() => {
                  sound.playUiClick();
                  onClose();
                  if (onOpenShop) onOpenShop();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian font-serif font-black text-xs tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>MỞ KHÓA TƯỚNG TẠI SHOP ĐỂ CHƠI (500 TOKENS)</span>
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-ion via-cyan-500 to-coral-reaction text-obsidian font-serif font-black text-sm tracking-wider shadow-lg shadow-cyan-ion/30 hover:shadow-cyan-ion/60 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Play className="w-4 h-4 fill-obsidian" />
                XÁC NHẬN VÀO ĐẤU TRƯỜNG MOBA
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
