import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/store";
import Splash from "../assets/images/splash.png";
import { Link } from "react-router-dom";
import { FaDownload, FaRegHeart } from "react-icons/fa";
import { CiDark, CiLight } from "react-icons/ci";

function Header() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDark);

  const likedImages = JSON.parse(localStorage.getItem("likedImages") || "[]");

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-100 text-black"
      }`}
    >
      <header className="container max-w-[1440px] mx-auto p-2">
        <div className=" text-white p-4 rounded-lg flex justify-between items-center">
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
            <ul className="flex items-center gap-8 ">
              <li>
                <Link
                  className={`font-medium text-xl hover:bg-gray-600 py-2 px-3 rounded-md ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`font-medium text-xl hover:bg-gray-600 py-2 px-3 rounded-md ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={`font-medium text-xl hover:bg-gray-600 py-2 px-3 rounded-md ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-5 relative">
            <Link to={"/download-image"}>
              <FaDownload
                className={`w-7 h-7 cursor-pointer rounded-md ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              />
            </Link>

            <div className="relative">
              <Link to={"/liked-image"}>
                <FaRegHeart
                  className={`w-7 h-7 cursor-pointer rounded-md ${
                    isDarkMode ? "text-white" : "text-black"
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
                <CiDark className="w-8 h-8 font-bold text-2xl cursor-pointer rounded-md text-white" />
              ) : (
                <CiLight className="w-8 h-8 font-bold text-2xl cursor-pointer rounded-md text-black" />
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
