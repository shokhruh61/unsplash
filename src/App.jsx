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
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoutes";

import { useGlobalContext } from "./hooks/useGlobalContext";

function App() {
  const { user } = useGlobalContext();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <MainLayout />
        </ProtectedRoute>
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
          element: (
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
