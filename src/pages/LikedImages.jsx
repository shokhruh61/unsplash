import { useSelector, useDispatch } from "react-redux";
import { removeFromLiked } from "../redux/store";
import { FaHeart } from "react-icons/fa";

function LikedImages() {
  const likedImages = useSelector((state) => state.likedImages.likedImages);
  const dispatch = useDispatch();

  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-bold">Yoqtirilgan Rasmlar</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {likedImages.length > 0 ? (
          likedImages.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                className="h-auto w-full rounded-md"
              />
              <button
                onClick={() => dispatch(removeFromLiked(image))}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
              >
                <FaHeart />
              </button>
            </div>
          ))
        ) : (
          <p>Hali hech qanday rasm yoqtirilmagan.</p>
        )}
      </div>
    </div>
  );
}

export default LikedImages;
