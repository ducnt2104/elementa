// src/services/apiClient.ts
// Production API Client for ELEMENTA Online Platform
// Seamless Session Handling, Authoritative Sync, Offline Fallback & REST Communications

export interface UserSession {
  token: string;
  userId: string;
  username: string;
  displayName: string;
  isGuest: boolean;
  expiresAt: string;
}

export interface PlayerProfileDTO {
  userId: string;
  username: string;
  displayName: string;
  level: number;
  xp: number;
  knowledgeTokens: number;
  elementalShards: number;
  battlesPlayed: number;
  battlesWon: number;
  reactionsTriggered: number;
  tutorialCompleted: boolean;
  isGuest: boolean;
}

export interface ShopItemDTO {
  id: string;
  name: string;
  category: 'STARTER_PACK' | 'THEMATIC_PACK' | 'EXPANSION_BOX' | 'SINGLE_CARD';
  description: string;
  tokenPrice: number;
  shardPrice: number;
  cardCount: number;
  guaranteedRarity?: string;
}

export interface PurchaseResultDTO {
  success: boolean;
  message: string;
  transactionId: string;
  tokensRemaining: number;
  shardsRemaining: number;
  awardedCards: { cardId: string; name: string; rarity: string }[];
}

export interface UserQuestDTO {
  id: string;
  category: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardXp: number;
  rewardTokens: number;
  rewardShards: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export interface GoldenHourStatusDTO {
  isActive: boolean;
  currentSlotName?: string;
  nextSlotTime: string;
  xpMultiplier: number;
  tokenMultiplier: number;
  timezone: string;
}

export interface MultiplayerRoomDTO {
  code: string;
  mode: 'TCG' | 'MOBA';
  status: 'WAITING' | 'READY' | 'IN_PROGRESS' | 'FINISHED';
  host: {
    userId: string;
    username: string;
    displayName: string;
    isReady: boolean;
    deckId?: string;
    isHost: boolean;
  };
  guest: {
    userId: string;
    username: string;
    displayName: string;
    isReady: boolean;
    deckId?: string;
    isHost: boolean;
  } | null;
  matchState?: any;
  actionSequence: number;
  lastActionAt: string;
  createdAt: string;
}

export type ConnectionStatus = 'CONNECTING' | 'CONNECTED' | 'RECONNECTING' | 'FALLBACK_POLLING' | 'CLOSED';

export interface RoomSubscriptionOptions {
  onUpdate: (room: MultiplayerRoomDTO) => void;
  onError?: (err: any) => void;
  onStatusChange?: (status: ConnectionStatus, retryCount: number) => void;
}

const TOKEN_STORAGE_KEY = 'elementa_online_token_v2';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL !== undefined && import.meta.env.VITE_API_BASE_URL !== ''
  ? import.meta.env.VITE_API_BASE_URL
  : (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? (window.location.port === '3001' ? '' : 'http://localhost:3001')
    : '');

class ApiClient {
  private token: string | null = null;
  private currentSession: UserSession | null = null;
  private currentProfile: PlayerProfileDTO | null = null;
  private isOnlineServerAvailable: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(TOKEN_STORAGE_KEY);
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  public getSession(): UserSession | null {
    return this.currentSession;
  }

  public getCachedProfile(): PlayerProfileDTO | null {
    return this.currentProfile;
  }

  public isServerAvailable(): boolean {
    return this.isOnlineServerAvailable;
  }

  private saveToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      this.isOnlineServerAvailable = true;

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error((data && data.error) || `HTTP ${response.status}: Lỗi máy chủ`);
      }

