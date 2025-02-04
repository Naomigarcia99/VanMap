import { Link } from "react-router-dom";
import Van from "../assets/images/van.mp4";
import Van2 from "../assets/images/van3.mp4";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover hidden sm:block "
      >
        <source src={Van2} type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover block sm:hidden "
      >
        <source src={Van} type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>

      <main className="relative flex flex-col justify-center items-center h-full text-white bg-black bg-opacity-50">
        <header className=" text-center mb-6">
          <h1 className="text-4xl font-semibold mb-10">Bienvenidos a VanMap</h1>
        </header>
        <p className="text-xl mb-6 text-center mx-5">
          Tu app para planificar y guardar rutas para tus viajes en caravana.
        </p>
        <div>
          <Link
            to="/map"
            className="bg-blue-500 text-white p-3 rounded-full shadow-md text-center w-auto transition hover:bg-blue-600"
            aria-label="Empezar"
          >
            Empezar
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
