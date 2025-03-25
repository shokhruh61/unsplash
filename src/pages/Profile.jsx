import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/contact");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docSnap = await getDocs(q);

        if (docSnap.empty) {
          toast.error("User not found in database!");
          return;
        }

        setUserDetails(docSnap.docs[0].data());
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while fetching user data");
      }
    };

    fetchUserDetails();
  }, [user, loading, navigate]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="flex-col items-center justify-center">
      {error && <p className="text-center text-red-500">{error.message}</p>}
      <div className="flex items-center justify-between py-5">
        <Link to="/">
          <button className="rounded-full bg-purple-700 px-5 py-2 text-xs text-white sm:text-base">
            Form Page
          </button>
        </Link>
        <button
          onClick={logout}
          className="rounded-full bg-purple-700 px-5 py-2 text-xs text-white sm:text-base"
        >
          Logout
        </button>
      </div>
      <h1 className="mb-4 text-center text-4xl">Profile Page</h1>
      <div className="border-[1px] border-gray-300" />

      {!userDetails ? (
        <p className="mt-5 text-center text-lg">User data not available</p>
      ) : (
        <div className="mt-5 flex flex-col justify-center rounded-xl bg-gray-100 p-3 sm:p-5">
          <div className="flex h-[150px] w-[150px]">
            <img
              src={userDetails?.img || "https://via.placeholder.com/150"}
              alt="user-img"
              className="-mt-[1px] h-[100%] w-[100%] rounded-full"
            />
          </div>
          <div className="flex-col items-center justify-center p-1 sm:p-5">
            <div className="text-lg font-semibold">
              Email:{" "}
              <span className="text-purple-500">{userDetails?.email}</span>
            </div>
            <div className="text-lg font-semibold">
              UID: <span className="text-purple-500">{userDetails?.uid}</span>
            </div>
            <div className="text-lg font-semibold">
              First Name:{" "}
              <span className="text-purple-500">
                {userDetails?.firstName || "N/A"}
              </span>
            </div>
            <div className="text-lg font-semibold">
              Last Name:{" "}
              <span className="text-purple-500">
                {userDetails?.lastName || "N/A"}
              </span>
            </div>
            <div className="text-lg font-semibold">
              Age:{" "}
              <span className="text-purple-500">
                {userDetails?.age || "N/A"}
              </span>
            </div>
            <div className="text-lg font-semibold">
              Profession:{" "}
              <span className="text-purple-500">
                {userDetails?.profession || "N/A"}
              </span>
            </div>
            <div className="flex-col text-lg font-semibold">
              Address:{" "}
              <span className="text-purple-500">
                {userDetails?.address || "N/A"}
              </span>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Profile;
