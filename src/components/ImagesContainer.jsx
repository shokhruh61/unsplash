import React from "react";

function ImagesContainer({ images }) {
  return (
    <div>
      <h1>All:</h1>
      {images.map((image) => {
        return <img key={image.id} src={image.urls.regular} alt="" />;
      })}
    </div>
  );
}

export default ImagesContainer;
