import { useEffect } from "react";
import { useFavoritesContext } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";

const FavoritesModal = ({ isOpen, onClose }) => {
  const {
    loadFavoritesLocations,
    favorites = [],
    removeFavoritesFromDataBase,
  } = useFavoritesContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadFavoritesLocations(user.uid);
    }
  }, [loadFavoritesLocations, user, favorites]);

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modalBackground") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modalBackground"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Ubicaciones Favoritas
        </h2>
        <ul className="space-y-3">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <li
                key={index}
                className="bg-slate-50 p-5 rounded-lg shadow-xl border-2 flex justify-between items-center"
              >
                <p>{favorite.name}</p>
                <button
                  onClick={() => removeFavoritesFromDataBase(favorite.name)}
                  className="text-red-500 rounded-full"
                >
                  ✘
                </button>
              </li>
            ))
          ) : (
            <li>No tienes ubicaciones favoritas</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FavoritesModal;
