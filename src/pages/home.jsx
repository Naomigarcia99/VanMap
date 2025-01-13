import { Link } from "react-router-dom";
import Van from "../assets/images/van.mp4";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover max-w-full max-h-screen"
      >
        <source src={Van} type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>

      <div className="relative flex flex-col justify-center items-center h-full text-white bg-black bg-opacity-50">
        <h1 className="text-4xl font-semibold text-center mb-6">
          Bienvenidos a VanMap
        </h1>
        <p className="text-xl mb-4 text-center">
          Tu app para planificar y guardar rutas para tus viajes en caravana.
        </p>
        <Link
          to="/map"
          className="bg-blue-500 text-white p-3 rounded-full shadow-md text-center w-auto"
        >
          Empezar
        </Link>
      </div>
    </div>
  );
};

export default Home;