      return data as T;
    } catch (err: any) {
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        this.isOnlineServerAvailable = false;
      }
      throw err;
    }
  }

  // --- Session & Authentication ---

  public async initSession(): Promise<{ session: UserSession; profile: PlayerProfileDTO }> {
    if (this.token) {
      try {
        const res = await this.request<{ success: boolean; session: UserSession; profile: PlayerProfileDTO }>('/api/auth/me');
        this.currentSession = res.session;
        this.currentProfile = res.profile;
        return { session: res.session, profile: res.profile };
      } catch {
        // Token expired or invalid, reset
        this.saveToken(null);
      }
    }

    // Auto-create guest session for seamless first-run experience
    return this.createGuestSession();
  }

  public async createGuestSession(): Promise<{ session: UserSession; profile: PlayerProfileDTO }> {
    const res = await this.request<{ success: boolean; session: UserSession; profile: PlayerProfileDTO }>(
      '/api/auth/guest',
      { method: 'POST' }
    );
    this.saveToken(res.session.token);
    this.currentSession = res.session;
    this.currentProfile = res.profile;
    return { session: res.session, profile: res.profile };
  }

  public async register(username: string, email: string, password: string): Promise<{ session: UserSession; profile: PlayerProfileDTO }> {
    const res = await this.request<{ success: boolean; session: UserSession; profile: PlayerProfileDTO }>(
      '/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      }
    );
    this.saveToken(res.session.token);
    this.currentSession = res.session;
    this.currentProfile = res.profile;
    return { session: res.session, profile: res.profile };
  }

  public async login(usernameOrEmail: string, password: string): Promise<{ session: UserSession; profile: PlayerProfileDTO }> {
    const res = await this.request<{ success: boolean; session: UserSession; profile: PlayerProfileDTO }>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ usernameOrEmail, password })
      }
    );
    this.saveToken(res.session.token);
    this.currentSession = res.session;
    this.currentProfile = res.profile;
    return { session: res.session, profile: res.profile };
  }

  public async upgradeGuest(username: string, email: string, password: string): Promise<{ session: UserSession; profile: PlayerProfileDTO }> {
    if (!this.token) throw new Error('Không tìm thấy phiên khách để nâng cấp');
    const res = await this.request<{ success: boolean; session: UserSession; profile: PlayerProfileDTO }>(
      '/api/auth/upgrade',
      {
        method: 'POST',
        body: JSON.stringify({
          guestToken: this.token,
          username,
          email,
          password
        })
      }
    );
    this.currentSession = res.session;
    this.currentProfile = res.profile;
    return { session: res.session, profile: res.profile };
  }

  public logout(): void {
    this.saveToken(null);
    this.currentSession = null;
    this.currentProfile = null;
  }

  // --- Profile & Wallet ---

  public async getProfile(): Promise<PlayerProfileDTO> {
    const res = await this.request<{ success: boolean; profile: PlayerProfileDTO }>('/api/profile');
    this.currentProfile = res.profile;
    return res.profile;
  }

  public async syncProgression(xpDelta: number, battlesWonDelta: number = 0, reactionsDelta: number = 0): Promise<PlayerProfileDTO> {
    const res = await this.request<{ success: boolean; profile: PlayerProfileDTO }>(
      '/api/profile/sync',
      {
        method: 'POST',
        body: JSON.stringify({ xpDelta, battlesWonDelta, reactionsDelta })
      }
    );
    this.currentProfile = res.profile;
    return res.profile;
  }

  public async getWallet(): Promise<{ tokens: number; shards: number }> {
    const res = await this.request<{ success: boolean; wallet: { tokens: number; shards: number } }>('/api/wallet');
    return res.wallet;
  }

  // --- Shop & Purchases ---

  public async getShopCatalog(): Promise<ShopItemDTO[]> {
    const res = await this.request<{ success: boolean; catalog: ShopItemDTO[] }>('/api/shop/catalog');
    return res.catalog;
  }

  public async purchaseItem(itemId: string, currency: 'TOKENS' | 'SHARDS'): Promise<PurchaseResultDTO> {
    const idempotencyKey = 'buy_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    const res = await this.request<PurchaseResultDTO>(
      '/api/shop/purchase',
      {
        method: 'POST',
        headers: {
          'X-Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify({ itemId, currency, idempotencyKey })
      }
    );
    if (this.currentProfile) {
      this.currentProfile.knowledgeTokens = res.tokensRemaining;
      this.currentProfile.elementalShards = res.shardsRemaining;
    }
    return res;
  }

  // --- Quests & Spaced Repetition (CA-SRS) ---

  public async getQuests(): Promise<UserQuestDTO[]> {
    const res = await this.request<{ success: boolean; quests: UserQuestDTO[] }>('/api/quests');
    return res.quests;
  }

  public async claimQuest(questId: string): Promise<{ xp: number; tokens: number; shards: number }> {
    const res = await this.request<{ success: boolean; reward: { xp: number; tokens: number; shards: number } }>(
      '/api/quests/claim',
      {
        method: 'POST',
        body: JSON.stringify({ questId })
      }
    );
    return res.reward;
  }

  public async recordMatchError(topicId: string, errorType: string, errorLevel: number = 1): Promise<void> {
    await this.request('/api/srs/error', {
      method: 'POST',
      body: JSON.stringify({ topicId, errorType, errorLevel })
    });
  }

  public async getDueSrsReviews(): Promise<any[]> {
    const res = await this.request<{ success: boolean; dueReviews: any[] }>('/api/srs/due');
    return res.dueReviews;
  }

  public async submitSrsReview(topicId: string): Promise<{ nextIntervalDays: number }> {
    return this.request('/api/srs/review', {
      method: 'POST',
      body: JSON.stringify({ topicId })
    });
  }

  // --- Events & Golden Hours ---

  public async getGoldenHours(): Promise<GoldenHourStatusDTO> {
    const res = await this.request<{ success: boolean; goldenHours: GoldenHourStatusDTO }>('/api/events/golden-hours');
    return res.goldenHours;
  }

  // --- Multiplayer Room Lifecycle ---

  public async createRoom(mode: 'TCG' | 'MOBA' = 'TCG'): Promise<MultiplayerRoomDTO> {
    const res = await this.request<{ success: boolean; room: MultiplayerRoomDTO }>(
      '/api/rooms/create',
      {
        method: 'POST',
        body: JSON.stringify({ mode })
      }
    );
    return res.room;
  }

  public async joinRoom(code: string): Promise<MultiplayerRoomDTO> {
    const res = await this.request<{ success: boolean; room: MultiplayerRoomDTO }>(
      '/api/rooms/join',
      {
        method: 'POST',
        body: JSON.stringify({ code })
      }
    );
    return res.room;
  }

  public async getRoom(code: string): Promise<MultiplayerRoomDTO> {
    const res = await this.request<{ success: boolean; room: MultiplayerRoomDTO }>(`/api/rooms/${code}`);
    return res.room;
  }

  public async setReady(code: string, isReady: boolean, deckId?: string): Promise<MultiplayerRoomDTO> {
    const res = await this.request<{ success: boolean; room: MultiplayerRoomDTO }>(
      `/api/rooms/${code}/ready`,
      {
        method: 'POST',
        body: JSON.stringify({ isReady, deckId })
      }
    );
    return res.room;
  }

  public async startMatch(code: string): Promise<MultiplayerRoomDTO> {
    const res = await this.request<{ success: boolean; room: MultiplayerRoomDTO }>(
      `/api/rooms/${code}/start`,
      {
        method: 'POST'
      }
    );
    return res.room;
  }

  public async dispatchAction(code: string, actionType: string, payload: any = {}): Promise<MultiplayerRoomDTO> {
    const res = await this.request<{ success: boolean; room: MultiplayerRoomDTO }>(
      `/api/rooms/${code}/action`,
      {
        method: 'POST',
        body: JSON.stringify({ actionType, payload })
      }
    );
    return res.room;
  }

  public async leaveRoom(code: string): Promise<boolean> {
    const res = await this.request<{ success: boolean }>(
      `/api/rooms/${code}/leave`,
      {
        method: 'POST'
      }
    );
    return res.success;
  }

  /**
   * Real-time subscription to room state changes via SSE with exponential backoff reconnect & resilient polling fallback
   */
  public subscribeToRoom(
    code: string,
    onUpdateOrOptions: ((room: MultiplayerRoomDTO) => void) | RoomSubscriptionOptions,
    maybeOnError?: (err: any) => void
  ): () => void {
    let onUpdate: (room: MultiplayerRoomDTO) => void;
    let onError: ((err: any) => void) | undefined;
    let onStatusChange: ((status: ConnectionStatus, retryCount: number) => void) | undefined;

    if (typeof onUpdateOrOptions === 'function') {
      onUpdate = onUpdateOrOptions;
      onError = maybeOnError;
    } else {
      onUpdate = onUpdateOrOptions.onUpdate;
      onError = onUpdateOrOptions.onError;
      onStatusChange = onUpdateOrOptions.onStatusChange;
    }

    let isClosed = false;
    let fallbackInterval: ReturnType<typeof setInterval> | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let eventSource: EventSource | null = null;
    let retryCount = 0;
    const MAX_BACKOFF_MS = 16000;
    const INITIAL_BACKOFF_MS = 1000;

    const setStatus = (status: ConnectionStatus) => {
      if (onStatusChange && !isClosed) {
        onStatusChange(status, retryCount);
      }
    };

    const stopPollingFallback = () => {
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
        fallbackInterval = null;
      }
    };

    const startPollingFallback = () => {
      if (fallbackInterval || isClosed) return;
      setStatus('FALLBACK_POLLING');
      fallbackInterval = setInterval(async () => {
        if (isClosed) return;
        try {
          const room = await this.getRoom(code);
          if (!isClosed) onUpdate(room);
        } catch (e) {
          if (onError && !isClosed) onError(e);
        }
      }, 2000);
    };

    const reconcileState = async () => {
      try {
        const room = await this.getRoom(code);
        if (!isClosed) {
          onUpdate(room);
        }
      } catch (err) {
        if (onError && !isClosed) onError(err);
      }
    };

    const connectSSE = () => {
      if (isClosed) return;

      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }

      setStatus(retryCount === 0 ? 'CONNECTING' : 'RECONNECTING');

      try {
        const sseUrl = `${API_BASE_URL}/api/rooms/${code}/events`;
        eventSource = new EventSource(sseUrl);

        eventSource.onopen = () => {
          if (isClosed) return;
          retryCount = 0;
          setStatus('CONNECTED');
          stopPollingFallback();
          // Immediately reconcile room state upon reconnection
          reconcileState();
        };

        eventSource.onmessage = (event) => {
          if (isClosed) return;
          try {
            const payload = JSON.parse(event.data);
            if (payload.room) {
              onUpdate(payload.room);
            }
          } catch (err) {
            if (onError && !isClosed) onError(err);
          }
        };

        eventSource.onerror = (err) => {
          if (isClosed) return;
          if (onError) onError(err);

          // Engage polling fallback immediately while waiting for SSE reconnect
          startPollingFallback();

          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }

          retryCount++;
          // Exponential backoff: 1s, 2s, 4s, 8s, max 16s with 10% jitter
          const baseDelay = Math.min(INITIAL_BACKOFF_MS * Math.pow(2, retryCount - 1), MAX_BACKOFF_MS);
          const jitter = Math.random() * 0.1 * baseDelay;
          const delay = Math.round(baseDelay + jitter);

          setStatus('RECONNECTING');

          if (reconnectTimeout) clearTimeout(reconnectTimeout);
          reconnectTimeout = setTimeout(() => {
            if (!isClosed) {
              connectSSE();
            }
          }, delay);
        };
      } catch (e) {
        startPollingFallback();
      }
    };

    if (typeof window === 'undefined' || typeof EventSource === 'undefined') {
      startPollingFallback();
      return () => {
        isClosed = true;
        stopPollingFallback();
      };
    }

    // Initial connection attempt
    connectSSE();

    return () => {
      isClosed = true;
      setStatus('CLOSED');
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      stopPollingFallback();
    };
  }
}

export const apiClient = new ApiClient();
