import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjbdgFZP-TYZ3jFMcwzs1Q23GMDiAknRU",
  authDomain: "my-splash-23e53.firebaseapp.com",
  projectId: "my-splash-23e53",
  storageBucket: "my-splash-23e53.firebasestorage.app",
  messagingSenderId: "926782990890",
  appId: "1:926782990890:web:07b5eb1d754faa83273153",
  measurementId: "G-9C321G2T3Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const githubProvider = new GithubAuthProvider();
const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { app, auth, db, signInWithGoogle, signInWithGithub, logout };
