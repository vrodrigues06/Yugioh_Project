const sistema_pontuacao = {
  "primeira fase": 0,
  "32 avos": 1,
  "16 avos": 2,
  oitavas: 3,
  quartas: 5,
  quarto: 10,
  terceiro: 14,
  segundo: 25,
  campeao: 50,
};

export default function setPontos(rodada: string): number {
  const pontos =
    sistema_pontuacao[rodada.toLowerCase() as keyof typeof sistema_pontuacao];

  if (pontos === undefined) {
    throw new Error("Classificação inválida");
  }

  return pontos;
}
