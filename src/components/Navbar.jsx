import { Link, useNavigate } from "react-router-dom";
import { FaDownload, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FaUnsplash } from "react-icons/fa6";
import { useSelector } from "react-redux"; // ✅ Like sonini olish
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLinks } from "./";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user } = useContext(GlobalContext);
  const likedImages = useSelector((state) => state.likedImages);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(
    user?.photoURL ||
      localStorage.getItem("userPhoto") ||
      "https://picsum.photos/200/300",
  );
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
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  useEffect(() => {
    const storedPhoto = localStorage.getItem("userPhoto");
    if (storedPhoto) {
      setProfileImage(storedPhoto);
    }
  }, []);

  return (
    <header className="fixed left-0 top-0 z-[1000] w-full bg-base-200 shadow-md">
      <div className="container navbar mx-auto max-w-[1440px]">
        <div className="navbar-start">
          <Link to={"/"} className="hidden md:flex">
            <FaUnsplash className="h-10 w-10" />
          </Link>
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
                    src={profileImage}
                    alt="User"
                    className="w-8 cursor-pointer rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
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
