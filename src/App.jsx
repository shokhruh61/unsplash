import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Home, About, Contact, Likedimages, ImageInfo } from "./pages";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
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
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "liked-images", element: <Likedimages /> },
        { path: "imageInfo/:id", element: <ImageInfo /> },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/register",
      element: user ? <Navigate to={"/"} /> : <Register />,
    },
    {
      path: "/login",
      element: user ? <Navigate to={"/"} /> : <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
