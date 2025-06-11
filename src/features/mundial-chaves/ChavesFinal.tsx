import React from "react";
import Identificador from "../torneios-chaves/Identificador";
import MatchBracketMundial from "./MatchBracketMundial";
import MatchTerceiroMundial from "./MatchTerceiroMundial";
import useDragTranslate from "../../hooks/useDragTranslate";
import { useMundiais } from "../../hooks/useMundiais";
import Loading from "../../components/Loading";
import buildRounds from "../../utils/buildRounds";
import { Mundial, Torneio } from "../../@types";
import { motion } from "framer-motion";

type ChavesFinalProps = {
  torneio: Mundial | Torneio;
};

const ChavesFinal = ({ torneio }: ChavesFinalProps) => {
  const { ref, events, isDragging } = useDragTranslate();

  if (!torneio)
    return (
      <div className="container py-6 text-white text-2xl">
        Nenhum torneio encontrado.
      </div>
    );

  const { matches: brackets } = torneio;

  if (!brackets || !Array.isArray(brackets) || brackets.length === 0)
    return (
      <div className="container py-6 text-white text-2xl">
        Nenhuma chave encontrada para este torneio.
      </div>
    );

  // 🛡 Evita uso do operador "!" com fallback seguro
  const rodadaInicialMatch = brackets.find((b) => b.id === 1);

  if (!rodadaInicialMatch || !rodadaInicialMatch.rodada) {
    return (
      <div className="container py-6 text-white text-2xl">
        Dados da rodada inicial inválidos.
      </div>
    );
  }

  // 1️⃣ pega a rodada “mais antiga” (= onde está o id 1)
  const { rodada: rodadaInicial } = brackets.find((b) => b.id === 1)!;
  const fasePrincipal = brackets.filter((b) => b.rodada === rodadaInicial);

  const metadeEsquerda = fasePrincipal.slice(0, fasePrincipal.length);

  const rounds = buildRounds(metadeEsquerda, brackets);

  return (
    <div
      {...events}
      className={`flex flex-col items-center  p-4 rounded-md  overflow-hidden  cursor-${
        isDragging ? "grabbing" : "grab"
      }`}
    >
      <div className="flex gap-14  ml-6 scale-[0.90]" ref={ref}>
        {rounds.map((round, roundIdx) => (
          <motion.div
            key={roundIdx}
            className="grid gap-4 relative"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
              delay: roundIdx * 0.15,
            }}
          >
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
                    <MatchBracketMundial
                      duelista1={duelo.duelista1}
                      duelista2={duelo.duelista2}
                      match={duelo}
                      index={idx}
                      roundIdx={roundIdx}
                      isFinal={isFinal}
                      torneio={torneio}
                    />

                    <MatchTerceiroMundial
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

              return (
                <MatchBracketMundial
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChavesFinal;
