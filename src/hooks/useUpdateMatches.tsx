import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMatches } from "../api/apiTorneios";
import { Match } from "../@types";

export function useUpdateMatches(geracao: string, ano: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (matches: Match[]) => updateMatches(matches, geracao, ano),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["torneio", geracao, ano] });
    },
  });
}
