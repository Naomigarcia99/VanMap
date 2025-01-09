import React from "react";

function RouteForm() {
  return (
    <form className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="origin" className="block text-sm font-medium">
          Origen
        </label>
        <input
          id="origin"
          type="text"
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-pastelBlue"
        />
      </div>
      <div>
        <label htmlFor="destination" className="block text-sm font-medium">
          Destino
        </label>
        <input
          id="destination"
          type="text"
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-pastelPink"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pastelGreen py-2 rounded-lg text-white font-semibold hover:bg-pastelBlue"
      >
        Calcular Ruta
      </button>
    </form>
  );
}

export default RouteForm;
