import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="mb-4 w-64 rounded border border-gray-300 p-2"
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 w-64 rounded border border-gray-300 p-2"
      />

      <div className="flex gap-6">
        <button className="w-[110px] rounded bg-blue-500 p-2 text-white">
          Login
        </button>
        <button className="flex w-[110px] items-center gap-2 rounded bg-blue-500 p-2 text-white">
          <FcGoogle className="h-5 w-5" />
          Google
        </button>
      </div>

      <button
        onClick={() => navigate("/auth/register")}
        className="mt-4 text-blue-500 underline"
      >
        Don't have an account? Register
      </button>
    </div>
  );
}

export default Login;
