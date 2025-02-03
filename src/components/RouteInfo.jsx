import React from "react";

const RouteInfo = ({ route, isVisible, onSave, onClose }) => {
  if (!route || !isVisible) return null;

  const formatDuration = (seconds) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return ` ${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return ` ${hours} horas y ${remainingMinutes} minutos`;
  };

  return (
    <section
      aria-labelledby="route-info"
      className="mt-3 text-center bg-white p-6 rounded-xl shadow-md  "
    >
      <h2 className="font-semibold text-xl">Ruta Calculada</h2>
      <dl className="mt-1">
        <div className="flex justify-center gap-1">
          <dt className="font-medium">Distancia: </dt>
          <dd>{(route.distance / 1000).toFixed(1)} km</dd>
        </div>
        <div className="flex justify-center gap-1">
          <dt className="font-medium">Tiempo:</dt>
          <dd>{formatDuration(route.duration)}</dd>
        </div>
      </dl>
      <div className="flex justify-center">
        <button
          onClick={onSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Guardar Ruta
        </button>
        <button
          onClick={() => onClose()}
          className="mt-4 ml-10 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </section>
  );
};

export default RouteInfo;
