// import { useEffect, useState } from "react";
// import { useFetch } from "../hooks/useFetch";
import { useActionData } from "react-router-dom";
import { ImageContainer, Search } from "../components";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};
import { useFetch } from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
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
  }, [data]);

  useEffect(() => {
    if (searchParamFromAction == prevSearchParam.current) {
      setAllImages([]);
      setPageParam(1);
    }
  }, [searchParamFromAction]);

  if (error) {
    <div>Error: {error}</div>;
  }

  return (
    <div className="align-elements">
      <div className="my-10 mb-5 mt-5 flex items-center justify-center gap-2">
        <Search />
      </div>
      {isPending && <h1>Loading ...</h1>}
      {allImages.length > 0 && <ImageContainer images={allImages} />}
      <div className="my-10 text-center">
        <button
          onClick={() => {
            setPageParam(pageParam + 1);
          }}
          className="btn btn-primary w-[90%] text-xl"
        >
          Read more
        </button>
      </div>
    </div>
  );
}

export default Home;
