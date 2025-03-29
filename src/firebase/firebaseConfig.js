import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjbdgFZP-TYZ3jFMcwzs1Q23GMDiAknRU",
  authDomain: "my-splash-23e53.firebaseapp.com",
  projectId: "my-splash-23e53",
  storageBucket: "my-splash-23e53.firebasestorage.app",
  messagingSenderId: "926782990890",
  appId: "1:926782990890:web:07b5eb1d754faa83273153",
  measurementId: "G-9C321G2T3Y",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
