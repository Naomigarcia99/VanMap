import { createContext, useState, useContext, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { db } from "../credentials";
import {
  getDocs,
  where,
  query,
  collection,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [origin, setOrigin] = useState("");
  const [originName, setOriginName] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [waypointNames, setWaypointNames] = useState([]);
  const [route, setRoute] = useState(null);
  const [routeGeometry, setRouteGeometry] = useState(null);

  const { user } = useAuth();
  const [userRoutes, setUserRoutes] = useState([]);

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

  const getRoute = async () => {
    try {
      if (!origin || !destination) {
        console.warn("origen y destino son necesarios para calcular la ruta");
        return;
      }

      const coordinates = [origin, ...waypoints, destination]
        .map((coord) => coord.join(","))
        .join(";");

      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?access_token=${mapboxgl.accessToken}&geometries=geojson&steps=true`;

      const response = await fetch(directionsUrl);
      const data = await response.json();

      if (!response.ok) {
        console.error(
          `Error en la solicitud: ${response.status} - ${response.statusText}`
        );
        return;
      }

      if (data.routes && data.routes.length > 0) {
        const newRoute = data.routes[0];
        const { geometry } = newRoute;

        setRoute(newRoute);
        setRouteGeometry(geometry);
      } else {
        console.warn("no se pudo obtener la ruta");
      }
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
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

  useEffect(() => {
    if (route && route.geometry) {
      setRouteGeometry(route.geometry);
    } else {
      console.warn("la geometria de la ruta no está disponible");
    }
  }, [route]);

  const saveRouteToDataBase = async (routeData) => {
    try {
      const { geometry } = routeData;
      const simplifiedGeometry = geometry.coordinates.flat();

      if (!origin || !Array.isArray(origin) || origin.length !== 2) {
        console.error("coordenadas de origen no válidas");
        return;
      }

      if (
        !destination ||
        !Array.isArray(destination) ||
        destination.length !== 2
      ) {
        console.error("coordenadas de destino no válidas");
        return;
      }

      const validWaypoints = Array.isArray(waypoints)
        ? waypoints.filter((wp) => wp && wp.length === 2)
        : [];

      const routeRef = collection(db, "routes");
      const newRouteDoc = await addDoc(routeRef, {
        userId: user.uid,
        origin: { name: originName, coordinates: origin },
        destination: { name: destinationName, coordinates: destination },
        waypoints: validWaypoints.map((_, index) => ({
          name: waypointNames[index],
          coordinates: waypoints[index],
        })),
        geometry: simplifiedGeometry,
        distance: routeData.distance,
        duration: routeData.duration,
        createdAt: new Date(),
      });

      return newRouteDoc.id;
    } catch (error) {
      console.error("Error al guardar la ruta:", error);
    }
  };

  const loadUserRoutes = async (userId) => {
    try {
      const routesRef = collection(db, "routes");
      const q = query(
        routesRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const routes = querySnapshot.docs.map((doc) => doc.data());

      setUserRoutes(routes);
    } catch (error) {
      console.error("Error al recuperar las rutas del usuario", error);
    }
  };

  return (
    <RouteContext.Provider
      value={{
        origin,
        setOrigin,
        originName,
        setOriginName,
        destination,
        setDestination,
        destinationName,
        setDestinationName,
        waypoints,
        setWaypoints,
        waypointNames,
        setWaypointNames,
        route,
        setRoute,
        getRoute,
        routeGeometry,
        setRouteGeometry,
        saveRouteToDataBase,
        loadUserRoutes,
        userRoutes,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  return useContext(RouteContext);
};
