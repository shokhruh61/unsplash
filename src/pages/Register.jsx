import React, { useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom"; // 🔹 useNavigate import
import { FormInput } from "../components";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hooks/useRegister";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Register() {
  const { signInOrRegisterWithGoogle } = useAuth();
  const { user } = useGlobalContext();
  const navigate = useNavigate(); // 🔹 navigate ishlatish

  // 🔹 Agar user oldindan mavjud bo'lsa, avtomatik home pagega o'tkazish
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="mx-auto my-36 w-full max-w-[700px] rounded-xl border border-red-600 p-10 shadow-md shadow-gray-700 transition-all duration-300 hover:shadow-xl">
      <Form method="post" className="mx-auto max-w-96">
        <h1 className="my-3 text-center text-2xl font-bold">Register</h1>

        <div className="flex flex-col gap-5">
          <FormInput placeholder="Full Name" name="name" type="text" />
          <FormInput placeholder="Email" name="email" type="email" />
          <FormInput placeholder="Password" name="password" type="password" />
          <FormInput
            placeholder="Re Password"
            name="repassword"
            type="password"
          />
        </div>

        <div className="my-4 flex flex-col gap-3 md:flex-row">
          <button type="submit" className="btn btn-primary grow">
            Register
          </button>
          <button
            onClick={signInOrRegisterWithGoogle}
            type="button"
            className="btn btn-secondary grow"
          >
            Google
            <FcGoogle />
          </button>
        </div>

        <div className="mt-2 flex-col justify-between text-center md:mt-0 md:flex-row">
          <Link
            to={"/login"}
            className="link link-primary text-lg text-white md:text-black"
          >
            you don't have account yet ?
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
