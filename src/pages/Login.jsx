import React from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div>
      <form className="flex">
        <div className="w-[40%] bg-[url('https://picsum.photos/800/1200')] bg-cover bg-center"></div>
        <div className="flex min-h-screen w-[60%] flex-col items-center justify-center">
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
        </div>
      </form>
    </div>
  );
}

export default Login;
