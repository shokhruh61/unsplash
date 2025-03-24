import { useSelector, useDispatch } from "react-redux";
import Masonry from "react-masonry-css";
import { FaHeart } from "react-icons/fa";
import { toggleLike } from "../redux/likedImagesSlice";

function LikedImages() {
  const likedImages = useSelector((state) => state.likedImages);
  const dispatch = useDispatch();

  return (
    <div className="align-elements">
      <h1 className="text-center text-2xl font-bold my-5">Liked Images</h1>

      {likedImages.length === 0 && (
        <p className="text-center text-gray-500">No liked images yet.</p>
      )}

      <Masonry
        breakpointCols={{ default: 4, 768: 3, 576: 2 }}
        className="flex gap-4 p-4"
        columnClassName="flex flex-col gap-4"
      >
        {likedImages.map((image) => (
          <div key={image.id} className="relative group">
            <button
              onClick={() => dispatch(toggleLike(image))}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <FaHeart className="text-red-500 text-xl" />
            </button>
            <img
              className="rounded-lg shadow-md"
              src={image.urls.regular}
              alt={image.alt_description || "Image"}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default LikedImages;
