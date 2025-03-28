import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";
import { useNavigate } from "react-router-dom"; // 🔹 navigate qo‘shildi

export const useAuth = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate(); // 🔹 Sahifaga yo‘naltirish uchun

  const signInOrRegisterWithGoogle = async () => {
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
        localStorage.setItem("user", JSON.stringify(user)); // 🔹 Foydalanuvchini saqlash

        toast.success(`Welcome, ${user.displayName}!`);
        navigate("/"); // 🔹 Home sahifaga yo‘naltirish
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { signInOrRegisterWithGoogle };
};
