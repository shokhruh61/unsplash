// import { toast } from "react-toastify";
// import { auth } from "../firebase/firebaseConfig";
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { useGlobalContext } from "./useGlobalContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export const useRegister = () => {
//   const { user, authReady } = useGlobalContext();
//   const { dispatch } = useGlobalContext();
//   const navigate = useNavigate();

//   const registerWithGoogle = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       dispatch({ type: "LOGIN", payload: user });
//       toast.success(`Welcome ${user.displayName}`);

//       setTimeout(() => {
//         navigate("/");
//       });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const registerWithEmail = async (displayName, email, password) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       const user = userCredential.user;

//       // Foydalanuvchi nomini yangilash
//       await updateProfile(user, { displayName });

//       // Global kontekstga foydalanuvchini yuklash
//       dispatch({ type: "LOGIN", payload: { ...user, displayName } });

//       toast.success(`Welcome ${displayName}`);

//       setTimeout(() => {
//         navigate("/");
//       });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch({ type: "LOGIN", payload: user });
//         dispatch({ type: "AUTH_READY" });
//       } else {
//         dispatch({ type: "LOGOUT" });
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   useEffect(() => {
//     if (authReady && user) {
//       navigate("/");
//     }
//   }, [authReady, user, navigate]);

//   return { registerWithGoogle, registerWithEmail };
// };
