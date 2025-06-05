import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { FaTrophy } from "react-icons/fa";
import { useTorneioStore } from "../store/useTorneiosStore";
import { geracoes } from "../utils/global";
import { motion } from "framer-motion";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { MdDashboardCustomize } from "react-icons/md";
import { useAuth } from "../components/AuthContext";

const Torneios = () => {
  const { status } = useAuth();
  const { torneiosStore, fetchAllTorneios, error, isLoading } =
    useTorneioStore();

  React.useEffect(() => {
    fetchAllTorneios();
  }, [fetchAllTorneios]);

  if (error) return <Error message={error} />;

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Yugioh | Torneios</title>
        <meta
          name="description"
          content="Página contendo os detalhes de cada torneio por geração."
        />
      </Helmet>
      <section className="container font-sans  py-4 px-4 sm:px-8 md:px-16 mx-auto ">
        <div className="flex">
          <div>
            <h1 className="text-lg sm:text-2xl text-white font-bold mb-1">
              Geração de Torneios
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-16">
              Explore as diferentes gerações dos torneios e seu incrível
              histórico.
            </p>
          </div>
          {status !== "admin" ? (
            ""
          ) : (
            <div className="ml-auto">
              <Link
                to={`/torneios/painel-torneio`}
                title="Painel Torneio"
                className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 flex items-center justify-center"
              >
                <MdDashboardCustomize className="text-orange-500 text-lg sm:text-2xl" />
              </Link>
            </div>
          )}
        </div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {geracoes.map((gen) => {
            const countTorneiosByGeracao = torneiosStore.filter(
              (t) => t.geracao === gen,
            );
            return (
              <Link key={gen} className="group" to={`/torneios/${gen}`}>
                <div className=" flex items-end relative h-36 rounded-lg p-2 pb-3 sm:p-4  shadow-lg sm:h-48 transition-all border border-transparent group-hover:border-orange-500 ">
                  <div
                    className="absolute inset-0 rounded-lg -z-10 "
                    style={{
                      backgroundImage: `url('./torneios/torneio-${gen}.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black opacity-80 rounded-lg -z-5  "></div>

                  <div>
                    <h3 className="text-white font-bold">
                      {gen.toUpperCase()}
                    </h3>
                    <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent text-sm flex items-center gap-1">
                      <FaTrophy className="text-orange-500" />
                      {countTorneiosByGeracao.length <= 1
                        ? `${countTorneiosByGeracao.length} Torneio`
                        : `${countTorneiosByGeracao.length} Torneios`}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </section>
      ;
    </>
  );
};

export default Torneios;
