import { NavLink } from "react-router-dom";
import homeIcon from "../assets/images/home.png";
import mapIcon from "../assets/images/map2.png";
import userIcon from "../assets/images/user.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t p-3 flex justify-around items-center shadow-lg h-14">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `rounded-full ${
            isActive
              ? "shadow-xl p-2 shadow-pastelBlue"
              : "hover:shadow-xl hover:bg-pastelBlue"
          }`
        }
      >
        <img src={homeIcon} alt="Inicio" className="w-5 h-5" />
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          ` rounded-full ${
            isActive
              ? "shadow-xl p-1 shadow-pastelBlue"
              : "hover:shadow-xl hover:bg-pastelBlue"
          }`
        }
      >
        <img src={mapIcon} alt="Mapa" className="w-8 h-8" />
      </NavLink>

      <NavLink
        to={user ? "/profile" : "/login"}
        className={({ isActive }) =>
          `rounded-full ${
            isActive
              ? "shadow-xl p-1 shadow-pastelBlue"
              : "hover:shadow-xl hover:bg-pastelBlue"
          }`
        }
      >
        <img src={userIcon} alt="Mapa" className="w-6 h-6" />
      </NavLink>
    </div>
  );
};

export default Navbar;
