import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "../hooks/useRegister"; 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { registerWithGoogle, registerWithEmail } = useRegister(); 

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
      registerWithEmail(fullName, email, password); 
    }
  };

  return (
    <div className="mx-auto max-w-[100%]">
      <h1 className="mt-5 p-2 text-center text-2xl text-black font-bold">
        REGISTER
      </h1>

      <form
        onSubmit={handlesubmit}
        className="flex flex-col items-center justify-center"
      >
        <label className="relative">
          <input
            placeholder="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
        </label>

        <label className="relative">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
        </label>

        <label className="relative">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
        </label>

        <button
          type="submit"
          className="xs:w-[360px] xs:h-[40px] mt-5 h-[30] w-[270px] rounded-full bg-purple-500 p-2 text-base text-white hover:bg-purple-700 md:mt-4 md:h-[50px] md:w-[450px] md:p-0"
        >
          REGISTER
        </button>
        <ToastContainer />
      </form>

      <div className="flex flex-col items-center">
        <button
          type="submit"
          className="xs:w-[360px] xs:h-[40px] mt-5 flex h-[30] w-[270px] items-center justify-center rounded-full border-[2px] border-gray-200 bg-white p-2 text-base font-medium md:mt-4 text-black gap-5 md:h-[50px] md:w-[450px] md:p-0"
          onClick={registerWithGoogle}
        >
          With Google
          <FcGoogle className="w-8 h-8" />
        </button>

        <div className="mb-5 mt-2 text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="font-medium text-purple-500">Login</span>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
