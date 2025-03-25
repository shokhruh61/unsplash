import { useParams, useLocation } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const image = state?.image;

  if (!image)
    return <h2 className="text-center text-red-500">Image not found</h2>;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-4 text-xl font-bold">Image Details - ID: {id}</h1>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="w-[500px] rounded shadow"
      />
      <p className="mt-2 font-medium">
        {image.alt_description || "No description"}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <img
          src={image.user.profile_image.medium}
          alt={image.user.name}
          className="h-8 w-8 rounded-full"
        />
        <p className="text-sm">{image.user.name}</p>
      </div>
      <a
        href={image.links.download}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Download
      </a>
    </div>
  );
};

export default Detail;
