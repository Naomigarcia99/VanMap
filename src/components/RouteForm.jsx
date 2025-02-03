import React from "react";
import { useRouteContext } from "../context/RouteContext";
import AutocompleteInput from "./AutocompleteInput";
import FavoriteButton from "./FavoriteButton";

function RouteForm({ onRouteSubmit }) {
  const {
    origin,
    originName,
    setOrigin,
    setOriginName,
    destination,
    destinationName,
    setDestination,
    setDestinationName,
    waypoints,
    setWaypoints,
    waypointNames,
    setWaypointNames,
    getRoute,
  } = useRouteContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      alert("Completa los campos de origen y destino");
      return;
    }
    onRouteSubmit({
      origin,
      destination,
      waypoints: waypoints.filter(Boolean),
    });
    getRoute();
  };

  const addWaypoint = () => {
    setWaypoints([...waypoints, []]);
    setWaypointNames([...waypointNames, ""]);
  };

  const updateWaypoint = (index, suggestion) => {
    const newWaypoints = [...waypoints];
    newWaypoints[index] = suggestion.geometry.coordinates;
    setWaypoints(newWaypoints);

    const newWaypointNames = [...waypointNames];
    console.log(newWaypointNames);
    newWaypointNames[index] = suggestion.place_name;
    setWaypointNames(newWaypointNames);
  };

  const removeWaypoint = (index) => {
    const newWaypoints = waypoints.filter((_, i) => i !== index);
    setWaypoints(newWaypoints);
    const newWaypointNames = waypointNames.filter((_, i) => i !== index);
    setWaypointNames(newWaypointNames);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label htmlFor="origin" className="block text-sm font-medium">
          Origen
        </label>
        <div className="flex justify-between">
          <AutocompleteInput
            placeholder="Ej: Madrid"
            onSelect={(suggestion) => {
              setOrigin(suggestion.geometry.coordinates);
              setOriginName(suggestion.place_name);
            }}
          />
          {origin && origin.length === 2 && originName && (
            <FavoriteButton location={origin} name={originName} />
          )}
        </div>
      </div>
      <div>
        <label htmlFor="destination" className="block text-sm font-medium">
          Destino
        </label>
        <div className="flex justify-between">
          <AutocompleteInput
            placeholder="Ej: Barcelona"
            onSelect={(suggestion) => {
              setDestination(suggestion.geometry.coordinates);
              setDestinationName(suggestion.place_name);
            }}
          />
          {destination && destination.length === 2 && destinationName && (
            <FavoriteButton location={destination} name={destinationName} />
          )}
        </div>
      </div>
      <div>
        {waypoints.length > 0 &&
          waypoints.map((_, index) => (
            <div key={index} className="flex items-center space-x-2 m-2 w-64">
              <AutocompleteInput
                placeholder={`Parada ${index + 1}`}
                onSelect={(suggestion) => {
                  updateWaypoint(index, suggestion);
                }}
              />
              {waypoints.length >= 1 && (
                <button
                  type="button"
                  onClick={() => removeWaypoint(index)}
                  className="text-red-500 bg-white rounded-full"
                >
                  ✘
                </button>
              )}
            </div>
          ))}
        <button
          type="button"
          onClick={addWaypoint}
          className="bg-blue-400 rounded-full p-1 text-white text-sm hover:bg-blue-500"
        >
          Añadir Parada
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-3 bg-blue-500 py-1 rounded-full text-white font-semibold hover:bg-blue-700"
        >
          Calcular Ruta
        </button>
      </div>
    </form>
  );
}

export default RouteForm;
