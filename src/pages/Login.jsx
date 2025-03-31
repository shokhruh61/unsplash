import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { useRegister } from "../hooks/useRegister"; // Import custom hook

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [Data, setData] = useState(initialState);
  const { email, password } = Data;
  const { registerWithEmail, registerWithGoogle } = useRegister(); // Custom hook for login
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      await registerWithEmail(email, password);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="mt-5 p-2 text-center text-2xl font-medium text-gray-800">
        LOGIN
      </h1>

      <form
        onSubmit={handleSubmit} // Faqat tugmani bosganda yuboriladi
        className="flex flex-col items-center justify-center"
      >
        <label className="relative">
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
        </label>
        <label className="relative">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
        </label>
        <button
          type="submit"
          className="xs:w-[360px] xs:h-[40px] mt-5 h-[30] w-[270px] rounded-full bg-purple-700 p-2 text-base font-medium text-white md:mt-4 md:h-[50px] md:w-[450px] md:p-0 md:font-semibold"
        >
          LOGIN
        </button>
      </form>

      <div className="flex flex-col items-center">
        <button
          type="button"
          className="mt-5 flex h-[30] w-[270px] items-center justify-center gap-2 rounded-full bg-gray-100 p-2 text-base font-medium text-black sm:h-[40px] sm:w-[360px] md:mt-4 md:h-[50px] md:w-[450px] md:p-0"
          onClick={registerWithGoogle}
        >
          Google
          <FcGoogle className="mr-[6px] h-[25px] md:h-[28px]" />
        </button>

        <div className="mb-5 mt-2 text-gray-600">
          Don't have an account?{" "}
          <Link to={"/register"}>
            <span className="font-medium text-purple-500">Register here</span>
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
