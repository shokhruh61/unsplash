import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, About, Contact, Likedimages } from "./pages";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout"; // ✅ AuthLayout import qilindi
import Login from "./pages/Login";
import Register from "./pages/Register";
import { GlobalContextProvider } from "./context/GlobalContext"; // ✅ Global Context qo'shildi

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "liked-images", element: <Likedimages /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />, // ✅ Auth sahifalari uchun layout
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

function App() {
  return (
    <GlobalContextProvider>
      <RouterProvider router={routes} />
    </GlobalContextProvider>
  );
}

export default App;
