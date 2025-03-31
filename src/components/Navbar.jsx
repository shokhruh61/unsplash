import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaDownload, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FaUnsplash } from "react-icons/fa6";
import { useSelector } from "react-redux"; // ✅ Redux'dan like sonini olish
import { useGlobalContext } from "../hooks/useGlobalContext";
import { NavLinks } from "./";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, dispatch } = useGlobalContext();
  const likedImages = useSelector((state) => state.likedImages); // ✅ Like bosilgan rasmlar
  const navigate = useNavigate(); // ✅ Router navigatsiya

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dracula" : "light",
    );
    localStorage.setItem("theme", theme);
  }, [theme]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      navigate("/login"); // ✅ Logout bo‘lgandan keyin login sahifasiga yuborish
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <header className="bg-base-200 fixed top-0 left-0 w-full shadow-md z-[1000]">
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
            <button>
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
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />
            <FaSun className="swap-on h-6 w-6 fill-current" />
            <FaMoon className="swap-off h-6 w-6 fill-current" />
          </label>

          {user ? (
            <div className="dropdown dropdown-end flex items-center gap-4">
              <span>{user.displayName?.split(" ")[0] || "User"}</span>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    src={user.photoURL || "https://picsum.photos/200/200"}
                    alt="User"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={signOutUser}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
