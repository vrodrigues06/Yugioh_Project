import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPersonagem } from "../api/apiPersonagens";
import toast from "react-hot-toast";
import { Personagem } from "../@types/personagem"; // Corrigido para usar Personagem
import { FieldValues } from "react-hook-form";

export default function useCreatePersonagem() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate } = useMutation<
    Personagem | undefined,
    Error,
    Personagem | FieldValues
  >({
    mutationFn: createPersonagem,
    onSuccess: () => {
      toast.success("Personagem Criado com sucesso");

      // Invalida a query para que ela seja refeita
      queryClient.invalidateQueries({ queryKey: ["allPersonagens"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível criar o Personagem: ${errorMessage}`);
    },
  });

  return { mutate, isCreating };
}
