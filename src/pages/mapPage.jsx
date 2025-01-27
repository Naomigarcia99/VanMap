import React, { useState } from "react";
import Map from "../components/Map";
import RouteForm from "../components/RouteForm";
import { useRouteContext } from "../context/RouteContext";
import { useMapContext } from "../context/MapContext";

function Home() {
  const { route, setOrigin, setDestination, setWaypoints } =
    useRouteContext();

  const { clearMap } = useMapContext();

  const [isRouteInfoVisible, setIsRouteInfoVisible] = useState(false);

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

  return (
    <div className="min-h-screen bg-pastelBeige flex flex-col items-center pb-14">
      <header className="w-full bg-pastelBlue text-center py-4 shadow-md h-14">
        <h1 className="text-2xl font-bold">VanMap</h1>
      </header>
      <main className="flex-1 w-full max-w-md p-4">
        <RouteForm onRouteSubmit={handleRouteSubmit} />
        <RouteInfo
          route={route}
          isVisible={isRouteInfoVisible}
          onSave={handleSaveRoute}
          onClose={handleCloseRouteInfo}
        />
        <Map />
      </main>
    </div>
  );
}

export default Home;
