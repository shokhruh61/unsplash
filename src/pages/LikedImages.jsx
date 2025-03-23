import { useGlobalContext } from "../hooks/useGlobalContext";
import { ImageContainer } from "../components";

function LikedImages() {
  const { likedImages } = useGlobalContext();

  if (likedImages.length == 0) {
    return <p>No images liked yet.</p>;
  }

  return (
    <div className="align-elements">
      {likedImages.length > 0 && <ImageContainer images={likedImages} />}
    </div>
  );
}

export default LikedImages;
