import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map() {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-3.70379, 40.41678], // Madrid como punto inicial
      zoom: 10,
    });

    //return () => map.remove();
    //map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  /*useEffect(() => {
    if (!map.current) return; // Verifica que el mapa esté inicializado

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);*/

  return (
    <div
      ref={mapContainerRef}
      className="h-64 w-full mt-4 rounded-lg shadow-md"
      style={{ height: "400px", width: "100%" }}
    />
  );
}

export default Map;
