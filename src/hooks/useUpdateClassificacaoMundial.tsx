import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Classificacao } from "../@types";
import { updateClassificacaoMundial } from "../api/apiMundial";

export function useUpdateClassificacaoMundial(ano: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (classificacao: Classificacao[]) =>
      updateClassificacaoMundial(classificacao, ano),

    onSuccess: () => {
      // 🔥 Invalida a query do torneio específico
      queryClient.invalidateQueries({
        queryKey: ["mundiais"],
      });
    },

    onError: (error) => {
      console.error("Erro ao atualizar a classificação:", error);
    },
  });

  return mutation;
}
