import React from "react";
import useAllPersonagens from "../../hooks/useAllPersonagens";
import { useRankingStore } from "../../store/useRankingStore";
import { sortRanking } from "../../utils/sortRanking";
import { findRankingIndex, setMelhoresColocacoes } from "../../utils/global";

export const usePersonagemCardModel = () => {
  const { data: personagens, error, isLoading } = useAllPersonagens();
  const {
    rankings,
    fetchRanking,
    isLoading: isLoadingRanking,
    error: errorRanking,
  } = useRankingStore();

  React.useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  if (!personagens) return {};

  const randomIndex = Math.floor(Math.random() * personagens.length);
  const randomPersonagem = personagens[randomIndex];
  // const randomPersonagem = personagens.find((p) => p.nome === "Zane Truesdale");

  if (!randomPersonagem) return {};

  if (rankings && Object.keys(rankings).length > 0) {
    const key = `torneio_${randomPersonagem?.geracao}`;

    if (rankings[key] && rankings[key].length > 0) {
      rankings[key] = sortRanking(rankings[key]);
    }
  }

  const rankingMundial = findRankingIndex(
    randomPersonagem.nome,
    randomPersonagem.geracao,
    rankings,
    true,
  );
  const rankingNacional = findRankingIndex(
    randomPersonagem.nome,
    randomPersonagem.geracao,
    rankings,
  );

  const colocacoesAnteriores = randomPersonagem?.colocacoes
    .sort((a, b) => {
      return b.ano - a.ano;
    })
    .slice(0, 3);

  const melhoresColocacoes = setMelhoresColocacoes(randomPersonagem);

  const melhoresColocacoesMundial = setMelhoresColocacoes(
    randomPersonagem,
    true,
  );

  return {
    randomPersonagem,
    colocacoesAnteriores,
    melhoresColocacoes,
    melhoresColocacoesMundial,
    rankingMundial,
    rankingNacional,
    error,
    isLoading,
    errorRanking,
    isLoadingRanking,
  };
};
