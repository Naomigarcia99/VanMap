import { NavLink } from "react-router-dom";
import homeIcon from "../../assets/images/home.png";
import homeIcon2 from "../../assets/images/home2.png";
import mapIcon2 from "../../assets/images/maps2.png";
import mapIcon1 from "../../assets/images/maps1.png";
import userIcon1 from "../../assets/images/user1.png";
import userIconActive from "../../assets/images/user2.png";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t p-3 flex justify-around items-center shadow-lg h-14">
      <NavLink to="/">
        {({ isActive }) => (
          <img
            src={isActive ? homeIcon2 : homeIcon}
            alt="Inicio"
            className="w-6 h-6"
          />
        )}
      </NavLink>

      <NavLink to="/map">
        {({ isActive }) => (
          <img
            src={isActive ? mapIcon2 : mapIcon1}
            alt="Mapa"
            className="w-6 h-6"
          />
        )}
      </NavLink>

      <NavLink to={user ? "/profile" : "/login"}>
        {({ isActive }) => (
          <img
            src={isActive ? userIconActive : userIcon1}
            alt="Usuario"
            className="w-6 h-6"
          />
        )}
      </NavLink>
    </div>
  );
};

export default Navbar;
