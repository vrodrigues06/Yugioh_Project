import { Classificacao } from "../@types";

export default function setPodium(classificacao: Classificacao[]) {
  const podiumValues = ["Campeao", "Segundo", "Terceiro", "Quarto"];

  return classificacao
    .filter((obj) => podiumValues.includes(obj.classificacao)) // Filtra apenas os que estão no pódio
    .map(({ nome, classificacao }) => ({ nome, classificacao })); // Retorna apenas { nome, classificacao }
}
