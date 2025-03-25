import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FormInput } from "../components";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(initialState);
  const { email, password } = data;
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email kiritish shart!");
      return;
    }
    if (!password) {
      toast.error("Parol kritish shart!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Muvaffaqiyatli tizimga kirdingiz!");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          toast.error("bunday email royxatdan o'tmagan");
          break;
        case "auth/user-not-found":
          toast.error("user royxatdan o'tmagan");
          break;
        case "auth/wrong-password":
          toast.error("Noto‘g‘ri parol!");
          break;
        case "auth/too-many-requests":
          toast.error("Juda ko‘p urinish, keyinroq qayta urinib ko‘ring!");
          break;
        default:
          toast.error("Nimadir xato ketdi!");
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mt-5 text-2xl font-medium text-black">Login</h1>

      {error && (
        <div className="my-4 text-center text-red-500">{error.message}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-96 flex-col items-center gap-5"
      >
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="h-12 w-full rounded-full border border-gray-400 px-6 outline-none transition duration-200 focus:border-purple-500"
          placeholder="Email"
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="h-12 w-full rounded-full border border-gray-400 px-6 outline-none transition duration-200 focus:border-purple-500"
          placeholder="Password"
        />

        <button
          type="submit"
          className="mt-5 h-12 w-full max-w-[450px] rounded-full bg-purple-700 font-semibold text-white"
        >
          Submit
        </button>
      </form>

      <ToastContainer />

      <button
        onClick={signInWithGoogle}
        className="mt-5 flex h-12 w-full max-w-[450px] items-center justify-center rounded-full bg-gray-100 font-medium text-black"
      >
        <FcGoogle className="mr-2 h-6 w-6" />
        Login with Google
      </button>

      <p className="mt-2 text-gray-600">
        Don't have an account?
        <Link to={"/register"} className="ml-1 font-medium text-purple-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
