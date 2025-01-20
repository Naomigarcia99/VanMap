import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouteContext } from "../context/RouteContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map() {
  const { initializeMap } = useRouteContext();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    initializeMap(mapContainerRef.current);
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="h-64 w-full mt-4 rounded-lg shadow-md"
      style={{ height: "400px", width: "100%" }}
    />
  );
}

export default Map;
