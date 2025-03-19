import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/store";
import { Link } from "react-router-dom";
import { FaDownload, FaRegHeart } from "react-icons/fa";
import { CiDark, CiLight } from "react-icons/ci";
import Splash from "../assets/images/splash.png";

function Header() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDark);

  const likedImages = JSON.parse(localStorage.getItem("likedImages")) || [];

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-100 text-black"
      }`}
    >
      <header className="container max-w-[1440px] mx-auto flex justify-between items-center p-2">
        <div>
          <Link to="/">
            <img
              className="w-14 h-14 rounded-3xl"
              src={Splash}
              alt="Unsplash logo"
            />
          </Link>
        </div>

        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                className={`font-medium text-xl hover:bg-slate-600 py-2 px-3 rounded-md ${
                  isDarkMode ? "text-white dark:text-gray-300" : "text-black"
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`font-medium text-xl hover:bg-slate-600 py-2 px-3 rounded-md ${
                  isDarkMode ? "text-white dark:text-gray-300" : "text-black"
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={`font-medium text-xl hover:bg-slate-600 py-2 px-3 rounded-md ${
                  isDarkMode ? "text-white dark:text-gray-300" : "text-black"
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-5 relative">
          <FaDownload
            className={`w-7 h-7 cursor-pointer rounded-md ${
              isDarkMode ? "text-white dark:text-gray-300" : "text-black"
            }`}
          />

          <div className="relative">
            <Link to={"/download-image"}>
              <FaRegHeart
                className={`w-7 h-7 cursor-pointer rounded-md ${
                  isDarkMode ? "text-white dark:text-gray-300" : "text-black"
                }`}
              />
            </Link>
            {likedImages.length > 0 && (
              <Link to={"/liked-image"}>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {likedImages.length}
                </span>
              </Link>
            )}
          </div>

          <button onClick={() => dispatch(toggleDarkMode())}>
            {isDarkMode ? (
              <CiDark className="w-8 h-8 cursor-pointer rounded-md text-white dark:text-gray-300" />
            ) : (
              <CiLight className="w-8 h-8 cursor-pointer rounded-md text-black" />
            )}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
