// firebase.js
import { initializeApp } from "firebase/app";

// Bu yerga Firebase konfiguratsiya ma'lumotlarini joylashtirasiz:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_APP",
  storageBucket: "YOUR_APP.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Firebase initialize
const app = initializeApp(firebaseConfig);

// Agar Analytics kerak bo'lsa

export default app;
