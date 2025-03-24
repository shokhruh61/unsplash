import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../redux/likedImagesSlice";

const ImageCard = ({ image }) => {
  const dispatch = useDispatch();
  const likedImages = useSelector((state) => state.likedImages);
  const isLiked = likedImages.some((img) => img.id === image.id);

  return (
    <div className="group relative mx-auto w-full max-w-[400px] rounded-lg bg-white bg-opacity-5 p-3 shadow-lg">
      <button
        onClick={() => dispatch(toggleLike(image))}
        className="absolute right-4  top-4 hover-icons"
      >
        {isLiked ? (
          <FaHeart className="text-xl text-red-500" />
        ) : (
          <FaRegHeart className="text-xl text-gray-700" />
        )}
      </button>

      <div className="flex items-center justify-center">
        <img
          className="h-full cursor-pointer w-full rounded-lg object-cover shadow-md sm:max-h-[300px]"
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3 hover-icons">
          <img
            className="h-8 w-8 rounded-full border sm:h-10 sm:w-10"
            src={image?.user?.profile_image?.medium || "fallback-avatar.jpg"}
            alt={image?.user?.name || "Unknown User"}
          />
          <span className="text-sm text-white sm:text-base">
            {image.user.name}
          </span>
        </div>

        <a
          href={image.links.download + "&force=true"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full hover-icons bg-blue-500 px-3 py-3 text-white shadow-md transition hover:bg-blue-600"
        >
          <FaDownload className="text-lg" />
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
