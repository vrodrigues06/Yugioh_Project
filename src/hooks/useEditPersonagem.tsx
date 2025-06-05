import { useMutation } from "@tanstack/react-query";
import { updatePersonagem } from "../api/apiPersonagens";
import toast from "react-hot-toast";
import { Personagem } from "../@types/personagem";
import { FieldValues } from "react-hook-form";

export default function useEditPersonagem() {
  const { isPending: isEditing, mutate } = useMutation<
    Personagem | undefined,
    Error,
    { id: number; personagem: Personagem | FieldValues }
  >({
    mutationFn: ({ id, personagem }) => updatePersonagem(id, personagem),
    onSuccess: () => {
      toast.success("Personagem atualizado com sucesso");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Não foi possível atualizar o Personagem: ${errorMessage}`);
    },
  });

  return { mutate, isEditing };
}
