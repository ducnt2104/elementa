// src/components/auth/FirebaseAuthModal.tsx
// Academic Alchemy Styled Firebase Authentication & Cloud Sync Portal for ELEMENTA

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { firebaseService } from '../../services/firebaseService';
import { isFirebaseConfigured } from '../../services/firebaseConfig';
import { PlayerProfile } from '../../domain/types';
import { sound } from '../../audio/soundEngine';
import {
  X,
  ShieldCheck,
  Cloud,
  CloudOff,
  UserCheck,
  LogIn,
  UserPlus,
  RefreshCw,
  LogOut,
  Sparkles,
  KeyRound,
  Mail,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface FirebaseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onProfileSynced?: (updatedProfile: PlayerProfile) => void;
}

export const FirebaseAuthModal: React.FC<FirebaseAuthModalProps> = ({
  isOpen,
  onClose,
  profile,
  onProfileSynced
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(firebaseService.getUser());
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER' | 'STATUS'>('STATUS');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(profile.username || profile.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR'>('IDLE');

  useEffect(() => {
    const unsub = firebaseService.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setMode('STATUS');
      } else {
        setMode('LOGIN');
      }
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const handleGuestSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    sound.playUiClick();
    try {
      const user = await firebaseService.signInAsGuest();
      setSuccessMessage('Đăng nhập ẩn danh thành công! Đã cấp phát UID đám mây.');
      setMode('STATUS');
      if (onProfileSynced) {
        onProfileSynced({ ...profile, isGuest: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể đăng nhập khách, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    sound.playUiClick();
    try {
      const user = await firebaseService.loginWithEmail(email, password);
      setSuccessMessage(`Chào mừng trở lại, ${user.displayName || user.email}!`);
      // Pull remote profile if exists
      const cloudProfile = await firebaseService.loadProfile(user.uid);
      if (cloudProfile && onProfileSynced) {
        onProfileSynced(cloudProfile);
      }
      setMode('STATUS');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setErrorMessage('Email hoặc mật khẩu không chính xác.');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMessage('Tài khoản không tồn tại, vui lòng đăng ký.');
      } else {
        setErrorMessage(err.message || 'Lỗi đăng nhập, vui lòng kiểm tra kết nối.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      setErrorMessage('Vui lòng điền đầy đủ Tên hiển thị, Email và Mật khẩu (tối thiểu 6 ký tự).');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Mật khẩu bảo mật phải có ít nhất 6 ký tự.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    sound.playUiClick();
    try {
      const user = await firebaseService.registerWithEmail(email, password, displayName);
      setSuccessMessage(`Đăng ký tài khoản thành công! UID: ${user.uid.slice(0, 8)}...`);
      if (onProfileSynced) {
        onProfileSynced({ ...profile, name: displayName, username: displayName, isGuest: false });
      }
      setMode('STATUS');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Email này đã được sử dụng. Hãy chọn Đăng nhập.');
      } else {
        setErrorMessage(err.message || 'Lỗi đăng ký tài khoản.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSync = async () => {
    if (!currentUser) return;
    setSyncStatus('SYNCING');
    sound.playUiClick();
    try {
      await firebaseService.autoSyncOfflineData(currentUser.uid);
      setSyncStatus('SUCCESS');
      setSuccessMessage('Toàn bộ hồ sơ, bộ bài và bộ sưu tập đã được đồng bộ lên Cloud Firestore!');
      setTimeout(() => setSyncStatus('IDLE'), 3500);
    } catch {
      setSyncStatus('ERROR');
      setTimeout(() => setSyncStatus('IDLE'), 3500);
    }
  };

  const handleSignOut = async () => {
    sound.playUiClick();
    await firebaseService.logout();
    setSuccessMessage('Đã đăng xuất khỏi tài khoản.');
    setMode('LOGIN');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-surface border border-cyan-ion/40 rounded-2xl shadow-2xl overflow-hidden p-6 text-ivory">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-ion/10 border border-cyan-ion/40 flex items-center justify-center text-cyan-ion">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-xl font-bold tracking-wide font-cinzel text-cyan-ion">
                CỔNG BẢO MẬT & CLOUD
              </h2>
              <p className="text-xs text-white/60">
                Xác thực Firebase Authentication & Đồng bộ Firestore
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playUiClick();
              onClose();
            }}
            aria-label="Đóng cửa sổ"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cloud Status Banner */}
        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            )}
            <span className="font-semibold text-white/90">
              {currentUser
                ? currentUser.isAnonymous
                  ? 'Khách trực tuyến (Anonymous UID)'
                  : `Đã xác thực: ${currentUser.email || currentUser.displayName}`
                : 'Chế độ ngoại tuyến (Local Storage)'}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-white/50">
            <Cloud className="w-4 h-4 text-cyan-ion" />
            <span>{isFirebaseConfigured ? 'Firebase Active' : 'Spark Standby'}</span>
          </div>
        </div>

        {/* Notifications */}
        {errorMessage && (
          <div className="mt-3 p-3 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="mt-3 p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Mode Switcher */}
        {!currentUser && (
          <div className="flex mt-4 p-1 rounded-xl bg-black/40 border border-white/5 text-xs font-semibold">
            <button
              onClick={() => {
                setMode('LOGIN');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === 'LOGIN' ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40' : 'text-white/60 hover:text-white'
              }`}
            >
              Đăng Nhập
            </button>
            <button
              onClick={() => {
                setMode('REGISTER');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === 'REGISTER' ? 'bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40' : 'text-white/60 hover:text-white'
              }`}
            >
              Đăng Ký
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="mt-4">
          {mode === 'LOGIN' && !currentUser && (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">Email đăng nhập</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alchemist@elementa.edu.vn"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-ivory placeholder-white/30 focus:outline-none focus:border-cyan-ion"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">Mật khẩu</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-ivory placeholder-white/30 focus:outline-none focus:border-cyan-ion"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-ion text-obsidian font-bold text-sm hover:brightness-110 active:scale-98 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'Đang xác thực...' : 'Đăng Nhập'}</span>
                </button>

                <div className="relative my-2 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 bg-surface px-2">Hoặc</span>
                </div>

                <button
                  type="button"
                  onClick={handleGuestSignIn}
                  disabled={isLoading}
                  className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-semibold text-xs transition flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Chơi Nhanh (Chế Độ Khách Anonymous)</span>
                </button>
              </div>
            </form>
          )}

          {mode === 'REGISTER' && !currentUser && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">Tên hiển thị (Alchemist Handle)</label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Mendeleev_2026"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-ivory placeholder-white/30 focus:outline-none focus:border-cyan-ion"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">Email đăng ký</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alchemist@elementa.edu.vn"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-ivory placeholder-white/30 focus:outline-none focus:border-cyan-ion"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">Mật khẩu (Tối thiểu 6 ký tự)</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-ivory placeholder-white/30 focus:outline-none focus:border-cyan-ion"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-ion text-obsidian font-bold text-sm hover:brightness-110 active:scale-98 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isLoading ? 'Đang tạo tài khoản...' : 'Hoàn Tất Đăng Ký'}</span>
                </button>
              </div>
            </form>
          )}

          {currentUser && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Firebase UID:</span>
                  <span className="font-mono text-cyan-ion">{currentUser.uid}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Loại tài khoản:</span>
                  <span className="font-semibold text-white">
                    {currentUser.isAnonymous ? 'Khách Ẩn Danh' : 'Tài Khoản Đã Xác Thực'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Cấp Độ Nhà Giả Kim:</span>
                  <span className="font-bold text-amber-400">Lv. {profile.level}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Mã Token Tri Thức:</span>
                  <span className="font-bold text-cyan-ion">{profile.knowledgeTokens} Tokens</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleManualSync}
                  disabled={syncStatus === 'SYNCING'}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-ion/20 hover:bg-cyan-ion/30 border border-cyan-ion/40 text-cyan-ion font-bold text-xs transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncStatus === 'SYNCING' ? 'animate-spin' : ''}`} />
                  <span>
                    {syncStatus === 'SYNCING'
                      ? 'Đang đồng bộ Firestore...'
                      : syncStatus === 'SUCCESS'
                      ? '✓ Đã đồng bộ thành công'
                      : 'Đồng Bộ Tiến Trình Ngay (Cloud Sync)'}
                  </span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full py-2 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs transition flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng Xuất Tài Khoản</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
