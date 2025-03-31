import { Form, Link } from "react-router-dom";
import { FormInput } from "../components";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "../hooks/useRegister";

function Register() {
  const { registerWithGoogle } = useRegister();

  return (
    <div className="mx-auto my-36 w-full max-w-[700px] rounded-xl border border-red-600 p-10 shadow-md shadow-gray-700 transition-all duration-300 hover:shadow-xl">
      <form method="post" className="mx-auto max-w-96">
        <h1 className="my-3 text-center text-2xl font-bold">Register</h1>

        <div className="flex flex-col gap-5">
          <FormInput placeholder="Full Name" name="displayName" type="text" />
          <FormInput placeholder="Email" name="email" type="email" />
          <FormInput placeholder="Password" name="password" type="password" />
          <FormInput
            placeholder="Re-enter Password"
            name="repassword"
            type="password"
          />
        </div>

        <div className="my-4 flex flex-col gap-3 md:flex-row">
          <button type="submit" className="btn btn-primary grow">
            Register
          </button>
          <button
            onClick={async () => {
              try {
                await registerWithGoogle();
              } catch (error) {
                console.error("Google register failed:", error);
              }
            }}
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
            Already have an account? Login here.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
