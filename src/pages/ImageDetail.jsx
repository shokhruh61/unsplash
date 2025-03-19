import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=KyFBkX45J_HRBjJ49WcR8jTLSiBFKJ9lAdCFgr6J7T0`
        );
        const data = await response.json();
        setImage(data);
      } catch (error) {
        console.error("Error fetching image details:", error);
      }
    };

    fetchImage();
  }, [id]);

  if (!image)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto text-center p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="w-full rounded-lg shadow-lg"
      />

      <h2 className="mt-4 text-xl font-semibold">
        {image.alt_description || "No Description"}
      </h2>
      <p className="text-gray-500">By {image.user.name}</p>

      <a
        href={image.download}
        download
        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Download Image
      </a>
    </div>
  );
}

export default ImageDetail;
