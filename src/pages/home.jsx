import { Link } from "react-router-dom";
import Van from "../assets/images/van.mp4";
import Van2 from "../assets/images/van3.mp4";
import Logo from "../assets/images/VanMap-modified.png";

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

      <main className="relative flex flex-col justify-around items-center h-full text-white bg-black bg-opacity-50 px-5">
        <header className="absolute top-8 flex flex-col items-center text-center mb-24">
          <img src={Logo} alt="Logo" className="h-32 w-32" />
          <h1 className="mt-8 bg-gradient-to-r from-pastelBeige via-pastelBlue to-pastelGreen bg-clip-text text-5xl font-extrabold text-transparent sm:w-auto sm:text-6xl">
            Bienvenidos a <br /> VanMap
          </h1>
        </header>
        <div className="flex flex-col justify-center items-center mt-80 mb-48">
          <p className="text-xl mb-8 text-center mx-5">
            Tu app para planificar y guardar rutas para tus viajes en caravana
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
        </div>
      </main>
    </div>
  );
};

export default Home;
