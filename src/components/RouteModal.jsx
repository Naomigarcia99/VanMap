import React, { useEffect } from "react";
import { useRouteContext } from "../context/RouteContext";
import { useAuth } from "../context/AuthContext";

const RoutesModal = ({ isOpen, onClose }) => {
  const { loadUserRoutes, userRoutes } = useRouteContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserRoutes(user.uid);
    }
  }, [user, loadUserRoutes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Rutas Guardadas
        </h2>

        {userRoutes.length > 0 ? (
          <ul>
            {userRoutes.map((route, index) => (
              <li key={index} className="mb-4">
                <p>{`Origen: ${route.origin.name}`}</p>
                <p>{`Destino: ${route.destination.name}`}</p>
                <p>{`Distancia: ${(route.distance / 1000).toFixed(1)} km`}</p>
                <p>{`Duración: ${Math.round(route.duration / 60)} minutos`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes rutas guardadas.</p>
        )}

        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutesModal;
