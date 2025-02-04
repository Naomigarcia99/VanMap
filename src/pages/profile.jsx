import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RouteModal from "../components/ui/RouteModal";
import FavoritesModal from "../components/ui/FavoritesModal";

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
      <main className="min-h-screen flex items-center px-3 pb-24 justify-center bg-gradient-to-r from-pastelBeige via-pastelBlue to-pastelGreen">
        <section className="bg-white px-8 py-20 mt-14 rounded-xl shadow-md max-w-lg w-full text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Perfil</h2>

          <div className="my-6">
            <p className="text-xl text-gray-600">Nombre: {user?.displayName}</p>
            <p className="text-xl text-gray-600">Correo: {user?.email}</p>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-2xl font-semibold text-gray-700">Opciones</h3>
            <button
              onClick={handleOpenRoutesModal}
              className="w-full py-3 bg-blue-500 text-white rounded-full shadow-md transition hover:bg-blue-600"
            >
              Rutas Guardadas
            </button>
            <button
              onClick={handleOpenFavoritesModal}
              className="w-full bg-blue-500 text-white py-3 rounded-full shadow-md transition hover:bg-blue-600"
            >
              Favoritos
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 rounded-full shadow-md transition hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </section>
      </main>
      <RouteModal isOpen={isRoutesModalOpen} onClose={handleCloseRoutesModal} />
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={handleCloseFavoritesModal}
      />
    </>
  );
};

export default ProfilePage;
