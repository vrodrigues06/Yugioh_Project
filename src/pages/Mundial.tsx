import React from "react";
import { Helmet } from "react-helmet-async";
import Error from "../components/Error";
import { motion } from "framer-motion";
import MundialModel from "./Mundial.model";
import Modal from "../components/modal";
import { IoMdAdd } from "react-icons/io";
import TorneioResultados from "../features/torneio-detalhes/TorneioResultados";
import RankingAnual from "../features/torneio-card/RankingAnual";
import Loading from "../components/Loading";
import TorneiosAnterioresMundial from "../features/mundial-detalhes/TorneiosAnterioresMundial";
import MundialHallOfFame from "../features/mundial-detalhes/MundialHallOfFame";
import { Link } from "react-router";
import { MdDashboardCustomize } from "react-icons/md";
import { useAuth } from "../components/AuthContext";
import TorneioChavesFinal from "../features/torneio-detalhes/TorneioChavesFinal";

const Mundial = () => {
  const {
    torneioAno,
    torneioSelected,
    edicaoNumber,
    anos,
    handleTorneioAnoChange,
    error,
    isLoading,
  } = MundialModel();
  const { status } = useAuth();
  const [abaSelecionada, setAbaSelecionada] = React.useState("resultados");

  React.useEffect(() => {
    setAbaSelecionada("resultados");
  }, [torneioAno]);

  if (!torneioSelected || !torneioAno)
    return (
      <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
        <div className="flex items-center mb-2 sm:mb-0 gap-2">
          <div className="text-orange-500">
            Não há torneio registrado, clique no botão para criar
          </div>
          <div>
            <Link
              to={`/mundial/painel-mundial`}
              title="Painel Mundial"
              className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 flex items-center justify-center"
            >
              <MdDashboardCustomize className="text-orange-500 text-lg sm:text-2xl" />
            </Link>
          </div>
        </div>
      </section>
    );

  if (error) return <Error message={error} />;

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Yugioh | Mundial</title>
        <meta
          name="description"
          content="Página Contento todos os Torneios Mundiais e seus resultados"
        />
      </Helmet>
      <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
        <div className="grid gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-0">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold text-2xl">
                Mundial
              </h1>
              <div className="flex gap-1.5 sm:gap-2 items-center">
                <select
                  onChange={handleTorneioAnoChange}
                  className="bg-azul-950 text-orange-400 font-semibold pl-2 pr-px sm:pl-3 text-xs sm:text-sm  sm:pr-1 py-2 rounded-md shadow-md outline-none 
              focus:ring-2 focus:ring-sky-800 hover:bg-azul-800 transition-all duration-200"
                >
                  <option value="" disabled>
                    ano
                  </option>

                  {anos.map((a) => (
                    <option key={a} value={a} className="text-white">
                      {a}
                    </option>
                  ))}
                </select>
                {status !== "admin" ? (
                  ""
                ) : (
                  <Link
                    to={`/mundial/painel-mundial`}
                    title="Painel Mundial"
                    className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 flex items-center justify-center"
                  >
                    <MdDashboardCustomize className="text-orange-500 text-lg sm:text-2xl" />
                  </Link>
                )}
              </div>
            </div>
            <span className="text-slate-400 text-sm">
              Temporada {torneioSelected?.ano} - Edição {edicaoNumber}
            </span>
          </motion.div>
          <MundialHallOfFame ano={torneioAno} />
          <div key={torneioAno} className="grid lg:grid-cols-[3fr_1fr] gap-4">
            <div className="overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <button
                  onClick={() => setAbaSelecionada("resultados")}
                  className={`w-full sm:w-auto px-4 py-2 rounded-md font-semibold cursor-pointer
      ${
        abaSelecionada === "resultados"
          ? "bg-orange-500 text-white"
          : "bg-slate-800 text-slate-300"
      }`}
                >
                  Resultados
                </button>

                {torneioSelected.matches.length !== 0 && (
                  <button
                    onClick={() => setAbaSelecionada("chaves")}
                    className={`w-full sm:w-auto px-4 py-2 rounded-md font-semibold cursor-pointer
        ${
          abaSelecionada === "chaves"
            ? "bg-orange-500 text-white"
            : "bg-slate-800 text-slate-300"
        }`}
                  >
                    Chave Final
                  </button>
                )}
              </div>

              {abaSelecionada === "chaves" ? (
                <TorneioChavesFinal torneio={torneioSelected} />
              ) : (
                <TorneioResultados torneio={torneioSelected} ano={torneioAno} />
              )}
            </div>
            <RankingAnual ano={torneioAno} geracao="mundial" />
          </div>
          <TorneiosAnterioresMundial ano={torneioAno} />
        </div>
      </section>
    </>
  );
};

export default Mundial;
