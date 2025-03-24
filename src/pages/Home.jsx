import { useActionData } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { Search } from "../components";
import ImageCard from "../components/ImageCard";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

function Home() {
  const [allImages, setAllImages] = useState([]);
  const searchParamFromAction = useActionData();
  const [pageParam, setPageParam] = useState(1);

  const prevSearchParam = useRef(searchParamFromAction);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=TfijlH2P6tfgB_kzepCuV_-ji3Pd7waZSo1Gx4SDBbE&query=${searchParamFromAction ?? "all"}&page=${pageParam}`,
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImage) => {
        return pageParam === 1 ? data.results : [...prevImage, ...data.results];
      });
    }
  }, [data, pageParam]);

  useEffect(() => {
    if (searchParamFromAction !== prevSearchParam.current) {
      setAllImages([]);
      setPageParam(1);
      prevSearchParam.current = searchParamFromAction;
    }
  }, [searchParamFromAction]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 mb-5 mt-5 flex items-center justify-center gap-2">
        <Search />
      </div>

      {isPending && <h1 className="text-center text-xl">Loading ...</h1>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      <Masonry
        breakpointCols={{ default: 4, 1024: 3, 768: 2, 576: 1 }}
        className="flex gap-4 p-2 sm:p-4"
        columnClassName="flex flex-col gap-4"
      >
        {allImages.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </Masonry>

      <div className="my-10 flex justify-center">
        <button
          onClick={() => setPageParam(pageParam + 1)}
          className="btn btn-primary w-full max-w-md text-xl py-2 px-4"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default Home;
