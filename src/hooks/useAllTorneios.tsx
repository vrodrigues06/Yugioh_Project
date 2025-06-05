import { useQuery } from "@tanstack/react-query";
import { Torneio } from "../@types";
import { getAllTorneios } from "../api/apiTorneios";

export const useAllTorneios = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Torneio[]>({
    queryKey: ["AllTorneios"],
    queryFn: async () => {
      const torneios = await getAllTorneios();
      return torneios ?? []; // Evita retorno de null
    },
    staleTime: 1000 * 60 * 60,
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
