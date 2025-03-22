import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
function Image({ image }) {
  const { links, urls, alt_desctription, user } = image;

  return (
    <div className="group relative">
      {true && (
        <span className="heart-icons hover-icons absolute">
          <FaRegHeart className="text-white" />
        </span>
      )}
      {false && (
        <span className="heart-icons hover-icons absolute bg-white">
          <FaHeart className="text-red-600" />
        </span>
      )}
      <img
        src={urls.regular}
        alt={alt_desctription}
        className="mb-5 w-full cursor-pointer rounded-md"
      />
      <span className="hover-icons absolute bottom-2 left-2 flex cursor-pointer items-center gap-2">
        <img
          className="h-5 w-5 rounded-full md:h-10 md:w-10"
          src={user.profile_image.medium}
          alt={user.name + "avatar"}
        />
        <p className="text-xs text-white md:text-sm">{user.name}</p>
      </span>
      <span className="hover-icons absolute bottom-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full">
        <a download href={links.download + "&force=true"}>
          <FaDownload className="text-white" />
        </a>
      </span>
    </div>
  );
}

export default Image;
