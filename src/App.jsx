import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Likedimages,
  ImageInfo,
  Register,
  Login,
} from "./pages";
import MainLayout from "./layouts/MainLayout";
import { action as HomeAction } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebaseConfig"; // ✅ Firebase auth import

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: user ? (
        <MainLayout />
      ) : (
        <Navigate to={user ? "/login" : "/register"} />
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "liked-images",
          element: <Likedimages />,
        },
        {
          path: "imageInfo/:id",
          element: <ImageInfo />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
