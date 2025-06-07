import React from "react";
import useAllPersonagens from "../../hooks/useAllPersonagens";
import { useRankingStore } from "../../store/useRankingStore";
import { sortRanking } from "../../utils/sortRanking";
import { findRankingIndex, setMelhoresColocacoes } from "../../utils/global";
import { useQuery } from "@tanstack/react-query";
import { getRandomPersonagem } from "../../api/apiPersonagens";

export const usePersonagemCardModel = () => {
  const {
    data: randomPersonagem,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["random-personagem"],
    queryFn: getRandomPersonagem,
    refetchOnWindowFocus: false, // <-- importante
    staleTime: 1000 * 60 * 5, // opcional: mantém dados "frescos" por 5 minutos
  });

  const {
    rankings,
    fetchRanking,
    isLoading: isLoadingRanking,
    error: errorRanking,
  } = useRankingStore();

  React.useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

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
