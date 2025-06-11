import React from "react";
import { useTorneioStore } from "../../store/useTorneiosStore";
import { setEmoji } from "../../utils/setEmoji";
import { motion } from "framer-motion";

interface ITorneioHallOfFame {
  ano: number;
  geracao: string;
}

const TorneioHallOfFame = ({ ano, geracao }: ITorneioHallOfFame) => {
  const { torneiosStore, fetchAllTorneios } = useTorneioStore();

  React.useEffect(() => {
    if (torneiosStore.length === 0) {
      fetchAllTorneios();
    }
  }, [fetchAllTorneios, torneiosStore.length]);

  if (!torneiosStore) return;

  const torneiosFiltedByGen = torneiosStore
    .filter((torneio) => torneio.geracao === geracao)
    .filter((torneio) => torneio.ano <= ano)
    .reverse();

  const campeoesLista = torneiosFiltedByGen.flatMap((t) =>
    t.podium.filter((p) => p.classificacao === "Campeao").map((p) => p.nome),
  );

  const campeoesComTitulos = campeoesLista.reduce((acc, nome) => {
    const existente = acc.find((item) => item.nome === nome);
    if (existente) {
      existente.titulos += 1;
    } else {
      acc.push({ nome, titulos: 1 });
    }
    return acc;
  }, [] as { nome: string; titulos: number }[]);

  const campeoesComTitulosSorted = campeoesComTitulos.sort(
    (a, b) => b.titulos - a.titulos,
  );

  if (!campeoesComTitulosSorted) return;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-azul-950 rounded-md p-4 shadow transition-colors border border-transparent hover:border-orange-500"
    >
      <h3 className="font-bold uppercase self-start relative text-white mb-4">
        <span className="w-8 h-px -bottom-0 absolute bg-gradient-to-b from-orange-800 to-orange-300 "></span>
        Hall Of Fame
      </h3>
      <ul className="divide-y divide-sky-300/10">
        {campeoesComTitulosSorted.map((c) => (
          <li key={c.nome} className="flex gap-1.5 py-1">
            <span className=" text-white">{c.nome}</span>
            <div className="flex gap-1 items-center">
              {Array.from({ length: c.titulos }, (_, index) => (
                <span key={index}> {setEmoji("Campeao")} </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TorneioHallOfFame;
