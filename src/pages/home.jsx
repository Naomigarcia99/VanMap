import React from "react";
import Map from "../components/Map";
import RouteForm from "../components/RouteForm";

function Home() {
  return (
    <div className="min-h-screen bg-pastelBeige flex flex-col items-center">
      <header className="w-full bg-pastelBlue text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold">Planificador de Rutas</h1>
      </header>
      <main className="flex-1 w-full max-w-md p-4">
        <RouteForm />
        <Map />
      </main>
    </div>
  );
}

export default Home;
