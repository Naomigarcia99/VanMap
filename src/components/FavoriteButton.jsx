import { useEffect, useState } from "react";
import { useFavoritesContext } from "../context/FavoritesContext";
import star from "../assets/images/star.png";
import star2 from "../assets/images/star2.png";

const FavoriteButton = ({ location, name }) => {
  const { saveFavoritesToDataBase, favorites, removeFavoritesFromDataBase } =
    useFavoritesContext();
  const [saving, setSaving] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!favorites) return;
    const favExists = favorites.some((fav) => fav.name === name);
    setIsFavorite(favExists);
  }, [favorites, name]);

  const handleToggleFavorite = async () => {
    setSaving(true);

    if (isFavorite) {
      await removeFavoritesFromDataBase(name);
      setIsFavorite(false);
    } else {
      await saveFavoritesToDataBase(location, name);
      setIsFavorite(true);
    }

    setSaving(false);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={saving}
      className="bg-white mx-2 rounded-full"
    >
      {saving ? (
        "..."
      ) : (
        <img
          src={isFavorite ? star2 : star}
          alt="Favorito"
          className="w-6 h-5"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
