import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Podium } from "../@types";
import { updatePodiumAndStatus } from "../api/apiTorneios";
import { updatePodiumAndStatusMundial } from "../api/apiMundial";

type FinalizarTorneioParams = {
  podium: Podium[];
  ano: number;
};

export function useFinalizarTorneioMundial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ podium, ano }: FinalizarTorneioParams) =>
      updatePodiumAndStatusMundial(podium, ano),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mundiais"],
      });
      console.log("Torneio finalizado e pódio atualizado com sucesso.");
    },

    onError: (error) => {
      console.error("Erro ao finalizar o torneio:", error);
    },
  });

  return mutation;
}
