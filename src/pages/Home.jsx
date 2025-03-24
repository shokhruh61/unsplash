import { useActionData } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { Search } from "../components";
import ImageCard from "../components/ImageCard"; // ✅ ImageCard'ni import qilish

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

function Home() {
  const [allImages, setAllImages] = useState([]);
  const searchParamFromAction = useActionData();
  const [pageParam, setPageParam] = useState(1);

  // Old search parametrni saqlash
  const prevSearchParam = useRef(searchParamFromAction);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_ACCESS_TOKEN}&query=${searchParamFromAction ?? "all"}&page=${pageParam}`,
  );

  // API dan yangi ma'lumot kelganida yangilash
  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImage) => {
        return pageParam === 1 ? data.results : [...prevImage, ...data.results];
      });
    }
  }, [data, pageParam]);

  // Agar qidiruv so‘rovi o‘zgarsa, sahifani yangilash
  useEffect(() => {
    if (searchParamFromAction !== prevSearchParam.current) {
      setAllImages([]);
      setPageParam(1);
      prevSearchParam.current = searchParamFromAction; // `useRef` ni yangilash
    }
  }, [searchParamFromAction]);

  return (
    <div className="align-elements">
      <div className="my-10 mb-5 mt-5 flex items-center justify-center gap-2">
        <Search />
      </div>

      {isPending && <h1>Loading ...</h1>}
      {error && <div>Error: {error}</div>}

      <Masonry
        breakpointCols={{ default: 4, 768: 3, 576: 2 }}
        className="flex gap-4 p-4"
        columnClassName="flex flex-col gap-4"
      >
        {allImages.map((image) => (
          <ImageCard key={image.id} image={image} /> // ✅ ImageCard ni ishlatish
        ))}
      </Masonry>

      <div className="my-10 text-center">
        <button
          onClick={() => setPageParam(pageParam + 1)}
          className="btn btn-primary w-[90%] text-xl"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default Home;
