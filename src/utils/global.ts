import { Geracao, RankingData } from "../@types";
import { Colocacao, Personagem } from "../@types/personagem";

export const geracoes: Geracao[] = [
  "dm",
  "gx",
  "5ds",
  "zexal",
  "arc-v",
  "vrains",
];

export const setMelhoresColocacoes = (
  personagem: Personagem,
  mundial = false,
) => {
  if (!personagem) {
    console.error("Argumento não é do tipo Personagem!");
    return [];
  }

  const colocacoes = mundial
    ? personagem.colocacoes_mundial
    : personagem.colocacoes;

  return (
    colocacoes
      ?.filter(({ classificacao }) =>
        ["Campeao", "Segundo", "Terceiro", "Quarto"].includes(classificacao),
      )
      .sort((a, b) => b.ano - a.ano) || []
  );
};

export const findRankingIndex = (
  n: string,
  geracao: string,
  rankings: RankingData,
  mundial = false,
) => {
  if (!rankings) return null;

  const ranking = mundial
    ? rankings.torneio_mundial
    : rankings[`torneio_${geracao}`];

  if (!ranking || !Array.isArray(ranking)) return null;

  return (
    ranking
      .sort((a, b) => b.pontos - a.pontos)
      .findIndex(({ nome }) => {
        return nome === n;
      }) + 1
  );
};

export const calcularColocacoes = (colocacoes: Colocacao[] | undefined) => {
  if (!colocacoes)
    return {
      titulos: 0,
      vices: 0,
      terceiro: 0,
      quarto: 0,
      vezesFinal: 0,
      vezesPodium: 0,
    };

  return colocacoes.reduce(
    (acc, c) => {
      switch (c.classificacao) {
        case "Campeao":
          acc.titulos += 1;
          break;
        case "Segundo":
          acc.vices += 1;
          break;
        case "Terceiro":
          acc.terceiro += 1;
          break;
        case "Quarto":
          acc.quarto += 1;
          break;
      }
      acc.vezesFinal = acc.titulos + acc.vices;
      acc.vezesPodium = acc.vezesFinal + acc.terceiro + acc.quarto;
      return acc;
    },
    {
      titulos: 0,
      vices: 0,
      terceiro: 0,
      quarto: 0,
      vezesFinal: 0,
      vezesPodium: 0,
    },
  );
};

// Geracao de chaves torneio

export function embaralharArray(array: string[]): string[] {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
