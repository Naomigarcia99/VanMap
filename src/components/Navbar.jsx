import { Link, NavLink } from "react-router-dom";
import homeIcon from "../assets/images/home.png";
import mapIcon from "../assets/images/map2.png";
import userIcon from "../assets/images/user.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around items-center shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive
              ? "shadow-xl p-2 rounded shadow-pastelBlue"
              : "hover:shadow-xl hover:bg-pastelBlue rounded-full"
          }`
        }
      >
        <img src={homeIcon} alt="Inicio" className="w-5 h-5 mr-2" />
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `${
            isActive
              ? "shadow-xl p-2 rounded shadow-pastelBlue"
              : "hover:shadow-xl hover:bg-pastelBlue rounded-full"
          }`
        }
      >
        <img src={mapIcon} alt="Mapa" className="w-8 h-8 mr-2" />
      </NavLink>

      <NavLink
        to={user ? "/profile" : "/login"}
        className={({ isActive }) =>
          `${
            isActive
              ? "shadow-xl p-2 rounded shadow-pastelBlue"
              : "hover:shadow-xl hover:bg-pastelBlue rounded-full"
          }`
        }
      >
        <img src={userIcon} alt="Mapa" className="w-6 h-6 mr-2" />
      </NavLink>
    </div>
  );
};

export default Navbar;
