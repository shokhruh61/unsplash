import React from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

function Register() {
  return (
    <div>
      <form className="flex" method="post">
        <div className="w-[40%] bg-[url('https://picsum.photos/800/1200')] bg-cover bg-center"></div>
        <div className="flex min-h-screen w-[60%] flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
          <h1 className="mb-5 text-center text-3xl font-medium">Register</h1>

          <label className="input-bordered input flex w-96 items-center gap-2">
            <input
              type="text"
              className="grow rounded-md border p-2"
              placeholder="Username"
            />
            <FaUser className="h-5 w-5 text-gray-500" />
          </label>

          <label className="input-bordered input flex w-96 items-center gap-2">
            <input
              type="text"
              className="grow rounded-md border p-2"
              placeholder="Email"
            />
            <MdEmail className="h-5 w-5 text-gray-500" />
          </label>

          <label className="input-bordered input flex w-96 items-center gap-2">
            <input
              type="password"
              className="grow rounded-md border p-2"
              placeholder="Password"
            />
            <FaKey className="h-5 w-5 text-gray-500" />
          </label>

          <label className="input-bordered input flex w-96 items-center gap-2">
            <input
              type="password"
              className="grow rounded-md border p-2"
              placeholder="Confirm Password"
            />
            <FaKey className="h-5 w-5 text-gray-500" />
          </label>

          <div className="mx-auto my-4 flex w-96 flex-col gap-2">
            <button
              type="submit"
              className="btn btn-primary mx-auto w-64 rounded-md border-0 bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-secondary mx-auto flex w-64 items-center justify-center gap-2 rounded-md border-0 bg-gray-600 py-2 text-white hover:bg-gray-700"
            >
              Google <FcGoogle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
