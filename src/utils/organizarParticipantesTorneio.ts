import { Torneio } from "../@types";
import { embaralharArray } from "./global";

// export function organizarParticipantesTorneio(
//   participantes: string[],
//   torneiosGeracao: Torneio[],
// ) {
//   // 1 - Parte do Algoritmo é definir matematicamente o arranjo das chaves.
//   const totalParticipantes = participantes.length;

//   // Calcular a potência de 2 mais próxima e menor que ao número total de participantes e salvar em uma variável:
//   const potenciaDe2 = Math.pow(2, Math.floor(Math.log2(totalParticipantes)));

//   // define a quantidade de partidas preliminares, com base na subtracao do total de participantes com a potencia de 2
//   // isso é importante porque vai ser mais facil alinhar as chaves posteriormente, buscando o objetivo de transformar a chave em potencia de 2
//   const partidasPreliminares = totalParticipantes - potenciaDe2;

//   // Quantidade de Jogadores que irão disputar as preliminares
//   const jogadoresPreliminares = partidasPreliminares * 2;

//   // 🎯 Pega o último torneio realizado para buscar o pódio
//   const ultimoTorneio = torneiosGeracao[torneiosGeracao.length - 1];
//   const podiumAnterior = ultimoTorneio?.podium.map((item) => item.nome) || [];

//   // Embaralhar participantes para pegar de maneira aleatoria quem vai disputar as preliminares
//   // Aqui a gente futuramente vai retirar desse embaralhamento quem já esteve no podium anterior
//   const participantesEmbaralhados = embaralharArray(participantes);

//   // Selecionar jogadores para as preliminares
//   const jogadoresParaPreliminares = participantesEmbaralhados.slice(
//     0,
//     jogadoresPreliminares,
//   );

//   // Jogadores que já estão na fase principal aguardando
//   const jogadoresNaFasePrincipal = participantesEmbaralhados.slice(
//     jogadoresPreliminares,
//   );

//   // Para ter uma conexão perfeita das chaves:
//   // Pegar a quantidade Jogadores na Fase Principal e subtraio ao numero de partidas preliminares, o resultado disso eu vou dividir por 2
//   // e vou chamar de Duelos na fase principal já definidos, ou seja posteriormente eu ja vou ter dois duelos já definidos, de maneira aleatória
//   // o restante dos duelos que serão o mesmo numero que as partidas preliminares só serão definidos com base nos vencedores das partidas eliminatorios ou seja vao ter 12 chaves principais que estarao esperando apenas um duelista
//   const duelosDefinidos =
//     (jogadoresNaFasePrincipal.length - partidasPreliminares) / 2;

//   // se Duelos Definidos for menor que 1, jogadoresParaDuelosDefinidos será 0, e jogadoresAguardandoVendedoresPreliminares vai ser igual os jogadores na Fase Principal
//   let jogadoresParaDuelosDefinidos: string[] = [];
//   let jogadoresAguardandoVencedoresPreliminares: string[] = [];

//   if (duelosDefinidos >= 1) {
//     const jogadoresEmbaralhadosFasePrincipal = embaralharArray(
//       jogadoresNaFasePrincipal,
//     );
//     jogadoresParaDuelosDefinidos = jogadoresEmbaralhadosFasePrincipal.slice(
//       0,
//       duelosDefinidos * 2,
//     );
//     jogadoresAguardandoVencedoresPreliminares =
//       jogadoresEmbaralhadosFasePrincipal.slice(duelosDefinidos * 2);
//   } else {
//     // Não há duelos já definidos na fase principal
//     jogadoresParaDuelosDefinidos = [];
//     jogadoresAguardandoVencedoresPreliminares = [...jogadoresNaFasePrincipal];
//   }

//   return {
//     partidasPreliminares,
//     jogadoresParaPreliminares,
//     jogadoresNaFasePrincipal,
//     duelosDefinidos,
//     jogadoresParaDuelosDefinidos,
//     jogadoresAguardandoVencedoresPreliminares,
//     potenciaDe2,
//   };
// }

// export function organizarParticipantesTorneio(
//   participantes: string[],
//   torneiosGeracao: Torneio[],
// ) {
//   const totalParticipantes = participantes.length;

//   const potenciaDe2 = Math.pow(2, Math.floor(Math.log2(totalParticipantes)));

//   const partidasPreliminares = totalParticipantes - potenciaDe2;

//   const jogadoresPreliminares = partidasPreliminares * 2;

//   // 🎯 Pega o último torneio realizado para buscar o pódio
//   const ultimoTorneio = torneiosGeracao[torneiosGeracao.length - 1];
//   const podiumAnterior = ultimoTorneio?.podium.map((item) => item.nome) || [];

//   // 🔥 Determina quantas vagas existem na fase principal (quem não joga preliminar)
//   const vagasFasePrincipal = totalParticipantes - jogadoresPreliminares;

//   // 📌 Seleciona os jogadores beneficiados, respeitando a ordem do pódio e quantidade de vagas
//   const jogadoresBeneficiados = podiumAnterior.slice(0, vagasFasePrincipal);

//   // 🚫 Remove os jogadores beneficiados da lista geral de participantes para não duplicar
//   const participantesRestantes = participantes.filter(
//     (p) => !jogadoresBeneficiados.includes(p),
//   );

//   // 🎲 Embaralha os participantes restantes para definir quem vai para preliminares
//   const participantesEmbaralhados = embaralharArray(participantesRestantes);

