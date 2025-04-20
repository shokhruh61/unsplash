import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(GlobalContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImage(imageData);
        localStorage.setItem("userPhoto", imageData);
      };
      reader.readAsDataURL(file);
    }
  };
  const signOutUser = async () => {
    try {
      await signOut(auth); // 🔄 Firebase orqali logout
      dispatch({ type: "LOGOUT" }); // 🔄 Global Context ni tozalash
      navigate("/login"); // 🔄 Login sahifasiga yo‘naltirish
      toast.success("Logged out successfully"); // ✅ Xabar chiqarish
    } catch (error) {
      toast.error("Logout failed: " + error.message); // ❌ Xatolik bo‘lsa xabar chiqarish
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-900 p-6 text-white">
      <div className="w-full max-w-4xl rounded-lg bg-gray-800 p-6 shadow-md">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img
                src={
                  user?.photoURL ||
                  localStorage.getItem("userPhoto") ||
                  "https://picsum.photos/200/300"
                }
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="text-lg font-semibold">
              <span className="text-gray-400">Username:</span>{" "}
              {user?.displayName || "Guest"}
            </div>
            <div className="text-lg font-semibold">
              <span className="text-gray-400">Email:</span>{" "}
              {user?.email || "No email provided"}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="rounded-md border border-gray-500 bg-gray-700 p-2 text-gray-300"
          />
        </div>
        <button
          onClick={signOutUser}
          className="mt-4 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
