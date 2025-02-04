import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center intems-center text-center">
      <h1 className="text-4xl font-bold text-red-500">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-gray-700 my-6">
        La página que buscas no existe ☹️
      </p>
      <div className="bg-red-400 text-white font-bold hover:bg-red-500 w-32 mx-auto rounded-full">
        <Link to="/">Volver al inicio</Link>
      </div>
    </div>
  );
};
export default NotFound;
