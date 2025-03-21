import Masonry from "react-masonry-css";

import { Image } from "./";
function ImageContainer({ images }) {
  const breakpointObj = {
    default: 4, // Katta ekranlarda 4 ustun
    1100: 3, // 1100px ekran kengligida 3 ustun
    700: 2, // 700px ekran kengligida 2 ustun
    500: 1, // 500px ekran kengligida 1 ustun
  };
  return (
    <Masonry
      co
      breakpointCols={breakpointObj}
      className="flex gap-4 p-5"
      columnClassName="masonry-grid_column"
    >
      {images.map((image) => {
        return <Image key={image.id} image={image} />;
      })}
    </Masonry>
  );
}

export default ImageContainer;
