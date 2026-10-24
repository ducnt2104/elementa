// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { MainMenuTab } from './components/MainMenuTab';
import { MobaArenaTab } from './components/moba/MobaArenaTab';
import { MobaDebriefModal } from './components/moba/MobaDebriefModal';
import { PeriodicCodexTab } from './components/PeriodicCodexTab';
import { CreativeWorkshopTab } from './components/CreativeWorkshopTab';
import { TutorialLabTab } from './components/TutorialLabTab';
import { UnifiedResourcesModal, UnifiedResourceTab } from './components/resources/UnifiedResourcesModal';
import { SpotlightTour } from './components/onboarding/SpotlightTour';
import { DebriefModal } from './components/DebriefModal';
import { SettingsModal } from './components/SettingsModal';
import { OnlineMultiplayerLobbyModal } from './components/duel/OnlineMultiplayerLobbyModal';
import { JudgeDemoModal } from './components/JudgeDemoModal';
import { FirebaseAuthModal } from './components/auth/FirebaseAuthModal';
import { TeacherDashboardTab } from './components/TeacherDashboardTab';

import { TacticalDuelArenaTab } from './components/duel/TacticalDuelArenaTab';
import { TacticalCollectionTab } from './components/collection/TacticalCollectionTab';
import { TacticalDeckBuilderTab } from './components/deck/TacticalDeckBuilderTab';
import { BoosterShopTab } from './components/shop/BoosterShopTab';
import { CampaignStoryTab, CampaignStage } from './components/campaign/CampaignStoryTab';
import { TcgMainMenu } from './components/tcg/TcgMainMenu';
import { MobaMainMenu } from './components/moba/MobaMainMenu';
import { MobaHeroShopModal } from './components/moba/MobaHeroShopModal';
import { RankedDashboardSection } from './components/ranked/RankedDashboardSection';
import { rankedEngine } from './domain/rankedSystem';
import { AiLevel } from './domain/duelEngine';

