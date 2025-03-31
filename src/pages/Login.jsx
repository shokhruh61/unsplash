import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,  signInWithGoogle } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [Data, setData] = useState(initialState);
  const { password, email } = Data;
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Email-id is required!");
    } else if (password === "") {
      toast.error("Password is required!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((err) => {
          if (err.code === "auth/invalid-email") {
            toast.error("Invalid email id!");
          }
          if (err.code === "auth/user-not-found") {
            toast.error("User not registered!");
          }
          if (err.code === "auth/wrong-password") {
            toast.error("You entered wrong password!");
          }
          if (err.code === "auth/too-many-requests") {
            toast.error("Too many attempts, Please try after sometime!");
          }
        });
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      
      {error && <div className="my-4 text-center"> {error.message} </div>}
      <form
        onSubmit={handlesubmit}
        className="flex flex-col items-center justify-center"
      >
        <label className="relative">
          <input
            type="text"
            name="email"
            value={email}
            id="email"
            onChange={handleChange}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
          <span className="input-text absolute left-0 top-5 mx-6 px-2 text-gray-500 transition duration-300">
            {email ? "" : "Email"}
          </span>
        </label>
        <label className="relative">
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={handleChange}
            className="xs:w-[360px] xs:h-[40px] mx-1 my-2 h-[30] w-[270px] rounded-full border-[1px] border-gray-400 px-6 py-3 outline-none transition duration-200 focus:border-purple-500 md:h-[50px] md:w-[450px]"
          />
          <span className="input-text absolute left-0 top-5 mx-6 w-[80px] px-2 text-gray-500 transition duration-300">
            {password ? "" : "Password"}
          </span>
        </label>
        <button
          type="submit"
          className="xs:w-[360px] xs:h-[40px] mt-5 h-[30] w-[270px] rounded-full bg-purple-700 p-2 text-base font-medium text-white md:mt-4 md:h-[50px] md:w-[450px] md:p-0 md:font-semibold"
        >
          login
        </button>
      </form>
      <ToastContainer />
      
      <div className="flex flex-col items-center">
        <button
          type="submit"
          className="mt-5 flex h-[30] w-[270px] items-center justify-center rounded-full bg-gray-100 p-2 text-base font-medium text-black sm:h-[40px] sm:w-[360px] md:mt-4 md:h-[50px] md:w-[450px] md:p-0"
          onClick={() => signInWithGoogle()}
        >
          Login with Google
          <FcGoogle className="mr-[6px] h-[25px] md:h-[28px]" />
        </button>
        
        <div className="mb-5 mt-2 text-gray-600">
          Don't have an account?{" "}
          <Link to={"/register"}>
            <span className="font-medium text-purple-500">Register here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
