// import { Match } from "../@types";

// export function unificarChaves(
//   partidasPreliminares: Match[],
//   partidasFasePrincipal: Match[],
//   potenciaDe2: number,
// ): Match[] {
//   const todasPartidas = [...partidasPreliminares, ...partidasFasePrincipal];

//   // Ordenar primeiro por rodada: preliminar vem primeiro, depois 16avos, Oitavas, Quartas, Semifinal, Final, 3º lugar
//   const ordemRodadas = [
//     "Primeira Fase",
//     "32 avos",
//     "16 avos",
//     "Oitavas",
//     "Quartas",
//     "Semifinal",
//     "Final",
//     "Disputa 3º Lugar",
//   ];

//   const totalRodadas = Math.log2(potenciaDe2);

//   const primeiraRodadaIndex = ordemRodadas.length - totalRodadas - 1;

//   const primeiraRodada = ordemRodadas[primeiraRodadaIndex];

//   todasPartidas.sort((a, b) => {
//     const rodadaA = ordemRodadas.indexOf(a.rodada);
//     const rodadaB = ordemRodadas.indexOf(b.rodada);
//     if (rodadaA !== rodadaB) {
//       return rodadaA - rodadaB;
//     }
//     return a.id - b.id; // Se mesma rodada, ordenar por ID
//   });

//   // Atribuir numero_partida global crescente
//   todasPartidas.forEach((partida, index) => {
//     partida.numero_partida = index + 1;
//   });

//   // 🔗 Definir origem dos duelistas para rodadas que não sejam a primeira
//   ordemRodadas.forEach((rodada) => {
//     if (rodada === "Primeira Fase" || rodada === primeiraRodada) return;

//     const partidasDaRodada = todasPartidas.filter((p) => p.rodada === rodada);
//     const partidasRodadaAnteriorIndex = ordemRodadas.indexOf(rodada) - 1;
//     const rodadaAnterior = ordemRodadas[partidasRodadaAnteriorIndex];
//     const partidasRodadaAnterior = todasPartidas.filter(
//       (p) => p.rodada === rodadaAnterior,
//     );

//     partidasDaRodada.forEach((partida, index) => {
//       const origem1 = partidasRodadaAnterior[index * 2];
//       const origem2 = partidasRodadaAnterior[index * 2 + 1];

//       if (origem1) {
//         partida.origemDuelista1 = `Vencedor da Partida ${origem1.numero_partida}`;
//       }
//       if (origem2) {
//         partida.origemDuelista2 = `Vencedor da Partida ${origem2.numero_partida}`;
//       }
//     });
//   });

//   return todasPartidas;
// }

import { Match } from "../@types";

export function unificarChaves(
  partidasPreliminares: Match[],
  partidasFasePrincipal: Match[],
  potenciaDe2: number,
): Match[] {
  const todasPartidas = [...partidasPreliminares, ...partidasFasePrincipal];

  const ordemRodadas = [
    "Primeira Fase",
    "32 avos",
    "16 avos",
    "Oitavas",
    "Quartas",
    "Semifinal",
    "Final",
    "Disputa 3º Lugar",
  ];

  const totalRodadas = Math.log2(potenciaDe2);
  const primeiraRodadaIndex = ordemRodadas.length - totalRodadas - 1;
  const primeiraRodada = ordemRodadas[primeiraRodadaIndex];

  // Ordenar partidas primeiro pela rodada e depois pelo ID
  todasPartidas.sort((a, b) => {
    const rodadaA = ordemRodadas.indexOf(a.rodada);
    const rodadaB = ordemRodadas.indexOf(b.rodada);
    if (rodadaA !== rodadaB) {
      return rodadaA - rodadaB;
    }
    return a.id - b.id;
  });

  // Atribuir numero_partida global crescente
  todasPartidas.forEach((partida, index) => {
    partida.numero_partida = index + 1;
  });

  // 🔗 Definir origem dos duelistas
  ordemRodadas.forEach((rodada) => {
    if (rodada === "Primeira Fase" || rodada === primeiraRodada) return;

    if (rodada === "Disputa 3º Lugar") {
      // 🚨 EXCEÇÃO: Pegamos os PERDEDORES da semifinal
      const semis = todasPartidas.filter((p) => p.rodada === "Semifinal");
      const terceira = todasPartidas.find(
        (p) => p.rodada === "Disputa 3º Lugar",
      );
      if (semis.length === 2 && terceira) {
        terceira.origemDuelista1 = `Perdedor da Partida ${semis[0].numero_partida}`;
        terceira.origemDuelista2 = `Perdedor da Partida ${semis[1].numero_partida}`;
      }
      return;
    }

    const partidasDaRodada = todasPartidas.filter((p) => p.rodada === rodada);
    const partidasRodadaAnteriorIndex = ordemRodadas.indexOf(rodada) - 1;
    const rodadaAnterior = ordemRodadas[partidasRodadaAnteriorIndex];
    const partidasRodadaAnterior = todasPartidas.filter(
      (p) => p.rodada === rodadaAnterior,
    );

    partidasDaRodada.forEach((partida, index) => {
      const origem1 = partidasRodadaAnterior[index * 2];
      const origem2 = partidasRodadaAnterior[index * 2 + 1];

      if (origem1) {
        partida.origemDuelista1 = `Vencedor da Partida ${origem1.numero_partida}`;
      }
      if (origem2) {
        partida.origemDuelista2 = `Vencedor da Partida ${origem2.numero_partida}`;
      }
    });
  });

  return todasPartidas;
}
