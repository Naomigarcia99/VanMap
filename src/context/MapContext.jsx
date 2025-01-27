import { useContext, useEffect, createContext, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

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

  return (
    <MapContext.Provider value={{ initializeMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  return useContext(MapContext);
};
