import React, { useEffect, useState } from "react";
import { useRouteContext } from "../context/RouteContext";
import { useAuth } from "../context/AuthContext";
import SortButton from "./SortButton";

const RoutesModal = ({ isOpen, onClose }) => {
  const { loadUserRoutes, userRoutes, removeRouteFromDataBase } =
    useRouteContext();
  const { user } = useAuth();
  const [sortedRoutes, setSortedRoutes] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserRoutes(user.uid);
    }
  }, [user]);

  useEffect(() => {
    let sorted = [...userRoutes];

    if (sortBy === "distance") {
      sorted.sort((a, b) =>
        ascending ? a.distance - b.distance : b.distance - a.distance
      );
    } else if (sortBy === "duration") {
      sorted.sort((a, b) =>
        ascending ? a.duration - b.duration : b.duration - a.duration
      );
    }

    setSortedRoutes(sorted);
  }, [userRoutes, sortBy, ascending]);

  const handleSort = (type) => {
    if (sortBy === type) {
      setAscending(!ascending);
    } else {
      setSortBy(type);
      setAscending(true);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return ` ${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return ` ${hours} horas y ${remainingMinutes} minutos`;
  };

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
          Rutas Guardadas
        </h2>
        <div className="flex justify-end gap-4 mb-2">
          Ordenar por:
          <SortButton
            onClick={() => handleSort("distance")}
            label="Distancia"
            isActive={sortBy === "distance"}
            isAscending={ascending}
          ></SortButton>
          <SortButton
            onClick={() => handleSort("duration")}
            label="Tiempo"
            isActive={sortBy === "duration"}
            isAscending={ascending}
          ></SortButton>
        </div>
        <section>
          {sortedRoutes.length > 0 ? (
            <ul className="space-y-3">
              {sortedRoutes.map((route, index) => (
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
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeRouteFromDataBase(route.id)}
                        className="text-red-500 rounded-full"
                      >
                        ✘
                      </button>
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
