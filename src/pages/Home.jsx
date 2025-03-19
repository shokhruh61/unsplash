import React, { useEffect, useState } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("all");
  const [likedImages, setLikedImages] = useState(() => {
    return JSON.parse(localStorage.getItem("likedImages")) || [];
  });

  const isDarkMode = useSelector((state) => state.darkMode.isDark);

  // API'dan rasm olish funksiyasi
  const fetchImages = async (query, page) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=KyFBkX45J_HRBjJ49WcR8jTLSiBFKJ9lAdCFgr6J7T0&query=${query}&page=${page}`
      );
      const data = await response.json();
      if (page === 1) {
        setImages(data.results);
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Component yuklanganda yoki qidiruv o'zgarganda API chaqirish
  useEffect(() => {
    fetchImages(searchQuery, page);
  }, [searchQuery, page]);

  // Qidiruvni boshlash funksiyasi
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  // Like bosish funksiyasi
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

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"
      }`}
    >
      {/* Qidiruv input */}
      <div className="flex justify-center pt-5">
        <form onSubmit={handleSearch} className="w-[768px] flex">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-l-md text-black"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Rasm Galereyasi */}
      <div className="max-w-[1440px] mx-auto p-4">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-1 space-y-4">
          {images.map((image) => (
            <div key={image.id} className="relative break-inside-avoid group">
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="w-full rounded-lg shadow-lg cursor-pointer"
              />

              {/* Like tugmasi */}
              <button
                className={`absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition ${
                  likedImages.some((item) => item.id === image.id)
                    ? "text-red-500"
                    : "text-white"
                }`}
                onClick={() => toggleLike(image)}
              >
                <FaHeart className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* "Read more" tugmasi */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
