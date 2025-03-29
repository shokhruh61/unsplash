import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();

  const registerWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const user = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome, ${user.displayName}!`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { registerWithGoogle };
};
