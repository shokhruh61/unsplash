import React, { useEffect, useState } from "react";
import { FaDownload, FaHeart, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedImages, setLikedImages] = useState(
    () => JSON.parse(localStorage.getItem("likedImages")) || []
  );
  const [downloadedImages, setDownloadedImages] = useState(
    () => JSON.parse(localStorage.getItem("downloadedImages")) || []
  );

  const isDarkMode = useSelector((state) => state.darkMode.isDark);
  const navigate = useNavigate();

  const fetchImages = async (query, page) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=KyFBkX45J_HRBjJ49WcR8jTLSiBFKJ9lAdCFgr6J7T0&query=${
          query || "all"
        }&page=${page}`
      );
      const data = await response.json();
      setImages((prevImages) =>
        page === 1 ? data.results : [...prevImages, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchImages(searchQuery, 1);
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchImages(searchQuery, page);
    }
  }, [page]);

  const toggleLike = (image) => {
    let updatedLikes;
    if (likedImages.some((item) => item.id === image.id)) {
      updatedLikes = likedImages.filter((item) => item.id !== image.id);
    } else {
      updatedLikes = [...likedImages, image];
    }
    setLikedImages(updatedLikes);
    localStorage.setItem("likedImages", JSON.stringify(updatedLikes));
  };

  const downloadImage = (image) => {
    const link = document.createElement("a");
    link.href = image.urls.full;
    link.download = `image-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const updatedDownloads = [...downloadedImages, image];
    setDownloadedImages(updatedDownloads);
    localStorage.setItem("downloadedImages", JSON.stringify(updatedDownloads));
  };

  return (
    <div
      className={isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"}
    >
      <div className="flex justify-center pt-5">
        <form onSubmit={(e) => e.preventDefault()} className="w-[768px] flex">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-l-md text-black"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="max-w-[1440px] mx-auto p-4">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-1 space-y-4">
          {images.map((image) => (
            <div key={image.id} className="relative break-inside-avoid group">
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="w-full rounded-lg shadow-lg cursor-pointer"
                onClick={() => navigate(`/detail/${image.id}`)}
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <button
                  onClick={() => toggleLike(image)}
                  className="self-end text-white p-2 bg-gray-800 rounded-full hover:bg-gray-600"
                >
                  <FaHeart
                    className={
                      likedImages.some((item) => item.id === image.id)
                        ? "text-red-500"
                        : ""
                    }
                  />
                </button>

                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-2">
                    <img
                      src={image.user.profile_image.medium}
                      alt={image.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{image.user.name}</span>
                  </div>
                  <button
                    onClick={() => downloadImage(image)}
                    className="p-2 bg-white text-black rounded-full hover:bg-gray-200"
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-2 bg-blue-600 w-full text-white rounded-lg shadow-lg hover:bg-blue-700"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
