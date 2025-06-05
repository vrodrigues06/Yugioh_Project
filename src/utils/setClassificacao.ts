const sistema_pontuacao = {
  "primeira fase": "Pf",
  "32 avos": "32 Avos",
  "16 avos": "16 Avos",
  oitavas: "Oitavas",
  quartas: "Quartas",
  quarto: "Quarto",
  terceiro: "Terceiro",
  segundo: "Segundo",
  campeao: "Campeao",
};

export default function setClassificacao(rodada: string) {
  const classificacao =
    sistema_pontuacao[rodada.toLowerCase() as keyof typeof sistema_pontuacao];

  if (classificacao === undefined) {
    throw new Error("Classificação inválida");
  }

  return classificacao;
}
