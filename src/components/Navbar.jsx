import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FcStackOfPhotos } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "winter");
  const likedImages = useSelector((state) => state.likedImages);
  const [user] = useAuthState(auth);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-300">
      <div className="container navbar mx-auto max-w-[1440px]">
        <div className="navbar-start">
          <Link to="/" className="flex">
            <FcStackOfPhotos className="h-10 w-10" />
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-5">
          <button>
            <FaDownload className="h-6 w-6" />
          </button>

          <Link to="/liked-images">
            <div className="indicator">
              <span className="badge badge-secondary indicator-item h-4 w-1">
                {likedImages.length}
              </span>
              <FaHeart className="h-6 w-6" />
            </div>
          </Link>

          <button
            onClick={() => setTheme(theme === "winter" ? "dark" : "winter")}
          >
            {theme === "winter" ? (
              <FaSun className="h-6 swap-on w-6" />
            ) : (
              <FaMoon className="h-6 swap-off w-6" />
            )}
          </button>

          <Link to="/profile">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                className="h-10 w-10 rounded-full border-2"
                alt="Profile"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-gray-300">
                ?
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
