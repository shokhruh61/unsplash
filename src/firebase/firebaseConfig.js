import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgq9_xbC2zMLV_gIrGlBnpryRN_toiHW4",
  authDomain: "login-signup-auth-ks.firebaseapp.com",
  projectId: "login-signup-auth-ks",
  storageBucket: "login-signup-auth-ks.appspot.com",
  messagingSenderId: "153852426357",
  appId: "1:153852426357:web:0dace21431a9f096a2203c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
