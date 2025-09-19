import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdClT0GBsv0WakLRRABQjiN3lROHBuANs",
  authDomain: "carbon-fiesta.firebaseapp.com",
  projectId: "carbon-fiesta",
  storageBucket: "carbon-fiesta.appspot.com", // <-- Correct this line
  messagingSenderId: "106298356189",
  appId: "1:106298356189:web:6784ce28d88a78a4bbc634"
};
// Initialize Firebase only if an app instance does not exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);