import { Match } from "../@types";

/**
 * Recebe os duelos iniciais de um lado (primeira rodada) e
 * devolve um array de rodadas (colunas) encadeadas até a Final.
 *
 * rounds[0]  ➜ primeira rodada do lado
 * rounds[1]  ➜ oitavas/quartas/…  (depende do tamanho)
 * …
 * rounds[n]  ➜ partida que dá acesso à Final
 */
export default function buildRounds(
  initialMatches: Match[],
  allMatches: Match[],
): Match[][] {
  const rounds: Match[][] = [];
  let current = initialMatches;

  while (current.length) {
    rounds.push(current);

    // ids das partidas da rodada seguinte
    const nextIds = [
      ...new Set(
        current.map((m) => m.proxima_partida_id).filter(Boolean), // remove null / undefined
      ),
    ];

    const nextMatches = allMatches.filter((m) => nextIds.includes(m.id));
    current = nextMatches;
  }

  return rounds;
}

/**
 * Recebe os duelos iniciais de um lado (primeira rodada) e
 * devolve um array de rodadas (colunas) encadeadas até a semifinal (exclui final e 3º lugar).
 *
 * rounds[0] ➜ primeira rodada do lado
 * rounds[n] ➜ última rodada antes da final
 */
// export default function buildRounds(
//   initialMatches: Match[],
//   allMatches: Match[],
// ): Match[][] {
//   const rounds: Match[][] = [];
//   let current = initialMatches;

//   while (current.length) {
//     rounds.push(current);

//     const nextIds = [
//       ...new Set(current.map((m) => m.proxima_partida_id).filter(Boolean)),
//     ];

//     const nextMatches = allMatches.filter((m) => nextIds.includes(m.id));
//     current = nextMatches;
//   }

//   // Remove a última rodada (Final e/ou Disputa de 3º)
//   const roundsWithoutFinal = rounds.slice(0, -1);

//   // Se desejar também garantir que a disputa de 3º não esteja perdida em alguma rodada anterior:
//   const cleanRounds = roundsWithoutFinal.map((rodada) =>
//     rodada.filter(
//       (match) =>
//         !match.rodada?.toLowerCase().includes("3º") &&
//         !match.rodada?.toLowerCase().includes("terceiro"),
//     ),
//   );

//   return cleanRounds;
// }
