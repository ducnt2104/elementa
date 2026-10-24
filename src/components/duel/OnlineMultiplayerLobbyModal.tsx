// src/components/duel/OnlineMultiplayerLobbyModal.tsx
// Production Online Multiplayer Room Lobby Modal
// Real-time Room Creation (E-XXXX), Code Joining, Player Ready State & SSE Synchronization

import React, { useState, useEffect } from 'react';
import {
  Users,
  Copy,
  Check,
  Play,
  LogOut,
  Sparkles,
  Wifi,
  Shield,
  Layers,
  Flame,
  AlertCircle,
  X,
  Swords
} from 'lucide-react';
import { apiClient, MultiplayerRoomDTO, UserSession, PlayerProfileDTO, ConnectionStatus } from '../../services/apiClient';
import { sound } from '../../audio/soundEngine';

interface OnlineMultiplayerLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOnlineMatch: (room: MultiplayerRoomDTO) => void;
  mode?: 'TCG' | 'MOBA';
}

export const OnlineMultiplayerLobbyModal: React.FC<OnlineMultiplayerLobbyModalProps> = ({
  isOpen,
  onClose,
  onStartOnlineMatch,
  mode = 'TCG'
}) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [profile, setProfile] = useState<PlayerProfileDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active room state
  const [currentRoom, setCurrentRoom] = useState<MultiplayerRoomDTO | null>(null);
  const [joinCodeInput, setJoinCodeInput] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [connStatus, setConnStatus] = useState<ConnectionStatus>('CONNECTING');
  const [connRetryCount, setConnRetryCount] = useState<number>(0);

  // Upgrade guest modal inside lobby
  const [showUpgradeForm, setShowUpgradeForm] = useState<boolean>(false);
  const [upgradeUsername, setUpgradeUsername] = useState<string>('');
  const [upgradeEmail, setUpgradeEmail] = useState<string>('');
  const [upgradePassword, setUpgradePassword] = useState<string>('');

  const handleInitSession = () => {
    setLoading(true);
    setErrorMessage(null);
    apiClient.initSession()
      .then(({ session, profile }) => {
        setSession(session);
        setProfile(profile);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage('Không thể kết nối đến máy chủ trực tuyến: ' + (err.message || 'Máy chủ đang ngoại tuyến'));
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentRoom(null);
      setIsReady(false);
      setErrorMessage(null);
      return;
    }

    handleInitSession();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Subscribe to real-time SSE updates when inside a room with backoff & fallback
  useEffect(() => {
    if (!currentRoom) return;

    const unsubscribe = apiClient.subscribeToRoom(
      currentRoom.code,
      {
        onUpdate: (updatedRoom) => {
          setCurrentRoom(updatedRoom);
          if (updatedRoom.status === 'IN_PROGRESS') {
            sound.playReactionSuccess();
            onStartOnlineMatch(updatedRoom);
          }
        },
        onError: (err) => {
          console.warn('[Multiplayer SSE] Stream warning:', err);
        },
        onStatusChange: (status, retry) => {
          setConnStatus(status);
          setConnRetryCount(retry);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentRoom?.code, onStartOnlineMatch]);

  if (!isOpen) return null;

  const handleCreateRoom = async () => {
    setLoading(true);
    setErrorMessage(null);
    sound.playUiClick();
    try {
      const room = await apiClient.createRoom(mode);
      setCurrentRoom(room);
      setIsReady(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi tạo phòng thi đấu');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    const code = joinCodeInput.trim().toUpperCase();
    if (!code) {
      setErrorMessage('Vui lòng nhập mã phòng (ví dụ: E-A8K2)');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    sound.playUiClick();
    try {
      const room = await apiClient.joinRoom(code);
      setCurrentRoom(room);
      setIsReady(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi tham gia phòng');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReady = async () => {
    if (!currentRoom) return;
    sound.playUiClick();
    const newReady = !isReady;
    setIsReady(newReady);
    try {
      const updated = await apiClient.setReady(currentRoom.code, newReady);
      setCurrentRoom(updated);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi cập nhật trạng thái');
      setIsReady(!newReady);
    }
  };

  const handleStartMatch = async () => {
    if (!currentRoom) return;
    sound.playReactionSuccess();
    setLoading(true);
    try {
      const started = await apiClient.startMatch(currentRoom.code);
      setCurrentRoom(started);
      onStartOnlineMatch(started);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi bắt đầu trận đấu');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveRoom = async () => {
    if (!currentRoom) return;
    sound.playUiClick();
    try {
      await apiClient.leaveRoom(currentRoom.code);
    } catch (err) {
      console.warn('Lỗi khi rời phòng:', err);
    }
    setCurrentRoom(null);
    setIsReady(false);
  };

  const copyRoomCode = () => {
    if (!currentRoom) return;
    navigator.clipboard.writeText(currentRoom.code);
    setCopiedCode(true);
    sound.playUiClick();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleUpgradeAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upgradeUsername || !upgradeEmail || !upgradePassword) {
      setErrorMessage('Vui lòng điền đủ tên người dùng, email và mật khẩu');
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.upgradeGuest(upgradeUsername, upgradeEmail, upgradePassword);
      setSession(res.session);
      setProfile(res.profile);
      setShowUpgradeForm(false);
      sound.playReactionSuccess();
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể nâng cấp tài khoản');
    } finally {
      setLoading(false);
    }
  };

  const isHost = currentRoom && session && currentRoom.host.userId === session.userId;
  const canStart = isHost && currentRoom?.status === 'READY';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="multiplayer-lobby-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-navy-dark border border-cyan-ion/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy border-b border-navy-light/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-ion/10 border border-cyan-ion/40 flex items-center justify-center text-cyan-ion shadow-inner">
              <Swords className="w-5 h-5 text-cyan-ion animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="multiplayer-lobby-title"
                  className="font-serif font-black text-lg text-ivory tracking-wide"
                >
                  ĐẤU TRƯỜNG TRỰC TUYẾN 1v1
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-ion/10 border border-cyan-ion/30 text-cyan-ion text-[10px] font-mono">
                  {mode} REAL-TIME
                </span>
              </div>
              <p className="text-xs text-ivory-muted">
                Kết nối thi đấu đối kháng trực tiếp qua mã phòng bảo mật
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ phòng thi đấu (Escape)"
            className="p-1.5 rounded-lg text-ivory-muted hover:text-ivory hover:bg-navy-light/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Error Banner */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-coral-reaction/10 border border-coral-reaction/40 text-coral-reaction text-xs font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* User Status Bar */}
          {session && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-navy/60 border border-navy-light text-xs font-mono">
              <div className="flex items-center gap-2 text-ivory">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>Người chơi: <strong>{profile?.displayName || session.username}</strong></span>
                {session.isGuest ? (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px]">
                    Tài Khoản Khách
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
                    Chính Thức
                  </span>
                )}
              </div>

              {session.isGuest && (
                <button
                  onClick={() => setShowUpgradeForm(!showUpgradeForm)}
                  className="text-cyan-ion hover:underline text-[11px] font-semibold"
                >
                  {showUpgradeForm ? 'Hủy' : 'Đăng Ký Lưu Vĩnh Viễn →'}
                </button>
              )}
            </div>
          )}

          {/* Guest Upgrade Inline Form */}
          {showUpgradeForm && session?.isGuest && (
            <form onSubmit={handleUpgradeAccount} className="p-4 rounded-xl bg-navy border border-purple-500/40 space-y-3 text-xs animate-fadeIn">
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <Shield className="w-4 h-4" />
                <span>Nâng cấp tài khoản vĩnh viễn (Bảo lưu toàn bộ Token & Bộ bài)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={upgradeUsername}
                  onChange={(e) => setUpgradeUsername(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-obsidian border border-navy-light text-ivory focus:border-cyan-ion outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={upgradeEmail}
                  onChange={(e) => setUpgradeEmail(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-obsidian border border-navy-light text-ivory focus:border-cyan-ion outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={upgradePassword}
                  onChange={(e) => setUpgradePassword(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-obsidian border border-navy-light text-ivory focus:border-cyan-ion outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all disabled:opacity-50"
              >
                {loading ? 'Đang Xử Lý...' : 'Xác Nhận Nâng Cấp'}
              </button>
            </form>
          )}

          {/* --- OFFLINE / DISCONNECTED STATE SCREEN --- */}
          {!session && !loading ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-navy via-navy-light/30 to-obsidian border border-amber-500/40 space-y-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                <Wifi className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-ivory">Chế Độ Ngoại Tuyến (Offline Mode)</h4>
                <p className="text-xs text-ivory-muted max-w-md mx-auto">
                  Máy chủ trực tuyến đang chưa kích hoạt trên cổng 3001. Bạn vẫn có thể trải nghiệm toàn bộ kho 7.329 thẻ bài, chế độ Đấu Tập Chiến Thuật, MOBA và Chiến Dịch Ngoại Tuyến.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian/70 border border-navy-light text-[11px] font-mono text-cyan-ion text-left space-y-1">
                <div className="text-ivory font-bold">Khởi chạy máy chủ nội bộ (Multiplayer Backend):</div>
                <div className="text-emerald-400">npm run server</div>
                <div className="text-ivory-muted text-[10px]">• Tích hợp Node.js SQLite & Server-Sent Events (SSE) thời gian thực</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl bg-cyan-ion/20 hover:bg-cyan-ion/30 text-cyan-ion border border-cyan-ion/50 font-bold text-xs tracking-wide transition-all"
                >
                  Chơi Đấu Tập Ngoại Tuyến (Offline vs AI)
                </button>
                <button
                  onClick={handleInitSession}
                  className="px-5 py-3 rounded-xl bg-navy hover:bg-navy-light text-ivory border border-navy-light font-bold text-xs tracking-wide transition-all"
                >
                  Thử Kết Nối Lại
                </button>
              </div>
            </div>
          ) : currentRoom ? (
            <div className="space-y-6">
              {/* Room Code Header */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-navy via-navy-light/60 to-navy border border-cyan-ion/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-cyan-ion uppercase tracking-widest">
                      Mã Phòng Thi Đấu Trực Tuyến
                    </span>
                    {/* Real-time Connection Health Badge */}
                    {connStatus === 'CONNECTED' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        SSE Trực Tuyến
                      </span>
                    ) : connStatus === 'RECONNECTING' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-spin" />
                        Đang kết nối lại ({connRetryCount})...
                      </span>
                    ) : connStatus === 'FALLBACK_POLLING' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Dự Phòng (Polling 2s)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Đang kết nối...
                      </span>
                    )}
                  </div>
                  <div className="text-3xl font-black font-mono text-ivory tracking-wider mt-0.5">
                    {currentRoom.code}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyRoomCode}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-ion/10 hover:bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/30 text-xs font-mono transition-all"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'Đã Sao Chép!' : 'Sao Chép Mã'}</span>
                  </button>

                  <button
                    onClick={handleLeaveRoom}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-mono transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Rời Phòng</span>
                  </button>
                </div>
              </div>

              {/* 2 Players Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Host Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  currentRoom.host.isReady
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-navy/70 border-navy-light'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      CHỦ PHÒNG (HOST)
                    </span>
                    {currentRoom.host.isReady ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                        <Check className="w-3.5 h-3.5" /> ĐÃ SẴN SÀNG
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-ivory-muted">
                        Đang chuẩn bị...
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-ivory">
                    {currentRoom.host.displayName}
                  </div>
                  <div className="text-xs text-ivory-muted font-mono mt-1">
                    {currentRoom.host.deckId || 'Bộ Bài Tiêu Chuẩn (40 Thẻ)'}
                  </div>
                </div>

                {/* Guest Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  currentRoom.guest?.isReady
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : currentRoom.guest
                    ? 'bg-navy/70 border-navy-light'
                    : 'bg-navy/30 border-dashed border-navy-light/60 flex flex-col items-center justify-center py-8'
                }`}>
                  {currentRoom.guest ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          ĐỐI THỦ (GUEST)
                        </span>
                        {currentRoom.guest.isReady ? (
                          <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                            <Check className="w-3.5 h-3.5" /> ĐÃ SẴN SÀNG
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-ivory-muted">
                            Đang chuẩn bị...
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-sm text-ivory">
                        {currentRoom.guest.displayName}
                      </div>
                      <div className="text-xs text-ivory-muted font-mono mt-1">
                        {currentRoom.guest.deckId || 'Bộ Bài Tiêu Chuẩn (40 Thẻ)'}
                      </div>
                    </>
                  ) : (
                    <div className="text-center space-y-1">
                      <Users className="w-6 h-6 text-cyan-ion/40 mx-auto animate-bounce" />
                      <div className="text-xs font-mono text-ivory-muted">Đang chờ đối thủ tham gia...</div>
                      <div className="text-[10px] text-ivory-muted">Gửi mã phòng {currentRoom.code} cho bạn bè</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleToggleReady}
                  className={`w-full sm:w-1/2 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                    isReady
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                      : 'bg-navy hover:bg-navy-light text-cyan-ion border border-cyan-ion/40'
                  }`}
                >
                  {isReady ? '✓ BẠN ĐÃ SẴN SÀNG (Nhấp Để Hủy)' : 'SẴN SÀNG CHIẾN ĐẤU'}
                </button>

                {isHost && (
                  <button
                    onClick={handleStartMatch}
                    disabled={!canStart || loading}
                    className="w-full sm:w-1/2 py-3.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-amber-500 via-coral-reaction to-red-600 text-white shadow-lg shadow-coral-reaction/40 hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>BẮT ĐẦU TRẬN ĐẤU (8000 LP)</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* --- JOIN OR CREATE ROOM SCREEN --- */
            <div className="space-y-6">
              {/* Option 1: Create New Room */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-navy via-navy-light/40 to-navy border border-navy-light hover:border-cyan-ion/40 transition-all space-y-3">
                <div className="flex items-center gap-2 text-cyan-ion font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>TẠO PHÒNG MỚI (LÀM CHỦ PHÒNG)</span>
                </div>
                <p className="text-xs text-ivory-muted">
                  Tạo phòng thi đấu đối kháng trực tuyến ngay lập tức. Hệ thống sẽ cấp một mã phòng 6 ký tự để bạn gửi cho đối thủ.
                </p>
                <button
                  onClick={handleCreateRoom}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-cyan-ion/20 hover:bg-cyan-ion/30 text-cyan-ion border border-cyan-ion/50 font-bold text-xs font-mono tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>TẠO PHÒNG CHIẾN THUẬT {mode}</span>
                </button>
              </div>

              {/* Option 2: Join Existing Room with Code */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-navy via-navy-light/40 to-navy border border-navy-light hover:border-purple-500/40 transition-all space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>THAM GIA PHÒNG CỦA BẠN BÈ</span>
                </div>
                <p className="text-xs text-ivory-muted">
                  Nhập mã phòng 6 ký tự (ví dụ: <strong className="font-mono text-cyan-ion">E-ABCD</strong>) do đối thủ cung cấp để bước vào sảnh đấu.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                    placeholder="MÃ PHÒNG (VD: E-K9X2)"
                    maxLength={10}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-obsidian border border-navy-light text-ivory font-mono font-bold tracking-widest text-center text-sm focus:border-cyan-ion outline-none"
                  />
                  <button
                    onClick={handleJoinRoom}
                    disabled={loading || !joinCodeInput.trim()}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wide transition-all disabled:opacity-50"
                  >
                    VÀO PHÒNG
                  </button>
                </div>
              </div>

              {/* Master Rules Note */}
              <div className="p-4 rounded-xl bg-obsidian/60 border border-navy-light/60 text-[11px] text-ivory-muted leading-relaxed space-y-1">
                <div className="text-cyan-ion font-bold font-mono">ĐIỀU LỆ THI ĐẤU CHUẨN MASTER RULE 2020:</div>
                <div>• Khởi đầu với 8.000 Điểm Sinh Mệnh (LP). Lượt đi trước không rút bài và không thể tấn công.</div>
                <div>• Giới hạn 60 giây mỗi lượt đấu, có chuỗi đếm ngược cảnh báo tự động.</div>
                <div>• Sát thương phản ứng hóa học và hiệu ứng chuỗi giải phóng theo biểu đồ thời gian tất định DCSM.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
