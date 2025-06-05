import { useQuery } from "@tanstack/react-query";
import { getPersonagemByName } from "../api/apiPersonagens";

export function usePersonagemByName(nome: string) {
  return useQuery({
    queryKey: ["personagem", nome],
    queryFn: () => {
      if (!nome) return Promise.resolve(null);
      return getPersonagemByName(nome);
    },
    enabled: !!nome, // Só executa se o nome existir
    staleTime: 1000 * 60 * 5, // Dados ficam frescos por 5 minutos
    retry: 2, // Tenta no máximo 2 vezes em caso de erro
  });
}
