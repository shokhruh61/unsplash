import Masonry from "react-masonry-css";
import Image from "./Image";

function ImageContainer({ images }) {
  const breakpointObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointObj}
      className="flex gap-4 p-5"
      columnClassName="masonry-grid_column"
    >
      {images.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </Masonry>
  );
}

export default ImageContainer;
