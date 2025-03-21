import { FaHeart } from "react-icons/fa";

function Image({ image }) {
  const { links, urls, alt_desctription, user } = image;
  return (
    <div>
     
      <img
        src={urls.regular}
        alt={alt_desctription}
        className="mb-5 w-full transform cursor-pointer rounded-lg transition duration-300 hover:scale-105"
      />
    </div>
  );
}

export default Image;
