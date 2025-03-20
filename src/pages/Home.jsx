import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useFetch } from "../hooks/useFetch";
import ImagesContainer from "../components/ImagesContainer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [allImages, setAllImages] = useState([]);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/photos?client_id=${import.meta.env.VITE_ACCESS_KEY}&query=all&page=${page}`,
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages(data.results);
    }
  }, [data]);
  if (isPending) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center">
        <label className="input-bordered input mx-auto mb-4 mt-4 flex max-w-96 items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setPage(1)}
          />
          <FaSearch className="h-5 w-5" />
          <button
            onClick={() => setPage(1)}
            className="rounded-md bg-info px-3 py-2 text-white md:hidden"
          >
            Search
          </button>
        </label>
      </div>

      {allImages.length > 0 && <ImagesContainer images={allImages} />}
    </div>
  );
}

export default Home;
