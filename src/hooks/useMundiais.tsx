import { useQuery } from "@tanstack/react-query";
import { Mundial } from "../@types";
import { getMundial } from "../api/apiMundial";

export const useMundiais = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Mundial[]>({
    queryKey: ["mundiais"],
    queryFn: async () => {
      const torneios = await getMundial();
      return torneios ?? []; // Evita retorno de null
    },
    retry: 2, // Tenta novamente até 2 vezes em caso de erro
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar torneios: ${error.message}`
      : "Erro desconhecido ao carregar torneios."
    : null;

  return {
    data,
    error: errorMessage,
    isLoading,
  };
};
