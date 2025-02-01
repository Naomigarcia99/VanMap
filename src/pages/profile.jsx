import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RouteModal from "../components/RouteModal";
import FavoritesModal from "../components/FavoritesModal";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isRoutesModalOpen, setIsRoutesModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleOpenRoutesModal = () => {
    setIsRoutesModalOpen(true);
  };

  const handleOpenFavoritesModal = () => {
    setIsFavoritesModalOpen(true);
  };

  const handleCloseRoutesModal = () => {
    setIsRoutesModalOpen(false);
  };

  const handleCloseFavoritesModal = () => {
    setIsFavoritesModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-pastelBeige p-6">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Perfil de {user?.displayName}
          </h2>

          <div className="mb-4">
            <p className="text-xl text-gray-700">Correo: {user?.email}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-700">Opciones</h3>
            <ul className="list-none space-y-4 mt-4">
              <li>
                <button
                  onClick={handleOpenRoutesModal}
                  className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
                >
                  Rutas Guardadas
                </button>
              </li>
              <li>
                <button
                  onClick={handleOpenFavoritesModal}
                  className="w-full bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700"
                >
                  Favoritos
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RouteModal isOpen={isRoutesModalOpen} onClose={handleCloseRoutesModal} />
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={handleCloseFavoritesModal}
      />
    </>
  );
};

export default ProfilePage;
