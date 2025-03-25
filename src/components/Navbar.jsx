import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FcStackOfPhotos } from "react-icons/fc";
import { useSelector } from "react-redux"; // ✅ Redux'dan like sonini olish
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig"; // ✅ Firebase autentifikatsiyasi uchun
import { NavLinks } from "./";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

function Navbar() {
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const likedImages = useSelector((state) => state.likedImages); // ✅ Like bosilgan rasmlar
  const [user] = useAuthState(auth); // ✅ Foydalanuvchi ma'lumotlarini olish

  const toggleTheme = () => {
    const newTheme = theme === "winter" ? "dark" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-300">
      <div className="container navbar mx-auto max-w-[1440px]">
        <div className="navbar-start">
          <Link to={"/"} className="hidden md:flex">
            <FcStackOfPhotos className="h-10 w-10" />
          </Link>

          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button">
              <FcStackOfPhotos className="h-10 w-10" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal rounded-box">
            <NavLinks />
          </ul>
        </div>

        {/* ✅ Navbar End */}
        <div className="navbar-end flex items-center gap-5">
          <div className="indicator">
            <span className="badge badge-secondary badge-sm indicator-item">
              0
            </span>
            <button className="">
              <FaDownload className="h-6 w-6" />
            </button>
          </div>
          <Link to={"/liked-images"}>
            <div className="indicator">
              <span className="badge badge-secondary badge-sm indicator-item">
                {likedImages.length}
              </span>
              <button>
                <FaHeart className="h-6 w-6" />
              </button>
            </div>
          </Link>

          {/* ✅ Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              onClick={toggleTheme}
            />

            <FaSun className="swap-off h-6 w-6 fill-current" />

            <FaMoon className="swap-on h-6 w-6 fill-current" />
          </label>
          {/* ✅ Profil rasmi */}
          {user && user.photoURL ? (
            <Link to="/profile">
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-purple-500"
              />
            </Link>
          ) : (
            <Link to="/profile">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-500 bg-gray-300 text-gray-600">
                ?
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
