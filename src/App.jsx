import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LikedImage from "./pages/LikedImage";
import Downloadimage from "./pages/Download";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

function App() {
  const isDarkMode = useSelector((state) => state.darkMode.isDark);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Provider store={store}>
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-all">
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/Contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/liked-image"
            element={
              <MainLayout>
                <LikedImage />
              </MainLayout>
            }
          />
          <Route
            path="/download-image"
            element={
              <MainLayout>
                <Downloadimage />
              </MainLayout>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
