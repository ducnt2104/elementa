// src/services/firebaseService.ts
// Production Firebase Integration Layer for ELEMENTA Online Platform
// Unifies Cloud Firestore persistence, Firebase Authentication, and seamless offline fallback

import {
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile as updateAuthProfile
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { PlayerProfile, DuelDeckConfig } from '../domain/types';
import { GameStorage } from '../storage/localStore';

export interface CloudLeaderboardEntry {
  userId: string;
  username: string;
  displayName: string;
  rating: number;
  rankTier: string;
  wins: number;
  losses: number;
  winRate: number;
  updatedAt?: any;
}

export interface MatchResultRecord {
  matchId: string;
  mode: 'TCG' | 'MOBA';
  hostId: string;
  guestId: string | null;
  winnerId: string | null;
  durationSeconds: number;
  roundsPlayed: number;
  participants: string[];
  endedAt: string;
}

export class FirebaseService {
  private static instance: FirebaseService | null = null;
  private currentUser: User | null = null;
  private authListeners: Array<(user: User | null) => void> = [];

  private constructor() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.authListeners.forEach((listener) => listener(user));
      if (user) {
        this.autoSyncOfflineData(user.uid);
      }
    });
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  // --- AUTHENTICATION ---

  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.authListeners = this.authListeners.filter((cb) => cb !== callback);
    };
  }

  public getUser(): User | null {
    return this.currentUser;
  }

  public async signInAsGuest(): Promise<User> {
    try {
      const cred = await signInAnonymously(auth);
      this.currentUser = cred.user;
      return cred.user;
    } catch (err) {
      console.warn('[Firebase Auth] Guest sign-in failed, proceeding in offline mode:', err);
      throw err;
    }
  }

  public async loginWithEmail(email: string, pass: string): Promise<User> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      this.currentUser = cred.user;
      return cred.user;
    } catch (err) {
      console.warn('[Firebase Auth] Login failed:', err);
      throw err;
    }
  }

  public async registerWithEmail(email: string, pass: string, displayName: string): Promise<User> {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateAuthProfile(cred.user, { displayName });
      this.currentUser = cred.user;

      // Initialize default cloud document
      const initialProfile = GameStorage.loadProfile();
      const resolvedName = displayName || email.split('@')[0];
      initialProfile.name = resolvedName;
      initialProfile.username = resolvedName;
      await this.saveProfile(cred.user.uid, initialProfile);

      return cred.user;
    } catch (err) {
      console.warn('[Firebase Auth] Registration failed:', err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      await signOut(auth);
      this.currentUser = null;
    } catch (err) {
      console.warn('[Firebase Auth] Logout error:', err);
    }
  }

  // --- FIRESTORE PERSISTENCE ---

  public async saveProfile(userId: string, profile: PlayerProfile): Promise<boolean> {
    try {
      const docRef = doc(db, 'users', userId);
      const cleanData = {
        userId,
        username: profile.username || profile.name || 'Alchemist',
        level: Number(profile.level) || 1,
        xp: Number(profile.xp) || 0,
        knowledgeTokens: Number(profile.knowledgeTokens) || 0,
        elementalShards: Number(profile.elementalShards) || 0,
        battlesPlayed: Number(profile.battlesPlayed) || 0,
        battlesWon: Number(profile.battlesWon) || 0,
        reactionsTriggered: Number(profile.reactionsTriggered) || 0,
        tutorialCompleted: Boolean(profile.tutorialCompleted),
        isGuest: Boolean(profile.isGuest),
        updatedAt: serverTimestamp()
      };
      await setDoc(docRef, cleanData, { merge: true });
      return true;
    } catch (err) {
      console.warn('[Firebase Firestore] Failed to save profile to cloud:', err);
      return false;
    }
  }

  public async loadProfile(userId: string): Promise<PlayerProfile | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const local = GameStorage.loadProfile();
        return {
          ...local,
          name: data.username || local.name,
          username: data.username || local.username || local.name,
          level: data.level ?? local.level,
          xp: data.xp ?? local.xp,
          knowledgeTokens: data.knowledgeTokens ?? local.knowledgeTokens,
          elementalShards: data.elementalShards ?? local.elementalShards,
          battlesPlayed: data.battlesPlayed ?? local.battlesPlayed,
          battlesWon: data.battlesWon ?? local.battlesWon,
          reactionsTriggered: data.reactionsTriggered ?? local.reactionsTriggered,
          tutorialCompleted: data.tutorialCompleted ?? local.tutorialCompleted,
          isGuest: data.isGuest ?? local.isGuest
        };
      }
      return null;
    } catch (err) {
      console.warn('[Firebase Firestore] Failed to load profile from cloud:', err);
      return null;
    }
  }

  public async saveDecks(userId: string, decks: DuelDeckConfig[]): Promise<boolean> {
    try {
      for (let i = 0; i < decks.length; i++) {
        const deck = decks[i];
        const deckId = `${userId}_slot_${i}`;
        const docRef = doc(db, 'decks', deckId);
        await setDoc(docRef, {
          id: deckId,
          ownerId: userId,
          slotIndex: i,
          name: deck.name || `Deck Slot ${i + 1}`,
          archetype: deck.archetype || 'CUSTOM',
          mainDeck: deck.mainDeck || [],
          extraDeck: deck.extraDeck || [],
          isPublic: false,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }
      return true;
    } catch (err) {
      console.warn('[Firebase Firestore] Failed to save decks to cloud:', err);
      return false;
    }
  }

  public async saveCollection(userId: string, collectionMap: Record<string, number>): Promise<boolean> {
    try {
      const docRef = doc(db, 'collections', userId);
      await setDoc(docRef, {
        ownerId: userId,
        cards: collectionMap,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (err) {
      console.warn('[Firebase Firestore] Failed to save collection to cloud:', err);
      return false;
    }
  }

  public async recordMatch(record: MatchResultRecord): Promise<boolean> {
    try {
      const docRef = doc(db, 'matches', record.matchId);
      await setDoc(docRef, {
        ...record,
        timestamp: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.warn('[Firebase Firestore] Failed to record match to cloud:', err);
      return false;
    }
  }

  public async getLeaderboard(limitCount = 20): Promise<CloudLeaderboardEntry[]> {
    try {
      const q = query(
        collection(db, 'leaderboards'),
        orderBy('rating', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      const list: CloudLeaderboardEntry[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as CloudLeaderboardEntry);
      });
      return list;
    } catch (err) {
      console.warn('[Firebase Firestore] Failed to fetch leaderboard, generating fallback:', err);
      return [
        { userId: 'mendeleev_ai', username: 'Dmitri Mendeleev', displayName: 'Dmitri Mendeleev (AI Master)', rating: 2850, rankTier: 'GRANDMASTER', wins: 142, losses: 8, winRate: 94.6 },
        { userId: 'marie_curie', username: 'Marie Curie', displayName: 'Marie Curie (Nobel Pioneer)', rating: 2710, rankTier: 'MASTER', wins: 128, losses: 14, winRate: 90.1 },
        { userId: 'linus_pauling', username: 'Linus Pauling', displayName: 'Linus Pauling (Electronegativity)', rating: 2540, rankTier: 'DIAMOND', wins: 95, losses: 19, winRate: 83.3 },
        { userId: 'gilbert_lewis', username: 'Gilbert N. Lewis', displayName: 'G. N. Lewis (Octet Master)', rating: 2380, rankTier: 'PLATINUM', wins: 78, losses: 22, winRate: 78.0 }
      ];
    }
  }

  public async updateLeaderboardEntry(userId: string, entry: Partial<CloudLeaderboardEntry>): Promise<boolean> {
    try {
      const docRef = doc(db, 'leaderboards', userId);
      await setDoc(docRef, {
        userId,
        ...entry,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (err) {
      console.warn('[Firebase Firestore] Failed to update leaderboard entry:', err);
      return false;
    }
  }

  // --- AUTOMATIC SYNC OF OFFLINE DATA TO CLOUD ---

  public async autoSyncOfflineData(userId: string): Promise<void> {
    try {
      const localProfile = GameStorage.loadProfile();
      await this.saveProfile(userId, localProfile);
      const collectionMap = localProfile.cardCollection || localProfile.collection;
      if (collectionMap) {
        await this.saveCollection(userId, collectionMap);
      }
      console.info('[Firebase Sync] Offline player data successfully synced to Cloud Firestore for user:', userId);
    } catch (err) {
      console.warn('[Firebase Sync] Auto-sync skipped or deferred:', err);
    }
  }
}

export const firebaseService = FirebaseService.getInstance();
