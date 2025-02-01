import { useEffect, useState } from "react";
import { useFavoritesContext } from "../context/FavoritesContext";
import star from "../assets/images/star.png";
import star2 from "../assets/images/star2.png";

const FavoriteButton = ({ location, name }) => {
  const { saveFavoritesToDataBase, favorites } = useFavoritesContext();
  const [saving, setSaving] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favExists = favorites.some((fav) => fav.name === name);
    setIsFavorite(favExists);
  }, [favorites, name]);

  const handleSave = async () => {
    if (isFavorite) return;

    setSaving(true);
    await saveFavoritesToDataBase(location, name);
    setIsFavorite(true);
    setSaving(false);
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="bg-white px-1 mt-2 hover:bg-yellow-200 rounded-full"
    >
      {saving ? (
        "..."
      ) : (
        <img
          src={isFavorite ? star2 : star}
          alt="Favorito"
          className="w-5 h-5"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
