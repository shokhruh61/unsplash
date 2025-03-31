import { useGlobalContext } from "../hooks/useGlobalContext";

function Profile() {
  const { user } = useGlobalContext();

  return (
    <div
      className={`container py-10 `}
    >
      <div className="flex justify-center">
        <div className="flex">
          <img
            src={user.photoURL || "https://picsum.photos/200/300"}
            alt={user.name || "User"}
            className="h-32 w-32 rounded-full border-2 border-gray-400 shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
