import React from "react";
import { useRankingStore } from "../../store/useRankingStore";
import Perfil from "../../components/Perfil";
import useAllPersonagens from "../../hooks/useAllPersonagens";
import { motion } from "framer-motion";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

interface ITorneiosRankingOverview {
  geracao: string;
}

const TorneiosRankingOverview = ({ geracao }: ITorneiosRankingOverview) => {
  const {
    data: personagens,
    error: errorPersonagem,
    isLoading: isLoadingPersonagem,
  } = useAllPersonagens();
  const {
    rankings,
    fetchRanking,
    error: errorRanking,
    isLoading: isLoadingRanking,
  } = useRankingStore();

  React.useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  const personagensMap = React.useMemo(() => {
    return personagens?.reduce((acc, personagem) => {
      acc[personagem.nome] = personagem;
      return acc;
    }, {} as Record<string, (typeof personagens)[0]>);
  }, [personagens]);

  const rankingsFilted = React.useMemo(() => {
    const rankingsAll = Object.entries(rankings)
      .filter(
        (objArr) => objArr[0] !== "torneio_mundial" && Array.isArray(objArr[1]),
      )
      .map((objArr) => objArr[1])
      .flat();

    const filtered =
      geracao === "Todos"
        ? rankingsAll
        : rankings[`torneio_${geracao.toLowerCase()}`] || [];

    return filtered.sort((a, b) => b.pontos - a.pontos);
  }, [geracao, rankings]);

  if (!personagens?.length) return null;

  const error = errorPersonagem || errorRanking;
  const loading = isLoadingPersonagem || isLoadingRanking;

  if (error) return <Error message={error} />;

  if (loading) return <Loading />;

  return (
    <div className="bg-azul-950  pt-2 px-4 sm:pt-4 rounded-md border border-blue-950">
      <h3 className="text-md sm:text-lg font-bold mb-4">Ranking da Geração</h3>
      {!rankingsFilted.length && (
        <div className="p-2 bg-azul-800 rounded-md text-slate-400 mb-6">
          Ainda não há ranking para está geração.
        </div>
      )}
      {rankingsFilted.map((ranking, index) => {
        const personagem = personagensMap[ranking.nome];
        if (index > 7 || personagem === undefined) return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={ranking.nome}
            className="bg-azul-800 p-2 flex justify-between items-center mb-2 sm:mb-3 rounded-md"
          >
            <div className="flex gap-2 items-center text-sm sm:text-md">
              <span>{index + 1}</span>
              <Perfil size="10" personagem={personagem} />
              <span>{ranking.nome}</span>
            </div>

            <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent text-sm sm:text-md">
              {ranking.pontos}Pts
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TorneiosRankingOverview;
