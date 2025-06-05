import { RankingPontuacao } from "../@types";

export const sortRanking = (ranking: RankingPontuacao[]) => {
  const rankingSorted = ranking.sort(
    ({ pontos: pontosA }, { pontos: pontosB }) => {
      return pontosB - pontosA;
    },
  );

  return rankingSorted;
};
