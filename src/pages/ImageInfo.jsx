import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ImageInfo = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}?client_id=TfijlH2P6tfgB_kzepCuV_-ji3Pd7waZSo1Gx4SDBbE`,
        );
        setImage(response.data);
      } catch (error) {
        console.error("Error fetching image details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!image) return <p className="text-center text-white">Rasm topilmadi</p>;

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <div className="mt-5 flex flex-col items-center">
        <img
          className="w-[250px] max-w-3xl rounded-lg shadow-lg"
          src={image.urls.regular}
          alt={image.alt_description}
        />
        <h1 className="text-center text-2xl font-bold">
          {image.alt_description || "No title"}
        </h1>
        <p className="mt-3 text-sm">Author: {image.user.name}</p>
        <p className="text-sm">Likes: {image.likes} ❤️</p>

        <a
          href={image.links.download + "&force=true"}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Image
        </a>
      </div>
    </div>
  );
};

export default ImageInfo;
