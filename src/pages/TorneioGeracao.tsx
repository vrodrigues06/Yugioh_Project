import { motion } from "framer-motion";
import RankingAnual from "../features/torneio-card/RankingAnual";
import TorneioResultados from "../features/torneio-detalhes/TorneioResultados";
import TorneiosAnteriores from "../features/torneio-detalhes/TorneiosAnteriores";
import { TorneioGeracaoModel } from "./TorneioGeracao.model";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/modal";
import TournamentForm from "../features/torneio-detalhes/TournamentForm";
import MundialForm from "../features/mundial-detalhes/MundialForm";
import PersonagemForm from "../features/personagens-detalhes/PersonagemForm";
import useModal from "../hooks/useModal";
import TorneioHallOfFame from "../features/torneio-detalhes/TorneioHallOfFame";
import { Link } from "react-router";

const TorneioGeracao = () => {
  const {
    geracao,
    torneioAno,
    torneioSelected,
    edicaoNumber,
    anos,
    handleTorneioAnoChange,
    error,
    isLoading,
  } = TorneioGeracaoModel();

  if (!geracao || !torneioSelected || !torneioAno)
    return (
      <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
        <div className="flex items-center mb-2 sm:mb-0 gap-2">
          <div className="text-orange-500">Não há torneio registrado</div>
        </div>
      </section>
    );

  if (error) return <Error message={error} />;

  if (isLoading) return <Loading />;

  return (
    <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <div className="grid gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center mb-2 sm:mb-0">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold text-2xl">
              {geracao?.toUpperCase()}
            </h1>
            <div className="flex gap-1.5 sm:gap-2 items-center">
              <select
                onChange={handleTorneioAnoChange}
                className="bg-azul-950 text-orange-400 font-semibold pl-2 pr-px sm:pl-3 text-xs sm:text-sm  sm:pr-1 py-2 rounded-md shadow-md outline-none 
              focus:ring-2 focus:ring-sky-800 hover:bg-azul-800 transition-all duration-200"
              >
                <option value={torneioAno}>{torneioAno}</option>

                {anos.map((a) => {
                  if (a === torneioAno) return;
                  return (
                    <option key={a} value={a} className="text-white">
                      {a}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="grid gap-0.5">
            <span className="text-slate-400 text-sm">
              Temporada {torneioSelected.ano} - Edição {edicaoNumber}
            </span>
            <Link
              to="/torneios"
              className="text-orange-500 text-xs hover:underline justify-self-start"
            >
              🠔 Voltar para Torneios
            </Link>
          </div>
        </motion.div>

        <TorneioHallOfFame ano={torneioAno} geracao={geracao} />
        <div key={torneioAno} className="grid lg:grid-cols-[3fr_1fr] gap-4">
          <TorneioResultados torneio={torneioSelected} ano={torneioAno} />
          <RankingAnual ano={torneioAno} geracao={geracao} />
        </div>
        <TorneiosAnteriores ano={torneioAno} geracao={geracao} />
      </div>
    </section>
  );
};

export default TorneioGeracao;
