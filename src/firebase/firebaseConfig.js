import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlXebCJnOQqCd194aJIbHeoNwTqWpdIDU",
  authDomain: "fir-7c401.firebaseapp.com",
  projectId: "fir-7c401",
  storageBucket: "fir-7c401.firebasestorage.app",
  messagingSenderId: "915828092247",
  appId: "1:915828092247:web:6dca8c534a92780de66212",
  measurementId: "G-J4G1K6L664",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
