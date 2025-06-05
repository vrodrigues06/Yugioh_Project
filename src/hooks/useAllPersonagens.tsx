import { useQuery } from "@tanstack/react-query";
import { Personagem } from "../@types/personagem";
import { getAllPersonagens } from "../api/apiPersonagens";

const useAllPersonagens = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Personagem[]>({
    queryKey: ["allPersonagens"],
    queryFn: async () => {
      const personagens = await getAllPersonagens();
      return personagens ?? [];
    },
    retry: 2,
    staleTime: 1000 * 60 * 60,
  });

  // Mensagem de erro mais descritiva
  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar personagens: ${error.message}`
      : "Erro desconhecido ao carregar personagens."
    : null;

  return {
    data,
    error: errorMessage,
    isLoading,
  };
};

export default useAllPersonagens;
