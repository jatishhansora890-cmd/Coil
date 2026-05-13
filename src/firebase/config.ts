
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// These variables must be set in your Vercel Project Settings -> Environment Variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
} {
  // Strict check: We need at least the API Key and Project ID to initialize Firestore safely
  const isConfigured = 
    !!firebaseConfig.apiKey && 
    !!firebaseConfig.projectId && 
    firebaseConfig.apiKey !== "PLACEHOLDER";
  
  // Use real config if available, otherwise use a safe dummy that won't crash the SDK
  const app = getApps().length === 0 
    ? initializeApp(isConfigured ? firebaseConfig : { 
        apiKey: "dummy-key", 
        projectId: "dummy-project-id",
        authDomain: "dummy.firebaseapp.com",
        storageBucket: "dummy.appspot.com",
        messagingSenderId: "000000000000",
        appId: "1:000000000000:web:000000000000"
      }) 
    : getApps()[0];
    
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  return { app, auth, db };
}
