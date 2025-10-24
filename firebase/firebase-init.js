// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMuyqu8Sp_7UNWYlAfdW6gBdT7fR0DBJA",
  authDomain: "lockard-llc.firebaseapp.com",
  projectId: "lockard-llc",
  storageBucket: "lockard-llc.firebasestorage.app",
  messagingSenderId: "207878838967",
  appId: "1:207878838967:web:565c86060a9e5408c74b32",
  measurementId: "G-ZSSGH36898"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export for use in other files
export { app, analytics };
export default app;
