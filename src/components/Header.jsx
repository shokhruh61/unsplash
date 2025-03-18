import React from "react";
import Splash from "../assets/images/splash.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaRegHeart } from "react-icons/fa";
import { CiDark, CiLight } from "react-icons/ci";
function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDark = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className="bg-slate-900">
      <header className="container max-w-[1440px] mx-auto flex justify-between items-center p-2">
        <div>
          <img
            className="w-14 h-14 rounded-3xl"
            src={Splash}
            alt="Unsplash logo"
          />
        </div>
        <nav>
          <ul className="flex items-center gap-8">
            <li className="  ">
              <Link
                className="text-white font-medium text-xl hover:bg-slate-600 py-2 px-3 rounded-md"
                to={"/home"}
              >
                Home
              </Link>
            </li>
            <li className="">
              <Link
                className="text-white  font-medium text-xl hover:bg-slate-600 py-2 px-3 rounded-md "
                to={"/about"}
              >
                About
              </Link>
            </li>
            <li className=" ">
              <Link
                className="text-white font-medium text-xl hover:bg-slate-600 py-2 px-3 rounded-md "
                to={"contact"}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <FaDownload className="w-7 h-7 cursor-pointer" color="white" />
          <FaRegHeart className="w-7 h-7 cursor-pointer" color="white" />
          <div>
            <button onClick={handleDark}>
              {isDarkMode ? (
                <CiDark className="w-8 h-8 cursor-pointer" color="white" />
              ) : (
                <CiLight className="w-8 h-8 cursor-pointer" color="white" />
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
