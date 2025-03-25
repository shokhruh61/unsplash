import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../redux/likedImagesSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ImageCard = ({ image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likedImages = useSelector((state) => state.likedImages);
  const isLiked = likedImages.some((img) => img.id === image.id);

  const handleLike = () => {
    dispatch(toggleLike(image));

    if (isLiked) {
      toast.info("Removed from favorites ❌", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.success("Liked successfully ✅", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="group relative mx-auto w-full max-w-[400px] rounded-lg bg-white bg-opacity-5 p-3 shadow-lg transition duration-300 ">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className="absolute right-4 top-4 opacity-0 transition duration-300 group-hover:opacity-100"
      >
        {isLiked ? (
          <FaHeart className="text-xl text-red-500" />
        ) : (
          <FaRegHeart className="text-xl text-white" />
        )}
      </button>

      {/* Image */}
      <div className="flex items-center justify-center">
        <img
          className="skeleton h-full w-full cursor-pointer rounded-lg object-cover shadow-md sm:max-h-[300px]"
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
          onClick={() => navigate(`/imageInfo/${image.id}`)}
        />
      </div>

      {/* User Info & Download */}
      <div className="mt-3 flex items-center justify-between">
        <div className="group relative flex items-center gap-3">
          {/* User Avatar */}
          <img
            className="skeleton hover-icons h-8 w-8 rounded-full border sm:h-10 sm:w-10"
            src={image?.user?.profile_image?.medium || "fallback-avatar.jpg"}
            alt={image?.user?.name || "Unknown User"}
          />
          {/* User Name with Hover Info */}
          <div className="hover-icons">
            <span className="cursor-pointer text-sm text-white sm:text-base">
              {image.user.name}
            </span>
           
          </div>
        </div>

        {/* Download Button */}
        <a
          href={image.links.download + "&force=true"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-500 p-3 text-white opacity-0 shadow-md transition duration-300 group-hover:opacity-100"
        >
          <FaDownload className="text-lg" />
        </a>
      </div>
    </div>
  );
};

export default ImageCard;
