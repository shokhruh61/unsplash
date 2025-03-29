import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../redux/likedImagesSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likedImages = useSelector((state) => state.likedImages);
  const isLiked = likedImages.some((img) => img.id === image.id);

  const handleLike = () => {
    dispatch(toggleLike(image));
    toast[isLiked ? "info" : "success"](
      isLiked ? "Removed from favorites ❌" : "Liked successfully ✅",
      {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        theme: "dark",
      },
    );
  };

  return (
    <div className="group relative w-full max-w-[400px] rounded-lg bg-white bg-opacity-5 p-3 shadow-lg">
      <button
        onClick={handleLike}
        className="hover-icons absolute right-4 top-4"
      >
        {isLiked ? (
          <FaHeart className="text-xl text-red-500" />
        ) : (
          <FaRegHeart className="text-xl text-white" />
        )}
      </button>

      <img
        className="h-auto w-full cursor-pointer rounded-lg object-cover shadow-md sm:max-h-[300px]"
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
        onClick={() => navigate(`/imageInfo/${image.id}`)}
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="hover-icons flex items-center gap-3">
          <img
            className="h-8 w-8 rounded-full border sm:h-10 sm:w-10"
            src={image.user.profile_image.medium}
            alt={image.user.name}
          />
          <span className="text-sm text-black sm:text-base dark:text-white">
            {image.user.name}
          </span>
        </div>

        <a
          href={`${image.links.download}&force=true`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-icons rounded-full bg-blue-500 p-3 text-white opacity-0"
        >
          <FaDownload className="text-lg" />
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
