import { FaTrophy } from "react-icons/fa";
import { TbCardsFilled, TbWorld } from "react-icons/tb";
import { NavLink } from "react-router";

const RegrasNav = () => {
  return (
    <nav className="sm:bg-azul-800 sm:rounded-sm sm:p-2 sm:h-[115px] sm:min-h-[115px] sm:max-h-[115px]">
      <ul className="flex sm:grid gap-1 sm:gap-2">
        <li className="bg-azul-800 rounded-2xl text-xs sm:rounded-md flex items-center">
          <NavLink
            className={({ isActive }) =>
              `w-full h-full flex items-center gap-1.5 px-3 py-1 rounded-2xl sm:rounded-md ${
                isActive ? "text-white font-bold bg-azul-400" : "text-gray-300"
              }`
            }
            to="/regras/decks"
          >
            {" "}
            <TbCardsFilled /> Deck
          </NavLink>
        </li>
        <li className="bg-azul-800 rounded-2xl text-xs sm:rounded-md flex items-center">
          <NavLink
            className={({ isActive }) =>
              `w-full h-full flex items-center gap-1.5 px-3 py-1 rounded-2xl sm:rounded-md ${
                isActive ? "text-white font-bold bg-azul-400" : "text-gray-300"
              }`
            }
            to="/regras/torneio"
          >
            <FaTrophy /> Torneio
          </NavLink>
        </li>

        <li className="bg-azul-800 rounded-2xl text-xs sm:rounded-md flex items-center">
          <NavLink
            className={({ isActive }) =>
              `w-full h-full flex items-center gap-1.5 px-3 py-1 rounded-2xl sm:rounded-md ${
                isActive ? "text-white font-bold bg-azul-400" : "text-gray-300"
              }`
            }
            to="/regras/mundial"
          >
            {" "}
            <TbWorld /> Mundial
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default RegrasNav;
