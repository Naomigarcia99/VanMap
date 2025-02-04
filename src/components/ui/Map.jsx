import React, { useEffect, useRef } from "react";
import { useMapContext } from "../../context/MapContext";

function Map() {
  const { initializeMap } = useMapContext();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    initializeMap(mapContainerRef.current);
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="h-64 w-full mt-3 rounded-lg shadow-md"
      style={{ height: "400px", width: "100%" }}
    />
  );
}

export default Map;
