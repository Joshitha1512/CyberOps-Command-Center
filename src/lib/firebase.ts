import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBPbZwJ9Okk084S734NIBYKZJNUJ2ycM0I",
  authDomain: "cyber-dashboard-124e4.firebaseapp.com",
  projectId: "cyber-dashboard-124e4",
  storageBucket: "cyber-dashboard-124e4.firebasestorage.app",
  messagingSenderId: "919266433790",
  appId: "1:919266433790:web:99b5ee537663f41d5b63af",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export default app;
