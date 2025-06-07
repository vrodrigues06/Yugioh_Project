import { useQuery } from "@tanstack/react-query";
import { Personagem } from "../@types/personagem";
import { getPersonagens } from "../api/apiPersonagens";

const usePersonagens = (geracao: string) => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Personagem[]>({
    queryKey: ["personagens", geracao],
    queryFn: async ({ queryKey }) => {
      const personagens = await getPersonagens(queryKey[1] as string);
      return personagens ?? [];
    },
    enabled: !!geracao, // Evita chamadas desnecessárias se 'geracao' for undefined/null
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar personagens: ${error.message}`
      : "Erro desconhecido ao carregar personagens."
    : null;

  return { data, error: errorMessage, isLoading };
};

export default usePersonagens;
