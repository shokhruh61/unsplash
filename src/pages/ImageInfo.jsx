import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ImageInfo = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.VITE_API_KEY}`,
        );
        if (!response.ok) throw new Error("Rasm topilmadi!");
        const data = await response.json();
        setImage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Yuklanmoqda...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <img
        className="w-[250px] rounded shadow"
        src={image.urls.regular}
        alt={image.alt_description || "No title"}
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
