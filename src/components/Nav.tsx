import React from "react";
import { NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "./SearchBar"; // <-- importa sua SearchBar
import useAllPersonagens from "../hooks/useAllPersonagens";
import { useAllTorneios } from "../hooks/useAllTorneios";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem = ({ to, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-orange-500 w-full block sm:p-2" : "w-full block sm:p-2"
      }
    >
      {children}
    </NavLink>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { data: personagens = [] } = useAllPersonagens();
  const { data: torneios = [] } = useAllTorneios();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="flex items-center justify-between gap-4">
      {/* Botão mobile */}
      <button
        className="sm:hidden cursor-pointer flex items-center gap-2  py-2 px-4 rounded-full text-azul-100 bg-gradient-to-t from-orange-500 to-orange-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="h-3 w-4 flex flex-col justify-between *:h-0.5 *:rounded-md *:bg-azul-100">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Menu Desktop */}
      <ul className="hidden sm:flex gap-2 *:transition-colors *:hover:text-orange-500">
        <li>
          <NavItem to="/torneios">Torneios</NavItem>
        </li>
        <li>
          <NavItem to="/personagens">Personagens</NavItem>
        </li>
        <li>
          <NavItem to="/mundial">Mundial</NavItem>
        </li>
        <li>
          <NavItem to="/regras">Regras</NavItem>
        </li>
      </ul>

      {/* SearchBar sempre visível no Desktop */}
      <div className="hidden sm:block w-full max-w-xs">
        <SearchBar personagens={personagens} torneios={torneios} />
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed z-30 lg:hidden inset-0 bg-azul-900/40 backdrop-blur-md"
              onClick={() => setIsOpen(!isOpen)}
            ></motion.div>
            <motion.ul
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 top-10 z-40 divide-y-2 divide-white/10 *:hover:text-orange-500 *:transition-all *:hover:bg-azul-200/10"
            >
              {["/torneios", "/personagens", "/mundial", "/regras"].map(
                (path, index) => (
                  <motion.li
                    key={path}
                    className="p-2 border-b border-gray-700"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <NavItem to={path}>
                      {path.replace("/", "")[0].toUpperCase() + path.slice(2)}
                    </NavItem>
                  </motion.li>
                ),
              )}
              {/* SearchBar dentro do menu mobile */}
              <motion.li
                className="p-2 border-b border-gray-700"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <SearchBar personagens={personagens} torneios={torneios} />
              </motion.li>
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
