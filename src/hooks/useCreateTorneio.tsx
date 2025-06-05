import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTorneio } from "../api/apiTorneios";
import toast from "react-hot-toast";
import { TorneioInput } from "../@types/torneio";
import { FieldValues } from "react-hook-form";

const useCreateTorneio = () => {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createTorneio,
    onSuccess: () => {
      toast.success("Torneio Criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["AllTorneios"] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível criar o Torneio: ${errorMessage}`);
    },
  });

  return { mutate, isCreating };
};

export default useCreateTorneio;
