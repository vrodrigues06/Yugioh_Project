import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FaCrown } from "react-icons/fa";
import { FaMedal } from "react-icons/fa6";
import useRankingByYear from "../../hooks/useRankingByYear";

interface IRankingAnual {
  ano: number;
  geracao: string;
}

const RankingAnual = ({ ano, geracao }: IRankingAnual) => {
  const { data: ranking, error, isLoading } = useRankingByYear(ano, geracao);

  if (!ranking) return;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-azul-950 rounded-md p-4 shadow text-white"
    >
      <h3 className="font-bold mb-4">Ranking {ano}</h3>
      <ul className="rounded-md divide-y divide-sky-800/50 grid gap-1.5">
        {ranking.ranking.map((rankItem, index) => {
          let emoji: ReactNode = <span></span>;

          if (index === 0) emoji = <FaCrown className="text-yellow-400" />;
          if (index === 1) emoji = <FaMedal className="text-sky-300 shadow" />;
          if (index === 2) emoji = <FaMedal className="text-amber-800" />;
          if (index > 2) emoji = "";
          return (
            <li
              key={rankItem.nome}
              className="flex justify-between items-center p-1 text-sm"
            >
              <div className="flex">
                <span className="text-slate-400 mr-2">{index + 1}°</span>
                <span className="flex items-center gap-1.5">
                  {rankItem.nome} {emoji}
                </span>
              </div>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-sky-400 to-sky-100">
                {rankItem.pontos}p
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default RankingAnual;
