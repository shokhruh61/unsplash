import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FormInput } from "../components";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/register");
  }, [user, loading, navigate]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Logged in successfully!");
    } catch (err) {
      const errorMessages = {
        "auth/invalid-email": "Invalid email!",
        "auth/user-not-found": "User not registered!",
        "auth/wrong-password": "Incorrect password!",
        "auth/too-many-requests": "Too many attempts, try later!",
      };
      toast.error(errorMessages[err.code] || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-10 text-2xl font-bold text-gray-50">Login</h1>
      <form onSubmit={handleSubmit} className="flex w-96 flex-col gap-4">
        <FormInput
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button
          type="submit"
          className="h-12 w-full rounded-full bg-purple-700 text-white"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
      <button
        onClick={signInWithGoogle}
        className="mt-4 flex h-12 w-96 items-center justify-center rounded-full bg-gray-100 text-black"
      >
        <FcGoogle className="mr-2 h-6 w-6" /> Login with Google
      </button>
      <p className="mt-2 text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-purple-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
