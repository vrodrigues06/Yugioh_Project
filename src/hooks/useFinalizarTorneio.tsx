import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Podium } from "../@types";
import { updatePodiumAndStatus } from "../api/apiTorneios";

type FinalizarTorneioParams = {
  podium: Podium[];
  geracao: string;
  ano: number;
};

export function useFinalizarTorneio() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ podium, geracao, ano }: FinalizarTorneioParams) =>
      updatePodiumAndStatus(podium, geracao, ano),

    onSuccess: (_, variables) => {
      const { geracao, ano } = variables;
      queryClient.invalidateQueries({
        queryKey: ["torneio", geracao, ano],
      });
      console.log("Torneio finalizado e pódio atualizado com sucesso.");
    },

    onError: (error) => {
      console.error("Erro ao finalizar o torneio:", error);
    },
  });

  return mutation;
}
