import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMatches } from "../api/apiTorneios";
import { Match } from "../@types";
import { updateMatchesMundial } from "../api/apiMundial";

export function useUpdateMatchesMundial(ano: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (matches: Match[]) => updateMatchesMundial(matches, ano),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mundiais"] });
    },
  });
}