import { SpacedRepetitionService } from './domain/spacedRepetition';
import { PlayerProfile, CreativeSkillSubmission, DuelDeckConfig } from './domain/types';
import { GameStorage, UserSettings } from './storage/localStore';
import { BattleDebriefData } from './domain/battleEngine';
import { MobaMatchDebrief } from './game/types';
import { sound } from './audio/soundEngine';
import { registerCustomCards, PLAYABLE_CARDS } from './data/playableCardsData';
import { convertSubmissionToPlayableCard } from './domain/aiGuardrails';
import { Settings, BookOpen, Calculator, HelpCircle, Globe2, BookMarked } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('MENU');
  const [systemMode, setSystemMode] = useState<'HOME' | 'TCG' | 'MOBA'>('HOME');
  const [showHeroShop, setShowHeroShop] = useState<boolean>(false);
  const [tcgAiLevel, setTcgAiLevel] = useState<AiLevel>('ADEPT');
  const [mobaGameMode, setMobaGameMode] = useState<'CASUAL_AI' | 'RANKED_AI' | 'RANKED_PVP'>('CASUAL_AI');
  const [profile, setProfile] = useState<PlayerProfile>(() => GameStorage.loadProfile());
  const [savedSkills, setSavedSkills] = useState<CreativeSkillSubmission[]>(() => GameStorage.loadSkills());
  const [settings, setSettings] = useState<UserSettings>(() => GameStorage.loadSettings());

  // Unified Modals state
  const [showUnifiedResources, setShowUnifiedResources] = useState<boolean>(false);
  const [unifiedResourceTab, setUnifiedResourceTab] = useState<UnifiedResourceTab>('REACTIONS');
  const [showSpotlightTour, setShowSpotlightTour] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showMultiplayerLobby, setShowMultiplayerLobby] = useState<boolean>(false);
  const [showJudgeDemo, setShowJudgeDemo] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [activeDebrief, setActiveDebrief] = useState<BattleDebriefData | null>(null);
  const [activeMobaDebrief, setActiveMobaDebrief] = useState<MobaMatchDebrief | null>(null);
  const [currentCampaignStage, setCurrentCampaignStage] = useState<CampaignStage | null>(null);
  const [mobaMatchKey, setMobaMatchKey] = useState<number>(0);
  const [duelMatchKey, setDuelMatchKey] = useState<number>(0);

  // Sync settings with Sound Engine on boot
  useEffect(() => {
    sound.setVolume(settings.volume);
    sound.setMute(settings.isMuted);
  }, [settings]);

  // Sync approved custom crafted cards with playable card registry
  useEffect(() => {
    const approved = savedSkills.filter(s => s.validation && s.validation.isScientificallyValid);
    const customCards = approved.map(convertSubmissionToPlayableCard);
    registerCustomCards(customCards);
  }, [savedSkills]);

  // First-time visit auto-launch of Spotlight Tour
  useEffect(() => {
    const isFirstTime = !profile.tutorialCompleted;
    if (isFirstTime) {
      const tourTimer = setTimeout(() => {
        setShowSpotlightTour(true);
      }, 700);
      return () => clearTimeout(tourTimer);
    }
  }, [profile.tutorialCompleted]);

  // Save profile to storage on change
  const updateProfile = (updater: (prev: PlayerProfile) => PlayerProfile) => {
    setProfile((prev) => {
      const next = updater(prev);
      GameStorage.saveProfile(next);
      return next;
    });
  };

  const handleUnlockJudgeProfile = () => {
    updateProfile((prev) => {
      const judgeCollection: Record<string, number> = {};
      PLAYABLE_CARDS.forEach((card) => {
        judgeCollection[card.id] = 3;
      });
      return {
        ...prev,
        level: 50,
        xp: 99999,
        knowledgeTokens: 10000,
        elementalShards: 5000,
        unlockedElementZ: Array.from({ length: 118 }, (_, i) => i + 1),
        cardCollection: judgeCollection,
        battlesPlayed: 100,
        battlesWon: 95,
        reactionsTriggered: 250,
        tutorialCompleted: true
      };
    });
  };

  const handleSaveDuelDeck = (updatedDeck: DuelDeckConfig) => {
    updateProfile((prev) => ({
      ...prev,
      activeDuelDeck: updatedDeck
    }));
  };

  const handleCampaignStageWon = (stageId: string, rewardCardId: string) => {
    updateProfile((prev) => {
      const currentCompleted = prev.completedCampaignStages || ['stage_1_acid_rain'];
      const nextCompleted = currentCompleted.includes(stageId)
        ? currentCompleted
        : [...currentCompleted, stageId];
      const nextCollection = { ...(prev.cardCollection || {}) };
      nextCollection[rewardCardId] = (nextCollection[rewardCardId] || 0) + 1;
      return {
        ...prev,
        completedCampaignStages: nextCompleted,
        cardCollection: nextCollection,
        knowledgeTokens: prev.knowledgeTokens + 200,
        elementalShards: (prev.elementalShards || 0) + 50,
        xp: prev.xp + 150
      };
    });
  };

  const handleMobaMatchFinished = (debrief: MobaMatchDebrief) => {
    updateProfile((prev) => {
      const nextXp = prev.xp + debrief.xpEarned;
      const nextTokens = prev.knowledgeTokens + debrief.knowledgeTokensEarned;
      const isWin = debrief.outcome === 'VICTORY';

      let updatedMobaRank = prev.mobaBotRank;
      if (mobaGameMode === 'RANKED_AI') {
        const curRank = prev.mobaBotRank || { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
        const nextWins = curRank.wins + (isWin ? 1 : 0);
        const nextLosses = curRank.losses + (isWin ? 0 : 1);
        const nextMmr = Math.max(0, curRank.mmr + (isWin ? 25 : -15));
        const { tier, division } = rankedEngine.calculateTier(nextMmr);
        updatedMobaRank = {
          tier: tier.id,
          division,
          mmr: nextMmr,
          wins: nextWins,
          losses: nextLosses
        };
      }

      // Automatically synthesize CA-SRS flashcards from encountered cognitive traps
      const updatedSrsItems = [...prev.srsItems];
      if (debrief.chemicalTrapsEncountered && debrief.chemicalTrapsEncountered.length > 0) {
        for (const trap of debrief.chemicalTrapsEncountered) {
          const alreadyExists = updatedSrsItems.some(i => i.question.includes(trap.equation) || i.targetId === trap.reactionRule.id);
          if (!alreadyExists) {
            const srsCard = SpacedRepetitionService.createItemFromMistake(
              trap.reactionRule.id,
              'REACTION',
              trap.reactionRule.name_vi,
              `Tại sao phản ứng sau không xảy ra trong điều kiện axit loãng thông thường: ${trap.equation}?`,
              `${trap.targetEntityId || 'Kim loại'} đứng sau H trong dãy điện hóa (E° > 0), không đẩy được H⁺ ra khỏi axit loãng.`,
              [
                `${trap.targetEntityId || 'Kim loại'} đứng sau H trong dãy điện hóa (E° > 0), không đẩy được H⁺ ra khỏi axit loãng.`,
                'Nhiệt độ chưa đạt điểm bắt cháy.',
                'Dung dịch thiếu chất xúc tác quang hóa.',
                'Thể tích dung môi quá nhỏ làm bão hòa nồng độ.'
              ],
              trap.pedagogicalNoteVI || trap.reactionRule.pedagogicalExplanation,
              3
            );
            updatedSrsItems.push(srsCard);
          }
        }
      }

      return {
        ...prev,
        xp: nextXp,
        knowledgeTokens: nextTokens,
        mobaBotRank: updatedMobaRank,
        srsItems: updatedSrsItems,
        stats: {
          ...prev.stats,
          battlesPlayed: prev.stats.battlesPlayed + 1,
          battlesWon: isWin ? prev.stats.battlesWon + 1 : prev.stats.battlesWon,
          reactionsTriggered: prev.stats.reactionsTriggered + debrief.reactionsTriggered.length
        }
      };
    });

    setActiveMobaDebrief(debrief);
  };

  const handleDuelFinished = (outcome: string) => {
    const isWin = outcome === 'PLAYER_VICTORY';
    const rankedProfile = rankedEngine.getProfile();
    updateProfile((prev) => ({
      ...prev,
      tcgBotRank: {
        tier: rankedProfile.currentTierId,
        division: rankedProfile.division,
        mmr: rankedProfile.mmr,
        wins: rankedProfile.wins,
        losses: rankedProfile.losses
      },
      stats: {
        ...prev.stats,
        battlesPlayed: prev.stats.battlesPlayed + 1,
        battlesWon: isWin ? prev.stats.battlesWon + 1 : prev.stats.battlesWon
      }
    }));
  };

  const handleSaveCustomSkill = (submission: CreativeSkillSubmission) => {
    setSavedSkills((prev) => {
      const next = [...prev, submission];
      GameStorage.saveSkills(next);
      return next;
    });
    updateProfile((prev) => ({
      ...prev,
      knowledgeTokens: prev.knowledgeTokens + 50,
      xp: prev.xp + 25
    }));
  };

  const handleCompleteTutorial = () => {
    updateProfile((prev) => {
      if (prev.tutorialCompleted) return prev;
      return {
        ...prev,
        tutorialCompleted: true,
        knowledgeTokens: (prev.knowledgeTokens || 0) + 200,
        elementalShards: (prev.elementalShards || 0) + 50,
        xp: prev.xp + 150
      };
    });
    setShowSpotlightTour(false);
  };

  const handleOpenUnifiedResources = (tab: UnifiedResourceTab = 'REACTIONS') => {
    sound.playUiClick();
    setUnifiedResourceTab(tab);
    setShowUnifiedResources(true);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-obsidian text-ivory selection:bg-cyan-ion selection:text-obsidian safe-pb">
      {/* Top Universal Navbar with breathing room & Unified Resources */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemMode={systemMode}
        onNavigateHome={() => {
          setSystemMode('HOME');
          setActiveTab('MENU');
        }}
        onEnterTcg={() => {
          setSystemMode('TCG');
          setActiveTab('TCG_MENU');
        }}
        onEnterMoba={() => {
          setSystemMode('MOBA');
          setActiveTab('MOBA_MENU');
        }}
        profile={profile}
        isMuted={settings.isMuted}
        toggleMute={() => {
          const nextMute = !settings.isMuted;
          setSettings((s) => ({ ...s, isMuted: nextMute }));
          GameStorage.saveSettings({ ...settings, isMuted: nextMute });
        }}
        openTutorial={() => setShowSpotlightTour(true)}
        openCompendium={() => handleOpenUnifiedResources('REACTIONS')}
        openCalculator={() => handleOpenUnifiedResources('CALCULATOR')}
        openBondingLab={() => handleOpenUnifiedResources('BONDING')}
        openUnifiedResources={handleOpenUnifiedResources}
        openMultiplayerLobby={() => setShowMultiplayerLobby(true)}
        openJudgeDemo={() => setShowJudgeDemo(true)}
        openAuthModal={() => setShowAuthModal(true)}
      />

      {/* Main Screen Views */}
      <main className="flex-1 w-full flex flex-col">
        {/* HOME HUB */}
        {activeTab === 'MENU' && (
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
            <MainMenuTab
              profile={profile}
              setActiveTab={setActiveTab}
              onEnterTcg={() => {
                setSystemMode('TCG');
                setActiveTab('TCG_MENU');
              }}
              onEnterMoba={() => {
                setSystemMode('MOBA');
                setActiveTab('MOBA_MENU');
              }}
              onUpdateProfile={updateProfile}
              onOpenCompendium={() => handleOpenUnifiedResources('REACTIONS')}
              onOpenMultiplayerLobby={() => setShowMultiplayerLobby(true)}
              onOpenJudgeDemo={() => setShowJudgeDemo(true)}
            />
          </div>
        )}

        {/* TCG_MENU TAB: Dedicated TCG Main Menu */}
        {activeTab === 'TCG_MENU' && (
          <div className="w-full flex-1 flex flex-col">
            <TcgMainMenu
              profile={profile}
              onSelectSection={(sec) => {
                if (sec === 'SHOP') setActiveTab('SHOP');
                else if (sec === 'LIBRARY') setActiveTab('LIBRARY');
                else if (sec === 'COLLECTION') setActiveTab('COLLECTION');
                else if (sec === 'DECK') setActiveTab('DECK');
                else if (sec === 'CAMPAIGN') setActiveTab('CAMPAIGN');
                else if (sec === 'RANKED') setActiveTab('RANKED');
                else if (sec === 'QUESTS') setActiveTab('QUESTS');
                else if (sec === 'SETTINGS') setShowSettings(true);
                else if (sec === 'HOME') {
                  setSystemMode('HOME');
                  setActiveTab('MENU');
                }
              }}
              onLaunchCasualBot={(diff) => {
                setTcgAiLevel(diff || 'ADEPT');
                setDuelMatchKey((k) => k + 1);
                setActiveTab('DUEL');
              }}
              onLaunchRankedAi={() => {
                setTcgAiLevel('RANKED_AI');
                setDuelMatchKey((k) => k + 1);
                setActiveTab('DUEL');
              }}
              onLaunchCampaign={() => setActiveTab('CAMPAIGN')}
              onOpenMultiplayerLobby={() => setShowMultiplayerLobby(true)}
              onReturnHome={() => {
                setSystemMode('HOME');
                setActiveTab('MENU');
              }}
              onOpenSettings={() => setShowSettings(true)}
            />
          </div>
        )}

        {/* MOBA_MENU TAB: Dedicated MOBA Main Menu */}
        {activeTab === 'MOBA_MENU' && (
          <div className="w-full flex-1 flex flex-col">
            <MobaMainMenu
              profile={profile}
              onSelectSection={(sec) => {
                if (sec === 'HERO_SHOP' || sec === 'ROSTER' || sec === 'SKILLS') setShowHeroShop(true);
                else if (sec === 'RANKED') setActiveTab('RANKED');
                else if (sec === 'QUESTS') setActiveTab('QUESTS');
                else if (sec === 'SETTINGS') setShowSettings(true);
                else if (sec === 'HOME') {
                  setSystemMode('HOME');
                  setActiveTab('MENU');
                }
              }}
              onLaunchCasualBot={() => {
                setMobaGameMode('CASUAL_AI');
                setMobaMatchKey((k) => k + 1);
                setActiveTab('BATTLE');
              }}
              onLaunchRankedAi={() => {
                setMobaGameMode('RANKED_AI');
                setMobaMatchKey((k) => k + 1);
                setActiveTab('BATTLE');
              }}
              onLaunchPvpQueue={() => {
                setMobaGameMode('RANKED_PVP');
                setShowMultiplayerLobby(true);
              }}
              onOpenHeroShop={() => setShowHeroShop(true)}
              onReturnHome={() => {
                setSystemMode('HOME');
                setActiveTab('MENU');
              }}
              onOpenSettings={() => setShowSettings(true)}
            />
          </div>
        )}

        {/* BATTLE TAB: Pure Standalone 60 FPS MOBA Arena (Preserved in DOM to prevent match reset) */}
        <div className={activeTab === 'BATTLE' ? 'w-full flex-1 flex flex-col' : 'hidden'}>
          <MobaArenaTab
            key={`moba-arena-${mobaMatchKey}`}
            onMatchFinished={handleMobaMatchFinished}
            openTutorial={() => setActiveTab('TUTORIAL')}
            settings={settings}
            onUpdateSettings={(newSettings) => {
              setSettings(newSettings);
              GameStorage.saveSettings(newSettings);
            }}
            onRestartMatch={() => {
              setMobaMatchKey((k) => k + 1);
            }}
            unlockedHeroIds={profile.unlockedHeroes}
            onOpenShop={() => setShowHeroShop(true)}
          />
        </div>

        {/* DUEL TAB: Yu-Gi-Oh! Tactical Card Game Arena (Preserved in DOM to prevent match reset) */}
        <div className={activeTab === 'DUEL' ? 'w-full flex-1 flex flex-col' : 'hidden'}>
          <TacticalDuelArenaTab
            key={`tactical-duel-${duelMatchKey}`}
            playerMainDeckIds={profile.activeDuelDeck?.mainDeck || []}
            playerExtraDeckIds={profile.activeDuelDeck?.extraDeck || []}
            initialAiLevel={tcgAiLevel}
            campaignStage={currentCampaignStage}
            onCampaignStageWon={handleCampaignStageWon}
            onDuelFinished={handleDuelFinished}
            onExitCampaignDuel={() => {
              setCurrentCampaignStage(null);
              setActiveTab('CAMPAIGN');
            }}
            openTutorial={() => setActiveTab('TUTORIAL')}
            onOpenDeckBuilder={() => setActiveTab('DECK')}
            onReturnToLobby={() => {
              if (systemMode === 'TCG') setActiveTab('TCG_MENU');
              else setActiveTab('MENU');
            }}
          />
        </div>

        {/* LIBRARY TAB: All 7,330 Cards Catalog */}
        {activeTab === 'LIBRARY' && (
          <div className="w-full flex-1 flex flex-col">
            <TacticalCollectionTab
              profile={profile}
              initialViewMode="FULL_LIBRARY"
              onNavigateToShop={() => setActiveTab('SHOP')}
              onNavigateToDeck={() => setActiveTab('DECK')}
              onReturnToTcgMenu={() => setActiveTab('TCG_MENU')}
            />
          </div>
        )}

        {/* COLLECTION TAB: Standalone TCG Collection (Owned Only) */}
        {activeTab === 'COLLECTION' && (
          <div className="w-full flex-1 flex flex-col">
            <TacticalCollectionTab
              profile={profile}
              initialViewMode="COLLECTION_OWNED"
              onNavigateToShop={() => setActiveTab('SHOP')}
              onNavigateToDeck={() => setActiveTab('DECK')}
              onReturnToTcgMenu={() => setActiveTab('TCG_MENU')}
            />
          </div>
        )}

        {/* RANKED TAB: Segregated 4-Pillar Ranking (TCG Bot, TCG PvP, MOBA Bot, MOBA PvP) */}
        {activeTab === 'RANKED' && (
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-black text-2xl text-ivory">BẢNG XẾP HẠNG & LỊCH SỬ THI ĐẤU</h2>
                <p className="text-xs text-ivory-muted">Theo dõi thứ hạng độc lập giữa Đấu Bot và Đấu PvP của cả hai hệ TCG và MOBA</p>
              </div>
              <button
                onClick={() => {
                  if (systemMode === 'TCG') setActiveTab('TCG_MENU');
                  else if (systemMode === 'MOBA') setActiveTab('MOBA_MENU');
                  else setActiveTab('MENU');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-navy-light/60 hover:bg-navy-light text-xs font-bold text-ivory transition-all"
              >
                ← Quay Lại
              </button>
            </div>
            <RankedDashboardSection
              onStartRankedDuel={() => {
                setTcgAiLevel('RANKED_AI');
                setDuelMatchKey((k) => k + 1);
                setActiveTab('DUEL');
              }}
            />
          </div>
        )}

        {/* QUESTS TAB: Quests & Learning Rewards */}
        {activeTab === 'QUESTS' && (
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-black text-2xl text-ivory">NHIỆM VỤ & PHÚC LỢI HỌC TẬP</h2>
                <p className="text-xs text-ivory-muted">Hoàn thành nhiệm vụ kích hoạt phản ứng hóa học và ôn tập CA-SRS nhận Tokens</p>
              </div>
              <button
                onClick={() => {
                  if (systemMode === 'TCG') setActiveTab('TCG_MENU');
                  else if (systemMode === 'MOBA') setActiveTab('MOBA_MENU');
                  else setActiveTab('MENU');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-navy-light/60 hover:bg-navy-light text-xs font-bold text-ivory transition-all"
              >
                ← Quay Lại
              </button>
            </div>
            <RankedDashboardSection
              onStartRankedDuel={() => {
                setTcgAiLevel('RANKED_AI');
                setDuelMatchKey((k) => k + 1);
                setActiveTab('DUEL');
              }}
            />
          </div>
        )}

        {/* DECK BUILDER TAB: 9-Slot Governed Deck Management */}
        {activeTab === 'DECK' && (
          <div className="w-full flex-1 flex flex-col">
            <TacticalDeckBuilderTab
              profile={profile}
              onSaveDeck={handleSaveDuelDeck}
            />
          </div>
        )}

        {/* SHOP TAB: Booster Boxes & Specialized Packs */}
        {activeTab === 'SHOP' && (
          <div className="w-full flex-1 flex flex-col">
            <BoosterShopTab
              profile={profile}
              onUpdateProfile={updateProfile}
            />
          </div>
        )}

        {/* CODEX TAB: Periodic Table & Chemical Lore */}
        {activeTab === 'CODEX' && (
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
            <PeriodicCodexTab />
          </div>
        )}

        {/* WORKSHOP TAB: Crafting Studio, Reaction Lab & Custom Cards */}
        {activeTab === 'WORKSHOP' && (
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
            <CreativeWorkshopTab
              profile={profile}
              onSaveSkill={handleSaveCustomSkill}
              savedSkills={savedSkills}
            />
          </div>
        )}

        {/* TUTORIAL TAB: Interactive Onboarding & Chemistry Mechanics */}
        {activeTab === 'TUTORIAL' && (
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
            <TutorialLabTab
              onStartMobaMatch={() => setActiveTab('BATTLE')}
              onStartTcgDuel={() => setActiveTab('DUEL')}
              tutorialCompleted={profile.tutorialCompleted}
              onCompleteTutorial={handleCompleteTutorial}
            />
          </div>
        )}

        {/* CAMPAIGN TAB: Boss Campaigns & Environmental Story */}
        {activeTab === 'CAMPAIGN' && (
          <div className="w-full flex-1 flex flex-col">
            <CampaignStoryTab
              completedStageIds={profile.completedCampaignStages || ['stage_1_acid_rain']}
              onStartStageDuel={(stage) => {
                sound.playUiClick();
                setCurrentCampaignStage(stage);
                setActiveTab('DUEL');
              }}
            />
          </div>
        )}

        {/* TEACHER DASHBOARD TAB (Section VI.1 - Bảng Điều Khiển Sư Phạm) */}
        {activeTab === 'TEACHER' && (
          <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
            <TeacherDashboardTab profile={profile} />
          </div>
        )}
      </main>

      {/* System Engine Diagnostics Footer (Relocated from Topbar per Part I.1.2) */}
      <footer className="border-t border-navy-light/40 bg-navy/60 px-4 py-2 text-[11px] font-mono text-ivory-muted flex flex-wrap items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-cyan-300 font-bold">DCSM Engine v2.4</span>
          <span className="text-navy-light">|</span>
          <span>Deterministic Chemical State Machine</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span>Tiêu chuẩn: GDPT 2018 (KHTN 7-9, Hóa 10-12) & IUPAC Gold Book</span>
          <span className="text-navy-light">|</span>
          <span className="text-emerald-400">7,329 Thẻ & 310+ Phản Ứng Đã Xác Minh</span>
        </div>
      </footer>

      {/* Clean Redesigned Footer (Online Platform Synced) */}
      <footer className="border-t border-navy-light/40 py-3 px-4 sm:px-6 text-xs font-mono text-ivory-muted/70 bg-obsidian/95 backdrop-blur-md safe-pb select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
            <span className="font-semibold text-ivory">ELEMENTA — Trận Chiến Nguyên Tố © 2026</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-400 hidden sm:inline">TCG & MOBA Hóa Học Chiến Thuật</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-cyan-400 font-semibold hidden sm:inline">Chuẩn GDPT 2018</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                sound.playUiClick();
                setShowSettings(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy/60 hover:bg-navy text-slate-300 hover:text-cyan-ion border border-navy-light/40 transition-all text-xs"
              title="Cài đặt âm lượng, giao diện & xuất dữ liệu dự phòng"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-ion" />
              <span>Cài đặt & Dữ liệu</span>
            </button>

            <button
              onClick={() => handleOpenUnifiedResources('REACTIONS')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy/60 hover:bg-navy text-slate-300 hover:text-amber-300 border border-navy-light/40 transition-all text-xs"
              title="Tra cứu Cẩm Nang & Tài Nguyên Hợp Nhất"
            >
              <BookMarked className="w-3.5 h-3.5 text-amber-400" />
              <span>Cẩm Nang & Tài Nguyên</span>
            </button>

            <button
              onClick={() => handleOpenUnifiedResources('CALCULATOR')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy/60 hover:bg-navy text-slate-300 hover:text-teal-300 border border-navy-light/40 transition-all text-xs"
              title="Máy tính hóa học: Pha chế dung dịch & pH"
            >
              <Calculator className="w-3.5 h-3.5 text-teal-400" />
              <span>Máy Tính</span>
            </button>

            <button
              onClick={() => {
                sound.playUiClick();
                setShowSpotlightTour(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy/60 hover:bg-navy text-slate-300 hover:text-cyan-ion border border-navy-light/40 transition-all text-xs"
              title="Spotlight Tour tương tác"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tour Hướng Dẫn</span>
            </button>

            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-ion/10 border border-cyan-ion/30 text-cyan-ion font-semibold text-[11px]">
              <Globe2 className="w-3 h-3" />
              <span>Đồng Bộ Trực Tuyến</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {showSpotlightTour && (
        <SpotlightTour
          isOpen={showSpotlightTour}
          onClose={() => setShowSpotlightTour(false)}
          onComplete={handleCompleteTutorial}
        />
      )}

      {showUnifiedResources && (
        <UnifiedResourcesModal
          isOpen={showUnifiedResources}
          onClose={() => setShowUnifiedResources(false)}
          initialTab={unifiedResourceTab}
          profile={profile}
          onUpdateProfile={updateProfile}
        />
      )}

      {activeMobaDebrief && (
        <MobaDebriefModal
          debrief={activeMobaDebrief}
          onClose={() => setActiveMobaDebrief(null)}
          onRematch={() => {
            setActiveMobaDebrief(null);
            setMobaMatchKey((k) => k + 1);
            setActiveTab('BATTLE');
          }}
          onGoToSrs={() => {
            setActiveMobaDebrief(null);
            handleOpenUnifiedResources('SRS');
          }}
        />
      )}

      {activeDebrief && (
        <DebriefModal
          debrief={activeDebrief}
          onClose={() => setActiveDebrief(null)}
          onPlayAgain={() => {
            setActiveDebrief(null);
            setDuelMatchKey((k) => k + 1);
            setActiveTab('DUEL');
          }}
          onGoToSrs={() => {
            setActiveDebrief(null);
            handleOpenUnifiedResources('SRS');
          }}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          profile={profile}
          onUpdateSettings={(s) => {
            setSettings(s);
            GameStorage.saveSettings(s);
          }}
          onUpdateProfile={(p) => {
            setProfile(p);
            GameStorage.saveProfile(p);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showMultiplayerLobby && (
        <OnlineMultiplayerLobbyModal
          isOpen={showMultiplayerLobby}
          onClose={() => setShowMultiplayerLobby(false)}
          onStartOnlineMatch={(room) => {
            setShowMultiplayerLobby(false);
            setActiveTab(room.mode === 'MOBA' ? 'BATTLE' : 'DUEL');
          }}
          mode="TCG"
        />
      )}

      {showJudgeDemo && (
        <JudgeDemoModal
          onClose={() => setShowJudgeDemo(false)}
          onUnlockJudgeProfile={handleUnlockJudgeProfile}
          onOpenTeacherDashboard={() => {
            setShowJudgeDemo(false);
            setActiveTab('TEACHER');
          }}
        />
      )}

      {/* MOBA Champion Shop Modal */}
      <MobaHeroShopModal
        isOpen={showHeroShop}
        onClose={() => setShowHeroShop(false)}
        profile={profile}
        onUpdateProfile={updateProfile}
      />

      {/* Firebase Authentication & Cloud Sync Modal */}
      <FirebaseAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        profile={profile}
        onProfileSynced={(updatedProfile) => {
          setProfile(updatedProfile);
          GameStorage.saveProfile(updatedProfile);
        }}
      />
    </div>
  );
};
