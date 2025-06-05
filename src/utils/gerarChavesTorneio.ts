import { Match, Torneio } from "../@types";
import {
  gerarChavesFasePrincipal,
  preencherPrimeiraRodada,
} from "./gerarChavesFasePrincipal";
import { gerarChavesPreliminares } from "./gerarChavesPreliminares";
import { organizarParticipantesTorneio } from "./organizarParticipantesTorneio";
import { unificarChaves } from "./unificarChaves";

export function gerarChavesTorneio(
  participantes: string[],
  torneiosGeracao: Torneio[],
) {
  // 1 - Parte do Algoritmo é organizar matematicamente os arranjos dos participantes para a criacao das chaves.
  const {
    partidasPreliminares,
    jogadoresParaPreliminares,
    jogadoresNaFasePrincipal,
    duelosDefinidos,
    jogadoresParaDuelosDefinidos,
    jogadoresAguardandoVencedoresPreliminares,
    potenciaDe2,
  } = organizarParticipantesTorneio(participantes, torneiosGeracao);

  // 2 - Parte: Definir a chave na fase principal e conectar até as finais e terceiro lugar.
  // e Definir as chaves preliminares e conectar para que o vencedor se conecte com as chaves que faltam um duelista na chave principal

  // Criacao das variaveis relacionadas as partidas

  // Quantidade de Partidas da fase Principal
  const totalPartidasFasePrincipal = potenciaDe2 - 1;

  // Gerar partidas inicialmente vazias mas conectadas ou seja as chaves da fase principal até a final
  const { partidas: partidasFasePrincipal, proximoId } =
    gerarChavesFasePrincipal(jogadoresNaFasePrincipal, potenciaDe2, 1);

  // Preencher a primeira rodada da fase principal

  const partidasComPrimeiraRodadaPreenchida = preencherPrimeiraRodada(
    partidasFasePrincipal,
    jogadoresParaDuelosDefinidos,
    jogadoresAguardandoVencedoresPreliminares,
    partidasPreliminares,
  );

  const { partidasPreliminares: partidasPrelim, proximoId: idFinal } =
    gerarChavesPreliminares(
      jogadoresParaPreliminares,
      partidasComPrimeiraRodadaPreenchida,
      proximoId,
    );
  // Criar as Chaves Preliminares e conectar com as vagas que faltam na

  const todasAsPartidas = unificarChaves(
    partidasPrelim,
    partidasFasePrincipal,
    potenciaDe2,
  );

  return todasAsPartidas;
}
