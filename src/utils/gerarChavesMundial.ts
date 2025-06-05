import { Match } from "../@types";
import { ParticipantesI } from "../features/mundial-chaves/GerarMundial";
import {
  gerarChavesFasePrincipal,
  preencherPrimeiraRodada,
} from "./gerarChavesFasePrincipal";
import { unificarChaves } from "./unificarChaves";

export function gerarChavesMundial(participantes: ParticipantesI) {
  const participantesAr = [
    ...participantes.campeoes,
    ...participantes.quartos,
    ...participantes.selecionadosQuartas,
    ...participantes.terceiros,
    ...participantes.vices,
  ];

  const totalParticipantes = participantesAr.length;

  const potenciaDe2 = Math.pow(2, Math.floor(Math.log2(totalParticipantes)));

  const totalPartidasFasePrincipal = potenciaDe2 - 1;

  const { partidas: partidasFasePrincipal, proximoId } =
    gerarChavesFasePrincipalMundial(participantesAr, potenciaDe2, 1);

  const partidasComPrimeiraRodadaPreenchida = preencherPrimeiraRodadaMundial(
    partidasFasePrincipal,
    participantes,
  );

  const todasAsPartidas = unificarChaves(
    [],
    partidasComPrimeiraRodadaPreenchida,
    potenciaDe2,
  );

  return todasAsPartidas;
}

export function gerarChavesFasePrincipalMundial(
  jogadores: string[],
  potenciaDe2: number,
  proximoMatchId: number,
): { partidas: Match[]; proximoId: number } {
  const rodadasLabels = [
    "32 avos",
    "16 avos",
    "Oitavas",
    "Quartas",
    "Semifinal",
    "Final",
  ] as const;

  const totalRodadas = Math.log2(potenciaDe2);
  const rodadasGeradas = rodadasLabels.slice(
    rodadasLabels.length - totalRodadas,
  );

  const partidas: Match[] = [];

  let partidasRodadaAnterior: number[] = [];
  let partidaId = proximoMatchId;
  let numeroPartidaGlobal = 1; // ✅ Controle global da numeração das partidas

  // Gerar as rodadas principais
  for (
    let rodadaIndex = 0;
    rodadaIndex < rodadasGeradas.length;
    rodadaIndex++
  ) {
    const rodadaLabel = rodadasGeradas[rodadaIndex];
    const numPartidas = potenciaDe2 / Math.pow(2, rodadaIndex + 1);

    const partidasRodadaAtual: number[] = [];

    for (let i = 0; i < numPartidas; i++) {
      const match: Match = {
        id: partidaId,
        rodada: rodadaLabel,
        numero_partida: numeroPartidaGlobal, // ✅ Numeração contínua
        duelista1: null,
        duelista2: null,
        vencedor: null,
        status: "pendente",
        proxima_partida_id: null,
      };

      partidas.push(match);
      partidasRodadaAtual.push(partidaId);

      partidaId++;
      numeroPartidaGlobal++; // ✅ Incrementa continuamente
    }

    // Conectar com a próxima rodada
    if (rodadaIndex > 0) {
      partidasRodadaAnterior.forEach((id, index) => {
        const partida = partidas.find((m) => m.id === id);
        const proximaId = partidasRodadaAtual[Math.floor(index / 2)];
        if (partida) partida.proxima_partida_id = proximaId;
      });
    }

    partidasRodadaAnterior = partidasRodadaAtual;
  }

  // Criar a partida de disputa de terceiro lugar
  const semiFinalPartidas = partidas.filter((p) => p.rodada === "Semifinal");
  if (semiFinalPartidas.length === 2) {
    partidas.push({
      id: partidaId,
      rodada: "Disputa 3º Lugar",
      numero_partida: numeroPartidaGlobal, // ✅ Continua a numeração
      duelista1: null,
      duelista2: null,
      vencedor: null,
      status: "pendente",
      proxima_partida_id: null,
    });

    partidaId++;
    numeroPartidaGlobal++; // ✅ Incrementa também aqui
  }

  return { partidas, proximoId: partidaId };
}

export function preencherPrimeiraRodadaMundial(
  partidas: Match[],
  duelistas: ParticipantesI,
) {
  const primeiraRodada = partidas.filter(
    (p) => p.rodada === partidas[0].rodada && p.rodada !== "Disputa 3º Lugar",
  );

  const duelistasDisponiveis = {
    campeoes: [...duelistas.campeoes],
    vices: [...duelistas.vices],
    terceiros: [...duelistas.terceiros],
    quartos: [...duelistas.quartos],
    selecionadosQuartas: [...duelistas.selecionadosQuartas],
  };

  const duelos: [string, string][] = [];

  // 1. Cada Campeão × Selecionado das Quartas
  duelistasDisponiveis.campeoes.forEach((campeao) => {
    const selecionado = removerAleatorio(
      duelistasDisponiveis.selecionadosQuartas,
    );
    duelos.push([campeao, selecionado]);
  });
  duelistasDisponiveis.campeoes = []; // Esvazia os campeões pois já foram usados

  // 2. Vice × Selecionado das Quartas
  const vice1 = removerAleatorio(duelistasDisponiveis.vices);
  const selecionadoQ = removerAleatorio(
    duelistasDisponiveis.selecionadosQuartas,
  );
  duelos.push([vice1, selecionadoQ]);

  // 3. Dois Vices × Dois Quartos
  const vice2 = removerAleatorio(duelistasDisponiveis.vices);
  const quarto1 = removerAleatorio(duelistasDisponiveis.quartos);
  duelos.push([vice2, quarto1]);

  const vice3 = removerAleatorio(duelistasDisponiveis.vices);
  const quarto2 = removerAleatorio(duelistasDisponiveis.quartos);
  duelos.push([vice3, quarto2]);

  // 4. Terceiro × Quarto
  const terceiro1 = removerAleatorio(duelistasDisponiveis.terceiros);
  const quarto3 = removerAleatorio(duelistasDisponiveis.quartos);
  duelos.push([terceiro1, quarto3]);

  // 5. Terceiro × Terceiro (os dois últimos)
  const terceiro2 = removerAleatorio(duelistasDisponiveis.terceiros);
  const terceiro3 = removerAleatorio(duelistasDisponiveis.terceiros);
  duelos.push([terceiro2, terceiro3]);

  // 🌀 Embaralhar ordem dos confrontos na chave
  const duelosEmbaralhados = embaralharArray(duelos);

  // 🏆 Preencher partidas
  for (let i = 0; i < primeiraRodada.length; i++) {
    const partida = primeiraRodada[i];
    const duelo = duelosEmbaralhados[i];

    partida.duelista1 = duelo[0];
    partida.duelista2 = duelo[1];
  }

  return partidas;
}

// 🔧 Função para remover aleatoriamente de um array
function removerAleatorio(array: string[]): string {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}

// 🔄 Função para embaralhar um array
function embaralharArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}
