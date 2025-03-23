import React from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Foydalanuvchi ro‘yxatdan o‘tdi");
    navigate("/auth/login"); // Ro‘yxatdan o‘tgach, Login sahifasiga yo‘naltirish
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-5 text-center text-3xl font-medium">Register</h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center gap-3"
      >
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
      </form>

      <button
        onClick={() => navigate("/auth/login")}
        className="mt-4 text-blue-500 underline"
      >
        Already have an account? Login
      </button>
    </div>
  );
}

export default Register;
