import React from "react";
import { motion } from "framer-motion";
import MatchBracket from "./MatchBracket";
import buildRounds from "../../utils/buildRounds";
import MatchTerceiro from "./MatchTerceiro";
import useDragTranslate from "../../hooks/useDragTranslate";
import MatchPreliminar from "./MatchPreliminar";
import MatchPreliminarDupla from "./MatchPreliminarDupla";
import { Link, useParams } from "react-router";
import { useTorneioByYear } from "../../hooks/useTorneioByYear";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useAllTorneios } from "../../hooks/useAllTorneios";
import Identificador from "./Identificador";

export default function Torneio() {
  const { ref, events, isDragging } = useDragTranslate();
  const { data: allTorneios } = useAllTorneios();

  const { torneio: torneioParam } = useParams();

  const [geracaoRaw = "", anoRaw = ""] = (torneioParam || "").split(" ");
  const geracao = geracaoRaw.toLowerCase();
  const ano = anoRaw;

  const torneiosByGen = React.useMemo(() => {
    return allTorneios.filter((torneio) => torneio.geracao === geracao);
  }, [allTorneios, geracao]);

  const edicaoNumber = React.useMemo(() => {
    return torneiosByGen.length;
  }, [torneiosByGen]);

  const {
    data: torneio,
    isLoading,
    error,
  } = useTorneioByYear(geracao, Number(ano));

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!torneio)
    return (
      <div className="container py-6 text-white text-2xl">
        Nenhum torneio encontrado.
      </div>
    );

  const { matches: brackets, nome } = torneio;

  // 1️⃣ pega a rodada “mais antiga” (= onde está o id 1)
  const { rodada: rodadaInicial } = brackets.find((b) => b.id === 1)!;
  const fasePrincipal = brackets.filter((b) => b.rodada === rodadaInicial);

  const preliminares = brackets.filter((b) => b.rodada === "Primeira Fase");

  const metadeEsquerda = fasePrincipal.slice(0, fasePrincipal.length);

  const rounds = buildRounds(metadeEsquerda, brackets);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...events}
      className={`overflow-x-hidden  mt-16 py-12 border-t border-slate-700 cursor-${
        isDragging ? "grabbing" : "grab"
      }`}
    >
      <Link
        to={"/torneios/painel-torneio"}
        className="text-orange-500 text-xs hover:underline justify-self-start mb-4 block p-2"
      >
        🠔 Voltar para o Painel de Torneios
      </Link>
      <div className="flex flex-col items-center bg-azul-800 p-4 rounded-md overflow-hidden">
        <div className="grid justify-center">
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold ">
            {nome}
          </h1>
          <span className="text-slate-400 opacity-70 text-sm text-center">
            Edição #{edicaoNumber}
          </span>
        </div>

        <div className="flex gap-14  ml-6" ref={ref}>
          {rounds.map((round, roundIdx) => (
            <div key={roundIdx} className="grid gap-4 relative">
              <Identificador roundIdx={roundIdx} totalRounds={rounds.length} />
              {round.map((duelo, idx) => {
                const isFinal = roundIdx === rounds.length - 1;

                const matchTerceiro = brackets.find(
                  (partida) => partida.rodada === "Disputa 3º Lugar",
                );

                if (isFinal) {
                  if (!matchTerceiro) return;

                  return (
                    <React.Fragment key={duelo.id}>
                      <MatchBracket
                        duelista1={duelo.duelista1}
                        duelista2={duelo.duelista2}
                        match={duelo}
                        index={idx}
                        roundIdx={roundIdx}
                        isFinal={isFinal}
                        torneio={torneio}
                      />

                      <MatchTerceiro
                        duelista1={matchTerceiro.duelista1}
                        duelista2={matchTerceiro.duelista2}
                        match={matchTerceiro}
                        index={idx}
                        roundIdx={roundIdx}
                        isFinal={isFinal}
                        torneio={torneio}
                      />
                    </React.Fragment>
                  );
                }

                // Se a Preliminar tem dois Duelistas

                if (
                  duelo.origemDuelista2?.startsWith("Preliminar") &&
                  duelo.origemDuelista1?.startsWith("Preliminar")
                ) {
                  const duelosPreliminares = preliminares.filter(
                    (p) => p.proxima_partida_id === duelo.id,
                  );

                  if (!duelosPreliminares.length) return;

                  return (
                    <div className="relative" key={idx}>
                      <MatchPreliminarDupla
                        roundIdx={roundIdx}
                        matchs={duelosPreliminares}
                        torneio={torneio}
                      />

                      <MatchBracket
                        duelista1={duelo.duelista1}
                        duelista2={duelo.duelista2}
                        match={duelo}
                        index={idx}
                        roundIdx={roundIdx}
                        torneio={torneio}
                        isFinal={isFinal}
                      />
                    </div>
                  );
                }

                // Se a Preliminar tem apenas um Duelista

                if (duelo.origemDuelista2?.startsWith("Preliminar")) {
                  const dueloPreliminar = preliminares.find(
                    (p) => p.proxima_partida_id === duelo.id,
                  );

                  if (!dueloPreliminar) return;

                  return (
                    <div className="relative" key={dueloPreliminar.id}>
                      <MatchPreliminar
                        key={dueloPreliminar.id}
                        duelista1={dueloPreliminar.duelista1}
                        duelista2={dueloPreliminar.duelista2}
                        match={dueloPreliminar}
                        index={idx}
                        roundIdx={roundIdx}
                        torneio={torneio}
                      />

                      <MatchBracket
                        key={duelo.id}
                        duelista1={duelo.duelista1}
                        duelista2={duelo.duelista2}
                        match={duelo}
                        index={idx}
                        roundIdx={roundIdx}
                        isFinal={isFinal}
                        torneio={torneio}
                      />
                    </div>
                  );
                }

                return (
                  <MatchBracket
                    key={duelo.id}
                    duelista1={duelo.duelista1}
                    duelista2={duelo.duelista2}
                    match={duelo}
                    index={idx}
                    roundIdx={roundIdx}
                    isFinal={isFinal}
                    torneio={torneio}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
