import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useFetch } from "../hooks/useFetch";
import ImageCard from "../components/ImageCard";

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "all";
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=TfijlH2P6tfgB_kzepCuV_-ji3Pd7waZSo1Gx4SDBbE&query=${searchQuery}&page=${page}`,
  );

  useEffect(() => {
    if (data?.results) {
      setImages((prev) =>
        page === 1 ? data.results : [...prev, ...data.results],
      );
    }
  }, [data, page]);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search Form */}
      <div className="my-5 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-96 items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-bordered input w-full"
          />
          <button type="submit" className="btn btn-primary btn-sm md:hidden">
            Search
          </button>
        </form>
      </div>

      {isPending && <h1 className="text-center text-xl">Loading...</h1>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={{ default: 4, 1024: 3, 768: 2, 576: 1 }}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {images.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </Masonry>

      {/* Load More Button */}
      <div className="my-10 flex justify-center">
        <button
          onClick={() => setPage((p) => p + 1)}
          className="btn btn-primary max-w-md px-4 py-2 text-xl"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default Home;
