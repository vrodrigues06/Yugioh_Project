import { useMutation } from "@tanstack/react-query";
import { createRanking } from "../api/apiRanking";
import { Ranking } from "../@types";

export default function useCreateRanking() {
  const { isPending: isCreating, mutateAsync } = useMutation({
    mutationFn: createRanking,
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      console.error(`Não foi possível criar o Ranking: ${errorMessage}`);
    },
  });

  const handleCreateRanking = async (rankingData: Ranking) => {
    if (isCreating) {
      return; // Impede chamadas múltiplas enquanto está criando
    }

    try {
      await mutateAsync(rankingData);
    } catch (error) {
      console.error("Erro ao criar ranking:", error);
    }
  };

  return { mutate: handleCreateRanking, isCreating };
}
