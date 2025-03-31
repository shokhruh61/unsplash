import { Form, Link } from "react-router-dom";
import { FormInput } from "../components";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "../hooks/useRegister";
function Login() {
  const { registerWithGoogle } = useRegister();

  return (
    <div className="mx-auto my-36 w-full max-w-[700px] rounded-xl border border-red-600 p-10 shadow-md shadow-gray-700 transition-all duration-300 hover:shadow-xl">
      <Form method="post" className="mx-auto max-w-96">
        <h1 className="my-3 text-center text-2xl font-bold">Login</h1>

        <div className="flex flex-col gap-5">
          <FormInput placeholder="Email" name="email" type="email" />
          <FormInput placeholder="Password" name="password" type="password" />
        </div>
        <div className="my-4 flex flex-col gap-3 md:flex-row">
          <button type="submit" className="btn btn-primary grow">
            Login
          </button>
          <button
            onClick={registerWithGoogle}
            type="button"
            className="btn btn-secondary grow"
          >
            Google
            <FcGoogle />
          </button>
        </div>
        <div className="mt-2 flex flex-col justify-between text-center md:mt-0 md:flex-row">
          <p className="text-lg text-white md:text-black">Forgot Password ?</p>
          <Link
            to={"/register"}
            className="link link-primary text-lg text-white md:text-black"
          >
            you already have account ?
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
