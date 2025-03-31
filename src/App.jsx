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

} from "./pages";
import MainLayout from "./layouts/MainLayout";
import { useGlobalContext } from "./hooks/useGlobalContext";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const { user } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: user ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "liked-images", element: <Likedimages /> },
        { path: "imageInfo/:id", element: <ImageInfo /> },
        {
          path: "profile",
          element: (
            <ProtectedRoute user={user}>
           
            </ProtectedRoute>
          ),
        },
      ],
    },
   
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
