import { Match } from "../@types";
import { embaralharArray } from "./global";

export function gerarChavesPreliminares(
  jogadoresPreliminares: string[],
  partidasFasePrincipal: Match[],
  proximoIdInicial: number,
): { partidasPreliminares: Match[]; proximoId: number } {
  const primeiraRodadaLabel =
    partidasFasePrincipal.find((p) => p.rodada !== "Disputa 3º Lugar")
      ?.rodada ?? "16 avos";

  const vagas = partidasFasePrincipal.filter(
    (p) =>
      p.rodada === primeiraRodadaLabel &&
      (p.duelista1 === null || p.duelista2 === null),
  );

  // Contar exatamente quantos lados estão vazios
  const totalLadosVazios = vagas.reduce((acc, p) => {
    if (p.duelista1 === null) acc++;
    if (p.duelista2 === null) acc++;
    return acc;
  }, 0);

  if (totalLadosVazios !== jogadoresPreliminares.length / 2) {
    throw new Error(
      "Inconsistência: número de vagas na fase principal não bate com jogadores das preliminares.",
    );
  }

  const duelistas = embaralharArray(jogadoresPreliminares);
  const partidasPreliminares: Match[] = [];
  let proximoId = proximoIdInicial;
  let idxDuelista = 0;
  let numeroPreliminar = 1;

  vagas.forEach((partidaPrincipal) => {
    // Verificar duelista1
    if (partidaPrincipal.duelista1 === null) {
      const duelistaA = duelistas[idxDuelista++];
      const duelistaB = duelistas[idxDuelista++];

      const partidaPreliminar: Match = {
        id: proximoId++,
        rodada: "Primeira Fase",
        numero_partida: numeroPreliminar,
        duelista1: duelistaA,
        duelista2: duelistaB,
        vencedor: null,
        status: "pendente",
        proxima_partida_id: partidaPrincipal.id,
      };

      partidasPreliminares.push(partidaPreliminar);
      partidaPrincipal.origemDuelista1 = `Preliminar ${numeroPreliminar}`;
      numeroPreliminar++;
    }

    // Verificar duelista2
    if (partidaPrincipal.duelista2 === null) {
      const duelistaA = duelistas[idxDuelista++];
      const duelistaB = duelistas[idxDuelista++];

      const partidaPreliminar: Match = {
        id: proximoId++,
        rodada: "Primeira Fase",
        numero_partida: numeroPreliminar,
        duelista1: duelistaA,
        duelista2: duelistaB,
        vencedor: null,
        status: "pendente",
        proxima_partida_id: partidaPrincipal.id,
      };

      partidasPreliminares.push(partidaPreliminar);
      partidaPrincipal.origemDuelista2 = `Preliminar ${numeroPreliminar}`;
      numeroPreliminar++;
    }
  });

  return { partidasPreliminares, proximoId };
}

// export function gerarChavesPreliminares(
//   jogadores: string[],
//   proximoMatchId: number,
// ): {
//   partidasPreliminares: Match[];
//   conexoesParaFasePrincipal: {
//     placeholder: string;
//     preliminarId: number;
//   }[];
//   proximoId: number;
// } {
//   const partidasPreliminares: Match[] = [];
//   const conexoesParaFasePrincipal: {
//     placeholder: string;
//     preliminarId: number;
//   }[] = [];

//   const jogadoresEmbaralhados = embaralharArray(jogadores);

//   for (let i = 0; i < jogadoresEmbaralhados.length; i += 2) {
//     const numeroPartida = i / 2 + 1;
//     const placeholder = `Vencedor Preliminar ${numeroPartida}`;

//     const match: Match = {
//       id: proximoMatchId,
//       rodada: "Primeira Fase",
//       numero_partida: numeroPartida,
//       duelista1: jogadoresEmbaralhados[i],
//       duelista2: jogadoresEmbaralhados[i + 1] || null,
//       vencedor: null,
//       status: "pendente",
//       proxima_partida_id: null,
//     };

//     partidasPreliminares.push(match);

//     conexoesParaFasePrincipal.push({
//       placeholder,
//       preliminarId: match.id,
//     });

//     proximoMatchId++;
//   }

//   return {
//     partidasPreliminares,
//     conexoesParaFasePrincipal,
//     proximoId: proximoMatchId,
//   };
// }

// // export function preencherVencedoresDasPreliminares(
// //   partidas: Match[],
// //   resultadosPreliminares: { partidaId: number; vencedor: string }[],
// // ) {
// //   const mapaVencedores = new Map(
// //     resultadosPreliminares.map((r) => [
// //       `Vencedor Preliminar ${r.partidaId}`,
// //       r.vencedor,
// //     ]),
// //   );

// //   partidas.forEach((p) => {
// //     if (p.duelista1?.startsWith("Vencedor Preliminar")) {
// //       const vencedor = mapaVencedores.get(p.duelista1);
// //       if (vencedor) p.duelista1 = vencedor;
// //     }
// //     if (p.duelista2?.startsWith("Vencedor Preliminar")) {
// //       const vencedor = mapaVencedores.get(p.duelista2);
// //       if (vencedor) p.duelista2 = vencedor;
// //     }
// //   });

// //   return partidas;
// // }

// export function preencherVencedoresDasPreliminares(
//   partidas: Match[],
//   resultados: { numeroPartida: number; vencedor: string }[],
// ) {
//   const mapaVencedores = new Map(
//     resultados.map((r) => [
//       `Vencedor Preliminar ${r.numeroPartida}`,
//       r.vencedor,
//     ]),
//   );

//   partidas.forEach((p) => {
//     if (p.duelista1?.startsWith("Vencedor Preliminar")) {
//       const vencedor = mapaVencedores.get(p.duelista1);
//       if (vencedor) p.duelista1 = vencedor;
//     }
//     if (p.duelista2?.startsWith("Vencedor Preliminar")) {
//       const vencedor = mapaVencedores.get(p.duelista2);
//       if (vencedor) p.duelista2 = vencedor;
//     }
//   });

//   return partidas;
// }
