import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FcStackOfPhotos } from "react-icons/fc";
import { NavLinks } from "./";
import { useSelector } from "react-redux"; // ✅ Redux'dan like sonini olish

const themeFromLoaclStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

function Navbar() {
  const [theme, setTheme] = useState(themeFromLoaclStorage());
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
        </div>
      </div>
    </header>
  );
}

export default Navbar;
