import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { toggleLike } from "../redux/likedImagesSlice";
import { Link } from "react-router-dom";

function LikedImages() {
  const likedImages = useSelector((state) => state.likedImages);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">Liked Images</h1>

      {likedImages.length === 0 ? (
        <div className="my-7 text-center">
          <p className="text-gray-500 mb-5">No liked images yet.</p>
          <Link className="rounded bg-blue-600 px-4 py-2 my-10 text-white" to="/">
            Go to Home
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {likedImages.map((image) => (
            <div key={image.id} className="relative">
              <button
                onClick={() => dispatch(toggleLike(image))}
                className="absolute right-2 top-2 rounded-full bg-white p-2 shadow"
              >
                <FaHeart className="text-red-500" />
              </button>
              <img
                className="rounded shadow"
                src={image.urls.regular}
                alt={image.alt_description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedImages;
