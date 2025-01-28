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
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Rutas Guardadas
        </h2>

        {userRoutes.length > 0 ? (
          <ul className="space-y-3">
            {userRoutes.map((route, index) => (
              <li
                key={index}
                className="bg-slate-50 p-5 rounded-lg shadow-xl border-2"
              >
                <p className="">
                  <span className="font-bold text-green-600">Origen: </span>
                  {route.origin.name}
                </p>
                <p>
                  <span className="font-bold text-red-600">Destino: </span>
                  {route.destination.name}
                </p>
                {route.waypoints && route.waypoints.length > 0 && (
                  <>
                    <p>
                      <span className="font-bold text-yellow-500">
                        Paradas:
                      </span>
                    </p>
                    <ul className="ml-3 list-disc">
                      {route.waypoints.map((waypoint, wpIndex) => (
                        <li key={wpIndex}>{waypoint.name}</li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="text-center font-semibold mt-2">
                  Distancia: {(route.distance / 1000).toFixed(1)} km
                </p>
                <p className="text-center font-semibold">{`Duración: ${Math.round(
                  route.duration / 60
                )} minutos`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes rutas guardadas</p>
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
