import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RouteModal from "../components/ui/RouteModal";
import FavoritesModal from "../components/ui/FavoritesModal";
import Logo from "../assets/images/VanMap3-modified.png";

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
      <main className="min-h-screen flex items-center px-3 pb-20 justify-center bg-gradient-to-r from-pastelBeige via-pastelBlue to-pastelGreen">
        <section className="bg-white px-8 px-16 pb-16 pt-10 mt-14 rounded-xl shadow-md max-w-lg w-full text-center">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="h-32 w-32" />
          </div>

          <div className="my-5">
            <p className="text-3xl font-bold text-gray-600 mb-2">{user?.displayName}</p>
            <p className="text-lg text-gray-600">{user?.email}</p>
          </div>

          <div className="space-y-4 mt-6">
            <button
              onClick={handleOpenRoutesModal}
              className="text-black font-bold w-full py-3 bg-pastelGr2/70 text-white rounded-full shadow-md transition hover:bg-pastelGr2/30"
            >
              Rutas Guardadas
            </button>
            <button
              onClick={handleOpenFavoritesModal}
              className="text-black font-bold w-full bg-pastelGrDr text-white py-3 rounded-full shadow-md transition hover:bg-pastelGrDr/60"
            >
              Favoritos
            </button>
            <button
              onClick={handleLogout}
              className="font-bold w-full bg-red-400 text-white py-3 rounded-full shadow-md transition hover:bg-red-600"
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
