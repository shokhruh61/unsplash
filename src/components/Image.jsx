import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { addToLiked, removeFromLiked } from "../redux/store";
import { toast } from "react-toastify";

function Image({ image }) {
  const dispatch = useDispatch();
  const likedImages = useSelector((state) => state.likedImages.likedImages);
  const isLiked = likedImages.some((img) => img.id === image.id);

  const toggleLike = () => {
    if (isLiked) {
      dispatch(removeFromLiked(image));
      toast.info("Rasm yoqimlilardan olib tashlandi ❌!"); // ❌ Unlike bo‘lganda
    } else {
      dispatch(addToLiked(image));
      toast.success("Rasm yoqimlilarga qo‘shildi ❤!"); // ✅ Like bo‘lganda
    }
  };

  return (
    <div className="group relative">
      <span
        onClick={toggleLike}
        className="heart-icons hover-icons absolute cursor-pointer"
      >
        {isLiked ? (
          <FaHeart className="text-red-600" />
        ) : (
          <FaRegHeart className="text-white" />
        )}
      </span>

      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="mb-5 w-full cursor-pointer rounded-md"
      />

      <span className="hover-icons absolute bottom-2 left-2 flex items-center gap-2">
        <img
          className="h-5 w-5 rounded-full md:h-10 md:w-10"
          src={image.user.profile_image.medium}
          alt={image.user.name}
        />
        <p className="text-xs text-white md:text-sm">{image.user.name}</p>
      </span>

      <span className="hover-icons absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full">
        <a download href={image.links.download + "&force=true"}>
          <FaDownload className="text-white" />
        </a>
      </span>
    </div>
  );
}

export default Image;
