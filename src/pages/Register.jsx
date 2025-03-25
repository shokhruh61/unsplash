import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
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
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (fullName === "") {
      toast.error("Full Name is required!");
    } else if (password === "") {
      toast.error("Password is required!");
    } else if (password.length < 8) {
      toast.error("Password must atleast be of 8 characters!");
    } else if (email === "") {
      toast.error("Email-id is required!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((err) => {
          console.log("Firebase error:", err.code, err.message); // Xatoni konsolga chiqarish
          if (err.code === "auth/email-already-in-use") {
            toast.error("Email already registered, login to continue");
          } else {
            toast.error("Error occured, please try again");
          }
        });
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/about");
    }
  }, [user, loading, navigate]);

  return (
    <div className="mx-auto max-w-[100%]">
      <h1 className="mt-5 p-2 text-center text-2xl font-medium text-white">
        Registration
      </h1>
      {error && <div className="my-4 text-center"> {error.message} </div>}
      <Form
        onSubmit={handlesubmit}
        className="flex flex-col items-center justify-center"
      >
        <label className="relative">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
          <span className="input-text absolute left-0 top-5 mx-6 px-2 text-gray-500 transition duration-300">
            {fullName ? "" : "Full Name"}
          </span>
        </label>
        <label className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
          <span className="input-text absolute left-0 top-5 mx-6 px-2 text-gray-500 transition duration-300">
            {email ? "" : "Email"}
          </span>
        </label>
        <label className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
          <span className="input-text absolute left-0 top-5 mx-6 w-[80px] px-2 text-gray-500 transition duration-300">
            {password ? "" : "Password"}
          </span>
        </label>
        <button
          type="submit"
          className="xs:w-[360px] xs:h-[40px] mt-5 h-[30] w-[270px] rounded-full bg-purple-500 p-2 text-base text-white hover:bg-purple-700 md:mt-4 md:h-[50px] md:w-[450px] md:p-0"
        >
          Submit
        </button>
        <ToastContainer />
      </Form>
      <div className="flex flex-col items-center">
        <button
          type="submit"
          className="xs:w-[360px] xs:h-[40px] mt-5 flex h-[30] w-[270px] items-center justify-center gap-2 rounded-full border-[2px] border-gray-200 bg-white p-2 text-base font-medium text-black md:mt-4 md:h-[50px] md:w-[450px] md:p-0"
          onClick={() => signInWithGoogle()}
        >
          <FcGoogle className="h-9 w-9" />
          With Google
        </button>

        <div className="mb-5 mt-2 text-gray-600">
          Already have an account?
          <Link to={"/login"}>
            <span className="font-medium text-purple-500">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
