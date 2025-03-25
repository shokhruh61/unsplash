import { useActionData } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Search } from "../components";
import ImageCard from "../components/ImageCard";

export const action = async ({ request }) => {
  const formData = await request.formData();
  return formData.get("search");
};

function Home() {
  const searchParam = useActionData();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_ACCESS_TOKEN}&query=${searchParam || "all"}&page=${page}`,
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
  }, [searchParam]);

  return (
    <div className="container mx-auto px-4">
      <div className="my-5 flex justify-center">
        <Search />
      </div>

      {isPending && <h1 className="text-center text-xl">Loading...</h1>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      <Masonry
        breakpointCols={{ default: 4, 1024: 3, 768: 2, 576: 1 }}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {images.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </Masonry>

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
