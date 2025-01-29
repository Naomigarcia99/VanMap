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

  const formatDuration = (seconds) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return ` ${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return ` ${hours} horas y ${remainingMinutes} minutos`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Rutas Guardadas
        </h2>

        <section>
          {userRoutes.length > 0 ? (
            <ul className="space-y-3">
              {userRoutes.map((route, index) => (
                <li
                  key={index}
                  className="bg-slate-50 p-5 rounded-lg shadow-xl border-2"
                >
                  <article>
                    <div className="flex justify-start gap-1">
                      <p className="font-bold text-green-600">Origen:</p>
                      <p>{route.origin.name}</p>
                    </div>
                    <div className="flex justify-start gap-1">
                      <p className="font-bold text-red-600">Destino:</p>
                      <p>{route.destination.name}</p>
                    </div>

                    {route.waypoints && route.waypoints.length > 0 && (
                      <div>
                        <strong className="font-bold text-yellow-500">
                          Paradas:
                        </strong>
                        <ol className="ml-3 list-decimal pl-3">
                          {route.waypoints.map((waypoint, wpIndex) => (
                            <li key={wpIndex}>{waypoint.name}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    <div className="flex justify-center gap-1 font-bold mt-2">
                      <p>Distancia:</p>
                      <p>{(route.distance / 1000).toFixed(1)} km</p>
                    </div>
                    <div className="flex justify-center gap-1 font-bold">
                      <p>Duración:</p>
                      <p>{formatDuration(route.duration)}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes rutas guardadas</p>
          )}
        </section>

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
