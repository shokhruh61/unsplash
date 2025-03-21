import { useParams, useLocation } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const image = location.state?.image;

  if (!image) {
    return <h2>Image not found</h2>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-4 text-2xl font-bold">Image Details - ID: {id}</h1>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="h-auto w-[700px] rounded-lg shadow-lg"
      />
      <p className="mt-2 text-lg font-semibold">{image.alt_description}</p>
      <div className="mt-4 flex items-center">
        <img
          src={image.user.profile_image.medium}
          alt={image.user.name}
          className="mr-2 h-10 w-10 rounded-full border-2 border-gray-500"
        />
        <p className="text-lg font-medium">{image.user.name}</p>
      </div>
      <a
        href={image.links.download}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Download Image
      </a>
    </div>
  );
};

export default Detail;
