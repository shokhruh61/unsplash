import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ImageInfo = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/photos/${id}?client_id=TfijlH2P6tfgB_kzepCuV_-ji3Pd7waZSo1Gx4SDBbE`,
    )
      .then((res) => res.json())
      .then(setImage)
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!image) return <p className="text-center">Yuklanmoqda...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <img
        className="w-[250px] rounded shadow"
        src={image.urls.regular}
        alt={image.alt_description}
      />
      <h1 className="text-xl font-bold">
        {image.alt_description || "No title"}
      </h1>
      <p>Muallif: {image.user.name}</p>
      <a
        href={image.links.download + "&force=true"}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Yuklab olish
      </a>
    </div>
  );
};

export default ImageInfo;
