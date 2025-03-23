import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Image({ image }) {
  const { likedImages = [], dispatch } = useGlobalContext();

  const addLikeImage = (image) => {
    const allreadyAdded = likedImages.some((img) => {
      return img.id == image.id;
    });

    if (!allreadyAdded) {
      dispatch({ type: "LIKE", payload: image });
    } else {
      dispatch({ type: "UNLIKE", payload: image.id });
    }
  };

  return (
    <div className="group relative">
      {true && (
        <span
          onClick={() => addLikeImage(image)}
          className="heart-icons hover-icons absolute cursor-pointer"
        >
          <FaRegHeart className="text-white" />
        </span>
      )}
      {false && (
        <span className="heart-icons hover-icons absolute cursor-pointer">
          <FaHeart className="text-red-600" />
        </span>
      )}
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="mb-5 w-full cursor-pointer rounded-md"
      />
      <span className="hover-icons absolute bottom-2 left-2 flex cursor-pointer items-center gap-2">
        <img
          className="h-5 w-5 rounded-full md:h-10 md:w-10"
          src={image.user?.profile_image?.medium || "fallback-image-url"}
          alt={image.user?.name ? `${image.user.name} avatar` : "User avatar"}
        />
        <p className="text-xs text-white md:text-sm">
          {image.user?.name || "Unknown"}
        </p>
      </span>
      <span className="hover-icons absolute bottom-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full">
        <a
          download
          href={
            image.links?.download ? image.links.download + "&force=true" : "#"
          }
        >
          <FaDownload className="text-white" />
        </a>
      </span>
    </div>
  );
}

export default Image;
