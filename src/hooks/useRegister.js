import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const registerWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch({ type: "LOGIN", payload: user }); // 🔥 Contextga userni yozamiz
      toast.success(`welcome ${user.displayName}`);

      navigate("/"); // 🔥 Home sahifaga o'tkazish
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { registerWithGoogle };
};
