import { useQuery } from "@tanstack/react-query";
import { getRankingGlobal } from "../api/apiRanking";
import { RankingData } from "../@types";

export default function useAllRankings() {
  const {
    data = {} as RankingData,
    error,
    isLoading,
  } = useQuery<RankingData>({
    queryKey: ["rankings"],
    queryFn: async () => {
      const rankings = await getRankingGlobal();
      return rankings ?? ({} as RankingData); // Evita retornar null
    },
    retry: 2, // Tenta 2 vezes em caso de erro
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar rankings: ${error.message}`
      : "Erro desconhecido ao carregar rankings."
    : null;

  return {
    data,
    error: errorMessage,
    isLoading,
  };
}
