import { Match } from "../@types";

export const getPerdedor = (match: Match): string | null => {
  if (!match.vencedor) return null;

  const { duelista1, duelista2, vencedor } = match;

  if (duelista1 === vencedor) return duelista2;
  if (duelista2 === vencedor) return duelista1;

  // Caso os dados estejam inconsistentes (nenhum dos dois é igual ao vencedor)
  return null;
};