//   // 🔍 Seleciona quem vai disputar as preliminares
//   const jogadoresParaPreliminares = participantesEmbaralhados.slice(
//     0,
//     jogadoresPreliminares,
//   );

//   // ✅ Jogadores na fase principal incluem os beneficiados + os que não foram para as preliminares
//   const jogadoresNaFasePrincipal = [
//     ...jogadoresBeneficiados,
//     ...participantesEmbaralhados.slice(jogadoresPreliminares),
//   ];

//   // 🔗 Calcula quantos duelos já estão definidos na fase principal
//   const duelosDefinidos =
//     (jogadoresNaFasePrincipal.length - partidasPreliminares) / 2;

//   let jogadoresParaDuelosDefinidos: string[] = [];
//   let jogadoresAguardandoVencedoresPreliminares: string[] = [];

//   if (duelosDefinidos >= 1) {
//     const jogadoresEmbaralhadosFasePrincipal = embaralharArray(
//       jogadoresNaFasePrincipal,
//     );
//     jogadoresParaDuelosDefinidos = jogadoresEmbaralhadosFasePrincipal.slice(
//       0,
//       duelosDefinidos * 2,
//     );
//     jogadoresAguardandoVencedoresPreliminares =
//       jogadoresEmbaralhadosFasePrincipal.slice(duelosDefinidos * 2);
//   } else {
//     jogadoresParaDuelosDefinidos = [];
//     jogadoresAguardandoVencedoresPreliminares = [...jogadoresNaFasePrincipal];
//   }

//   return {
//     partidasPreliminares,
//     jogadoresParaPreliminares,
//     jogadoresNaFasePrincipal,
//     duelosDefinidos,
//     jogadoresParaDuelosDefinidos,
//     jogadoresAguardandoVencedoresPreliminares,
//     potenciaDe2,
//     jogadoresBeneficiados, // 🏆 Informação útil para exibir quem foi beneficiado
//   };
// }

export function organizarParticipantesTorneio(
  participantes: string[],
  torneiosGeracao: Torneio[],
) {
  const totalParticipantes = participantes.length;

  const potenciaDe2 = Math.pow(2, Math.floor(Math.log2(totalParticipantes)));

  const partidasPreliminares = totalParticipantes - potenciaDe2;

  const jogadoresPreliminares = partidasPreliminares * 2;

  // 🎯 Pega o último torneio realizado para buscar o pódio
  const ultimoTorneio = torneiosGeracao[torneiosGeracao.length - 1];
  const podiumAnterior = ultimoTorneio?.podium.map((item) => item.nome) || [];

  // 🔥 Determina quantas vagas existem na fase principal (quem não joga preliminar)
  const vagasFasePrincipal = totalParticipantes - jogadoresPreliminares;

  // 📌 Seleciona os jogadores beneficiados, respeitando a ordem do pódio e quantidade de vagas
  const jogadoresBeneficiados = podiumAnterior.slice(0, vagasFasePrincipal);

  // 🚫 Remove os jogadores beneficiados da lista geral de participantes para não duplicar
  const participantesRestantes = participantes.filter(
    (p) => !jogadoresBeneficiados.includes(p),
  );

  // 🎲 Embaralha os participantes restantes para definir quem vai para preliminares
  const participantesEmbaralhados = embaralharArray(participantesRestantes);

  // 🔍 Seleciona quem vai disputar as preliminares
  const jogadoresParaPreliminares = participantesEmbaralhados.slice(
    0,
    jogadoresPreliminares,
  );

  // ✅ Jogadores na fase principal incluem os beneficiados + os que não foram para as preliminares
  const jogadoresNaFasePrincipal = [
    ...jogadoresBeneficiados,
    ...participantesEmbaralhados.slice(jogadoresPreliminares),
  ];

  // 🔀 🔥 EMBARALHAR TODOS os jogadores da fase principal (beneficiados + restantes)
  const jogadoresNaFasePrincipalEmbaralhados = embaralharArray(
    jogadoresNaFasePrincipal,
  );

  // 🔗 Calcula quantos duelos já estão definidos na fase principal
  const duelosDefinidos =
    (jogadoresNaFasePrincipalEmbaralhados.length - partidasPreliminares) / 2;

  let jogadoresParaDuelosDefinidos: string[] = [];
  let jogadoresAguardandoVencedoresPreliminares: string[] = [];

  if (duelosDefinidos >= 1) {
    jogadoresParaDuelosDefinidos = jogadoresNaFasePrincipalEmbaralhados.slice(
      0,
      duelosDefinidos * 2,
    );
    jogadoresAguardandoVencedoresPreliminares =
      jogadoresNaFasePrincipalEmbaralhados.slice(duelosDefinidos * 2);
  } else {
    jogadoresParaDuelosDefinidos = [];
    jogadoresAguardandoVencedoresPreliminares = [
      ...jogadoresNaFasePrincipalEmbaralhados,
    ];
  }

  return {
    partidasPreliminares,
    jogadoresParaPreliminares,
    jogadoresNaFasePrincipal: jogadoresNaFasePrincipalEmbaralhados,
    duelosDefinidos,
    jogadoresParaDuelosDefinidos,
    jogadoresAguardandoVencedoresPreliminares,
    potenciaDe2,
    jogadoresBeneficiados, // 🏆 Informação útil para exibir quem foi beneficiado
  };
}
