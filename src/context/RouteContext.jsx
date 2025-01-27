import { createContext, useState, useContext, useEffect } from "react";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [origin, setOrigin] = useState("");
  const [originName, setOriginName] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [waypointNames, setWaypointNames] = useState([]);


  //Obtener coordenadas
  const getCoordinates = async (location) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
      location
    )}&access_token=${mapboxgl.accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.features.length > 0) {
      return data.features[0].geometry.coordinates;
    }

    return null;
  };

  //Actualizar ubicaciones
  const updateLocation = async (
    setLocation,
    setLocationName,
    location,
    currentCoordinates
  ) => {
    const coordinates = await getCoordinates(location);

    if (
      coordinates &&
      (!currentCoordinates ||
        coordinates[0] !== currentCoordinates[0] ||
        coordinates[1] !== currentCoordinates[1])
    ) {
      setLocation(coordinates);
      setLocationName(location);
    } else {
      console.warn(`No se pudo encontrar la ubicación: ${location}`);
    }
  };


  useEffect(() => {
    if (originName)
      updateLocation(setOrigin, setOriginName, originName, origin, origin);

    if (destinationName)
      updateLocation(
        setDestination,
        setDestinationName,
        destinationName,
        destination,
        destination
      );

    waypoints.forEach((wp, index) => {
      if (wp)
        updateLocation(
          (coordinates) => {
            setWaypoints((prev) => {
              const newWaypoints = [...prev];
              newWaypoints[index] = coordinates;
              return newWaypoints;
            });
          },
          (name) =>
            setWaypointNames((prev) => {
              const newNames = [...prev];
              newNames[index] = name;
              return newNames;
            }),
          wp,
          waypoints[index]
        );
    });
  }, [origin, destination, waypoints]);



  return <RouteContext.Provider value={{origin, setOrigin, originName, setOriginName, destination, setDestination, destinationName, setDestinationName, waypoints, setWaypoints, waypointNames, setWaypointNames,}}>{children}</RouteContext.Provider>;
};

export const useRouteContext = () => {
  return useContext(RouteContext);
};
