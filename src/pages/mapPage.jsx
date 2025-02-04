import React, { useState } from "react";
import Map from "../components/ui/Map";
import RouteForm from "../components/form/RouteForm";
import { useRouteContext } from "../context/RouteContext";
import { useMapContext } from "../context/MapContext";
import RouteInfo from "../components/ui/RouteInfo";

function mapPage() {
  const {
    route,
    setOrigin,
    setDestination,
    setWaypoints,
    saveRouteToDataBase,
  } = useRouteContext();

  const { clearMap } = useMapContext();

  const [isRouteInfoVisible, setIsRouteInfoVisible] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleRouteSubmit = async ({ origin, destination, waypoints }) => {
    setOrigin(origin);
    setDestination(destination);
    setWaypoints(waypoints);
    setIsRouteInfoVisible(true);
  };

  const handleCloseRouteInfo = () => {
    clearMap();
    setIsRouteInfoVisible(false);
  };

  const handleSaveRoute = async () => {
    if (route && route.geometry) {
      await saveRouteToDataBase(route);
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 3000);
      clearMap();
      setIsRouteInfoVisible(false);
    } else {
      console.warn("no hay una ruta calculada para guardar");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pastelBeige via-pastelBlue to-pastelGreen flex flex-col items-center pb-14">
      <header className="w-full bg-blue-300 text-center py-1 shadow-md h-10">
        <h1 className="text-2xl font-bold">VanMap</h1>
      </header>
      <main className="flex-1 w-full px-4 py-2">
        {showSaveMessage && (
          <div className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg z-50">
            Ruta guardada
          </div>
        )}
        <section className="flex flex-col xl:flex-row xl:gap-3 items-center">
          <div className="w-full xl:w-1/3">
            <RouteForm onRouteSubmit={handleRouteSubmit} />
            <RouteInfo
              route={route}
              isVisible={isRouteInfoVisible}
              onSave={handleSaveRoute}
              onClose={handleCloseRouteInfo}
            />
          </div>
          <div className="w-full xl:w-2/3">
            <Map />
          </div>
        </section>
      </main>
    </div>
  );
}

export default mapPage;
