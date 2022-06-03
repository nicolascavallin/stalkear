import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAji9R3RvQcEgLnl-iHbxI79RXa6etzCDA",
  authDomain: "stalkear-app.firebaseapp.com",
  projectId: "stalkear-app",
  storageBucket: "stalkear-app.appspot.com",
  messagingSenderId: "880669493992",
  appId: "1:880669493992:web:88d4005edcd6e8b26bd75d",
  measurementId: "G-M290W4CJN6",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();

export default firebaseConfig;
