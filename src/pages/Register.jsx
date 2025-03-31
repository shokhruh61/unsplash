import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!fullName) toast.error("Full Name is required!");
    else if (!email) toast.error("Email is required!");
    else if (!password) toast.error("Password is required!");
    else if (password.length < 8)
      toast.error("Password must be at least 8 characters!");
    else {
      createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        error.code === "auth/email-already-in-use"
          ? toast.error("Email already registered, login to continue")
          : toast.error("An error occurred, please try again");
      });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  return (
    <div className="mt-5 flex flex-col items-center">
      <form
        onSubmit={handlesubmit}
        className="flex w-full max-w-md flex-col items-center"
      >
        <input
          placeholder="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="my-2 h-12 w-full rounded-full border px-6 outline-none focus:border-purple-500"
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-2 h-12 w-full rounded-full border px-6 outline-none focus:border-purple-500"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-2 h-12 w-full rounded-full border px-6 outline-none focus:border-purple-500"
        />
        <button className="mt-4 h-12 w-full rounded-full bg-purple-500 font-semibold text-white hover:bg-purple-700">
          Register
        </button>
      </form>
      <ToastContainer />
      <button
        className="mt-4 flex h-12 w-full max-w-md items-center justify-center rounded-full border border-gray-200 bg-white"
        onClick={() => signInWithGoogle()}
      >
        With Google <FcGoogle className="ml-2 h-6" />
      </button>
      <p className="mt-2 text-gray-600">
        Already have an account?
        <Link to="/login" className="ml-1 font-medium text-purple-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
