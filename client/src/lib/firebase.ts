import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo'}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo',
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo'}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:demo',
};

let app: any = null;
let auth: any = null;

// Only initialize Firebase if we have real config
if (import.meta.env.VITE_FIREBASE_API_KEY) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { app, auth };

// Initialize messaging if supported
export const getMessagingInstance = async () => {
  if (app && await isSupported()) {
    return getMessaging(app);
  }
  return null;
};
