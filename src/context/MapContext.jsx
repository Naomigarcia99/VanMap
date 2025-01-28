import { useContext, useEffect, createContext, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouteContext } from "./RouteContext";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const {
    origin,
    destination,
    waypoints,
    routeGeometry,
    setRoute,
    setRouteGeometry,
    setOrigin,
    setDestination,
    setWaypoints,
  } = useRouteContext();

  const initializeMap = (container) => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    mapRef.current = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-3.70379, 40.41678],
      zoom: 10,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());
  };

  const updateMarkersAndRoute = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const addMarker = (location, color) => {
      if (location && location.length === 2 && !location.includes(NaN)) {
        const marker = new mapboxgl.Marker({ color })
          .setLngLat(location)
          .addTo(mapRef.current);
        markersRef.current.push(marker);
      }
    };

    if (origin) addMarker(origin, "red");
    if (destination) addMarker(destination, "green");
    waypoints.forEach((wp) => addMarker(wp, "gold"));

    const map = mapRef.current;
    if (map && map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
  };

  useEffect(() => {
    updateMarkersAndRoute();
  }, [origin, destination, waypoints]);

  useEffect(() => {
    if (
      routeGeometry &&
      routeGeometry.coordinates &&
      routeGeometry.coordinates.length > 0
    ) {
      const map = mapRef.current;

      if (map.getSource("route")) {
        map.getSource("route").setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: routeGeometry.coordinates,
          },
        });
      } else {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: routeGeometry.coordinates,
            },
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 4,
          },
        });
      }
    }
  }, [routeGeometry]);

  const clearMap = () => {
    const map = mapRef.current;

    if (map && map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    setRoute(null);
    setRouteGeometry(null);
    setOrigin(null);
    setDestination(null);
    setWaypoints([]);
  };

  return (
    <MapContext.Provider
      value={{ initializeMap, updateMarkersAndRoute, clearMap }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  return useContext(MapContext);
};
