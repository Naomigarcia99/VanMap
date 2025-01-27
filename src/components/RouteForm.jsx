import React from "react";
import { useRouteContext } from "../context/RouteContext";
import AutocompleteInput from "./AutocompleteInput";

function RouteForm({ onRouteSubmit }) {
  const {
    origin,
    setOrigin,
    setOriginName,
    destination,
    setDestination,
    setDestinationName,
    waypoints,
    setWaypoints,
    waypointNames,
    setWaypointNames,
    updateRoute,
    getRoute,
  } = useRouteContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRouteSubmit(
      { origin, destination, waypoints: waypoints.filter(Boolean) },
      updateRoute
    );
    getRoute();
  };

  const addWaypoint = () => {
    setWaypoints([...waypoints, []]);
    setWaypointNames([...waypointNames, ""]);
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
        <AutocompleteInput
          placeholder="Origen"
          onSelect={(suggestion) => {
            setOrigin(suggestion.geometry.coordinates);
            setOriginName(suggestion.place_name);
          }}
        />
      </div>
      <div>
        <label htmlFor="destination" className="block text-sm font-medium">
          Destino
        </label>
        <AutocompleteInput
          placeholder="Destino"
          onSelect={(suggestion) => {
            setDestination(suggestion.geometry.coordinates);
            setDestinationName(suggestion.place_name);
          }}
        />
      </div>
      <div>
        {waypoints.length > 0 &&
          waypoints.map((_, index) => (
            <div key={index} className="flex items-center space-x-2 m-2">
              <AutocompleteInput
                placeholder={`Parada ${index + 1}`}
                value={waypointNames[index]}
                onSelect={(suggestion) => {
                  const newWaypoints = [...waypoints];
                  newWaypoints[index] = suggestion.geometry.coordinates;
                  setWaypoints(newWaypoints);

                  const newWaypointNames = [...waypointNames];
                  console.log(newWaypointNames);
                  newWaypointNames[index] = suggestion.place_name;
                  setWaypointNames(newWaypointNames);
                }}
              />
              {waypoints.length >= 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newWaypoints = waypoints.filter(
                      (_, i) => i !== index
                    );
                    setWaypoints(newWaypoints);
                    const newWaypointNames = waypointNames.filter(
                      (_, i) => i !== index
                    );
                    setWaypointNames(newWaypointNames);
                  }}
                  className="text-red-500 bg-red-200 rounded-full"
                >
                  ✘
                </button>
              )}
            </div>
          ))}
        <button
          type="button"
          onClick={addWaypoint}
          className="bg-pastelBlue rounded-full p-1 text-white text-sm hover:bg-pastelGreen"
        >
          Añadir Parada
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-pastelGreen py-2 rounded-full text-white font-semibold hover:bg-pastelBlue"
      >
        Calcular Ruta
      </button>
    </form>
  );
}

export default RouteForm;
