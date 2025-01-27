import React from "react";

const RouteInfo = ({ route, isVisible, onSave, onClose }) => {
  if (!route || !isVisible) return null;

  return (
    <div className="mt-4 text-center bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
      <h2 className="font-semibold text-xl">Ruta Calculada</h2>
      <p className="text-sm">
        Distancia: {(route.distance / 1000).toFixed(1)} km
      </p>
      <p className="text-sm">
        Tiempo: {Math.round(route.duration / 60)} minutos
      </p>
      <button
        onClick={onSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Guardar Ruta
      </button>
      <button
        onClick={() => onClose()}
        className="mt-4 ml-10 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Cerrar
      </button>
    </div>
  );
};

export default RouteInfo;
