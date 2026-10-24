// src/services/firebaseConfig.ts
// Robust Firebase Client SDK Initializer with Graceful Fallback & Emulator Support

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

export interface FirebaseConfigOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

// Default public configuration for ELEMENTA platform demo
// Real credentials can be injected via .env / Vite env variables
const defaultFirebaseConfig: FirebaseConfigOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoElementaPlatformKey2026',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'elementa-tactical-chemistry.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'elementa-tactical-chemistry',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'elementa-tactical-chemistry.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '10485762026',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:10485762026:web:7f8d9e0a1b2c3d4e5f'
};

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'demo-project'
);

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(defaultFirebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// Local Emulator Suite integration
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' || typeof window !== 'undefined' && window.location.search.includes('emulator=true')) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.info('[Firebase] Connected to Local Firebase Emulator Suite (Auth: 9099, Firestore: 8080)');
  } catch {
    // Emulator might already be attached
  }
}

export default app;
