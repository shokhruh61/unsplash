import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FaUnsplash } from "react-icons/fa6";

import { useSelector } from "react-redux"; // ✅ Redux'dan like sonini olish
import { useGlobalContext } from "../hooks/useGlobalContext";
import { NavLinks } from "./";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

function Navbar() {
  const { user } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const likedImages = useSelector((state) => state.likedImages); // ✅ Like bosilgan rasmlar

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
            <FaUnsplash className="h-10 w-10" />
          </Link>

          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button">
              <FaUnsplash className="h-10 w-10" />
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
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <FaSun className="swap-off h-6 w-6 fill-current" />
            <FaMoon className="swap-on h-6 w-6 fill-current" />
          </label>

          <div className="dropdown dropdown-end flex items-center gap-4">
            {user.displayName.split(" ")[0]}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img src={user.PhotoURL} alt={user.displayName + ""} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
