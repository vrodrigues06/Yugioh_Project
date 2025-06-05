import { Match } from "../@types";

function embaralharArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export function preencherPrimeiraRodada(
  partidas: Match[],
  jogadoresParaDuelosDefinidos: string[],
  jogadoresAguardandoVencedoresPreliminares: string[],
  partidasPreliminares: number,
) {
  const primeiraRodada = partidas.filter(
    (p) => p.rodada === partidas[0].rodada && p.rodada !== "Disputa 3º Lugar",
  );

  const totalDuelosDefinidos = jogadoresParaDuelosDefinidos.length / 2;
  const totalAguardando = jogadoresAguardandoVencedoresPreliminares.length;
  const totalPartidasComAmbosNull =
    (partidasPreliminares - totalAguardando) / 2;

  const tiposDeSlots = [
    ...Array(totalDuelosDefinidos).fill("dupla"),
    ...Array(totalAguardando).fill("simples"),
    ...Array(totalPartidasComAmbosNull).fill("preencheComPreliminar"),
  ];

  const tiposDeSlotsEmbaralhados = embaralharArray(tiposDeSlots);

  let indexDuelos = 0;
  let indexAguardando = 0;

  for (let i = 0; i < primeiraRodada.length; i++) {
    const tipo = tiposDeSlotsEmbaralhados[i];
    const partida = primeiraRodada[i];

    if (tipo === "dupla") {
      partida.duelista1 = jogadoresParaDuelosDefinidos[indexDuelos];
      partida.duelista2 = jogadoresParaDuelosDefinidos[indexDuelos + 1];
      indexDuelos += 2;
    } else if (tipo === "simples") {
      partida.duelista1 =
        jogadoresAguardandoVencedoresPreliminares[indexAguardando];
      partida.duelista2 = null;
      indexAguardando++;
    } else if (tipo === "preencheComPreliminar") {
      partida.duelista1 = null;
      partida.duelista2 = null;
    }
  }

  // 🔍 Garantir consistência: undefined -> null
  primeiraRodada.forEach((partida) => {
    if (typeof partida.duelista1 === "undefined") {
      partida.duelista1 = null;
    }
    if (typeof partida.duelista2 === "undefined") {
      partida.duelista2 = null;
    }
  });

  return partidas;
}

export function gerarChavesFasePrincipal(
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
        numero_partida: i + 1,
        duelista1: null,
        duelista2: null,
        vencedor: null,
        status: "pendente",
        proxima_partida_id: null,
      };

      partidas.push(match);
      partidasRodadaAtual.push(partidaId);

      partidaId++;
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
      numero_partida: 1,
      duelista1: null,
      duelista2: null,
      vencedor: null,
      status: "pendente",
      proxima_partida_id: null,
    });

    partidaId++;
  }

  return { partidas, proximoId: partidaId };
}
