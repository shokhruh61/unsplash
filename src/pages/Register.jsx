import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import FormInput from "../components/FormInput";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { fullName, email, password } = formData;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password)
      return toast.error("All fields are required!");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters!");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful!");
    } catch (err) {
      toast.error(
        err.code == "auth/email-already-in-use"
          ? "Email already registered!"
          : "An error occurred!",
      );
    }
  };

  useEffect(() => {
    if (!loading && user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-black">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-4"
      >
        {["fullName", "Email", "Password"].map((field) => (
          <FormInput
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="h-12 w-full rounded-lg border px-4 outline-none focus:border-purple-500"
          />
        ))}
        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-purple-700 text-white"
        >
          Register
        </button>
      </form>
      <ToastContainer />
      <button
        onClick={signInWithGoogle}
        className="mt-4 flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-gray-100 font-medium text-black"
      >
        <FcGoogle className="h-6 w-6" />
        Sign in with Google
      </button>
      <p className="mt-2 text-gray-600">
        Sizni accountingiz bormi?
        <Link to="/login" className="text-purple-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
