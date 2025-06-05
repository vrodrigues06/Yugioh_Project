import React from "react";
import { Mundial, Torneio } from "../../@types";
import { motion } from "framer-motion";
import OutrasColocacoesItem from "./OutrasColocacoesItem";

const OutrasColocacoes = <T extends Torneio | Mundial>({
  torneio,
}: {
  torneio: T;
}) => {
  const [colocacoes, setColocacoes] = React.useState<string | null>(null);
  const [ativo, setAtivo] = React.useState<string | null>(null);

  function handleChangeColocacoes({
    currentTarget,
  }:
    | React.MouseEvent<HTMLButtonElement>
    | React.TouchEvent<HTMLButtonElement>) {
    setAtivo(currentTarget.id);

    const fase = currentTarget.textContent;
    if (fase === "Primeira Fase") {
      setColocacoes("Pf");
    } else {
      setColocacoes(fase);
    }
  }

  const colocacoesFiltradas = torneio.classificacao.filter(
    (classificacao) => classificacao.classificacao === colocacoes,
  );

  function isTorneio(obj: unknown): obj is Torneio {
    if (typeof obj !== "object" || obj === null) {
      return false;
    } else return true;
  }

  return (
    <div className="mt-4 xs:mt-8 col-span-full">
      <div className="flex gap-2 mb-8">
        {["quartas", "oitavas", "primeira"].map((fase) => (
          <button
            key={fase}
            id={fase}
            onClick={handleChangeColocacoes}
            onTouchStart={handleChangeColocacoes}
            className={`cursor-pointer px-1.5 py-1 xs:px-3 xs:py-1.5 text-xs xs:text-sm rounded-sm transition-colors ${
              ativo === fase
                ? "bg-orange-500 text-white "
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {fase === "quartas"
              ? "Quartas"
              : fase === "oitavas"
              ? "Oitavas"
              : "Primeira Fase"}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {colocacoesFiltradas.length ? (
          colocacoesFiltradas.map((colocacao, index) => (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              key={colocacao.nome}
            >
              <OutrasColocacoesItem
                colocacao={colocacao}
                ano={torneio.ano}
                geracao={isTorneio(torneio) ? torneio.geracao : "mundial"}
              />
            </motion.div>
          ))
        ) : (
          <span className="text-slate-400">Selecione outra fase.</span>
        )}
      </div>
    </div>
  );
};

export default OutrasColocacoes;
