// Firebase configuration using environment variables
// This file can be used when environment variables are available

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDMuyqu8Sp_7UNWYlAfdW6gBdT7fR0DBJA",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "lockard-llc.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "lockard-llc",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "lockard-llc.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "207878838967",
  appId: process.env.FIREBASE_APP_ID || "1:207878838967:web:565c86060a9e5408c74b32",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-ZSSGH36898"
};

// Export configuration
export default firebaseConfig;

// Also export individual values if needed
export const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} = firebaseConfig;
