import { Match, Mundial, Ranking, Torneio } from "../@types";
import setPontos from "../utils/setPontos";
import setClassificacao from "../utils/setClassificacao";
import setPodium from "../utils/setPodium";
import { useUpdateClassificacaoMundial } from "./useUpdateClassificacaoMundial";
import { useUpdateMatchesMundial } from "./useUpdateMachesMundial";
import { useFinalizarTorneioMundial } from "./useFinalizarTorneioMundial";
import { createRanking, updateRankingGlobal } from "../api/apiRanking";
import { addRankingMundial } from "../api/apiPersonagens";
import useAllPersonagens from "./useAllPersonagens";

type UseHandleMatchProps = {
  duelista: string | null;
  match: Match;
  torneio: Mundial;
};

export const useHandleMatchMundial = ({
  duelista,
  match,
  torneio,
}: UseHandleMatchProps) => {
  const { data: personagens } = useAllPersonagens();
  const { mutate: atualizarClassificacao } = useUpdateClassificacaoMundial(
    torneio.ano,
  );

  const { mutate: atualizarMatches } = useUpdateMatchesMundial(torneio.ano);
  const { mutate: finalizarTorneio } = useFinalizarTorneioMundial();

  const handleMatch = () => {
    if (torneio.status !== "em_andamento") return;

    const oponente = getOponente();
    if (!oponente) return;

    if (isEliminado(duelista) || isEliminado(oponente)) {
      console.log("⚠️ Partida já foi decidida.");
      return;
    }

    switch (match.rodada.toLowerCase()) {
      case "final":
        if (!processarFinal(oponente)) return;
        break;
      case "disputa 3º lugar":
        processarTerceiroLugar(oponente);
        break;
      default:
        processarOutrasRodadas(oponente);
        break;
    }

    atualizarStatusPartidas();
  };

  /** === FUNÇÕES AUXILIARES === */

  const getOponente = () =>
    match.duelista1 === duelista ? match.duelista2 : match.duelista1;

  const isEliminado = (nome: string | null) =>
    torneio.classificacao.some((item) => item.nome === nome);

  const atualizarStatusPartidas = () => {
    const partidaConcluida: Match = {
      ...match,
      status: "concluida",
      vencedor: duelista,
    };

    let matchesAtualizadas = torneio.matches.map((m) =>
      m.id === match.id ? partidaConcluida : m,
    );

    matchesAtualizadas = atualizarProximaPartida(matchesAtualizadas);
    matchesAtualizadas = atualizarDisputaTerceiroLugar(matchesAtualizadas);

    torneio.matches = matchesAtualizadas;
    atualizarMatches(matchesAtualizadas);
  };

  const processarFinal = (oponente: string) => {
    const partidaTerceiro = torneio.matches.find(
      (m) => m.rodada.toLowerCase() === "disputa 3º lugar",
    );

    if (partidaTerceiro && partidaTerceiro.status !== "concluida") {
      alert("⚠️ Finalize a disputa de 3º lugar antes da final.");
      return false;
    }

    torneio.classificacao.push(
      {
        nome: duelista as string,
        pontos: setPontos("campeao"),
        classificacao: setClassificacao("campeao"),
        eliminadoPor: null,
      },
      {
        nome: oponente,
        pontos: setPontos("segundo"),
        classificacao: setClassificacao("segundo"),
        eliminadoPor: duelista,
      },
    );

    atualizarClassificacao(torneio.classificacao);

    const podium = setPodium(torneio.classificacao);
    torneio.status = "finalizado";

    // const rankingAtual: Ranking = {
    //   ano: torneio.ano,
    //   geracao: "mundial",
    //   ranking: torneio.classificacao.map(({ nome, pontos }) => ({
    //     nome,
    //     pontos,
    //   })),
    // };

    // updateRankingGlobal("mundial", torneio.classificacao);
    // createRanking(rankingAtual);

    // personagens.forEach(
    //   ({ nome, id, participacoes_mundial, pontuacao_mundial }) => {
    //     const registro = torneio.classificacao.find((c) => c.nome === nome);
    //     if (registro) {
    //       let novaPontuacao;
    //       if (pontuacao_mundial === null) {
    //         novaPontuacao = registro.pontos;
    //       } else {
    //         novaPontuacao = registro.pontos + pontuacao_mundial;
    //       }

    //       const participacaoInc = participacoes_mundial + 1;

    //       const colocacao = {
    //         ano: torneio.ano.toString(),
    //         classificacao: registro.classificacao,
    //       };
    //       addRankingMundial(colocacao, participacaoInc, novaPontuacao, id);
    //     }
    //   },
    // );

    finalizarTorneio({ podium, ano: torneio.ano });

    return true;
  };

  const processarTerceiroLugar = (oponente: string) => {
    if (!duelista) return;

    // Encontrar de quais partidas vieram os perdedores
    const partidaTerceiro = torneio.matches.find(
      (m) => m.rodada.toLowerCase() === "disputa 3º lugar",
    );

    if (!partidaTerceiro) {
      console.warn("Partida de 3º lugar não encontrada.");
      return;
    }

    // Extrair números das partidas de origem dos dois duelistas
    const numeroPartida1 = Number(
      partidaTerceiro.origemDuelista1?.replace(/\D/g, ""),
    );
    const numeroPartida2 = Number(
      partidaTerceiro.origemDuelista2?.replace(/\D/g, ""),
    );

    // Encontrar as partidas de semifinal de onde vieram
    const partidaOrigem1 = torneio.matches.find(
      (m) => m.numero_partida === numeroPartida1,
    );
    const partidaOrigem2 = torneio.matches.find(
      (m) => m.numero_partida === numeroPartida2,
    );

    if (!partidaOrigem1 || !partidaOrigem2) {
      console.warn("Partidas de origem para disputa de 3º não encontradas.");
      return;
    }

    // Quem venceu as semifinais foi quem eliminou quem está no 3º lugar
    const eliminadorDuelista =
      partidaOrigem1 &&
      (partidaTerceiro.origemDuelista1?.includes(
        partidaOrigem1.numero_partida.toString(),
      )
        ? partidaOrigem1.vencedor
        : null);

    const eliminadorOponente =
      partidaOrigem2 &&
      (partidaTerceiro.origemDuelista2?.includes(
        partidaOrigem2.numero_partida.toString(),
      )
        ? partidaOrigem2.vencedor
        : null);

    torneio.classificacao.push(
      {
        nome: duelista,
        pontos: setPontos("terceiro"),
        classificacao: setClassificacao("terceiro"),
        eliminadoPor: eliminadorDuelista,
      },
      {
        nome: oponente,
        pontos: setPontos("quarto"),
        classificacao: setClassificacao("quarto"),
        eliminadoPor: eliminadorOponente,
      },
    );

    atualizarClassificacao(torneio.classificacao);
  };

  const processarOutrasRodadas = (oponente: string) => {
    if (match.rodada === "Semifinal") return;

    torneio.classificacao.push({
      nome: oponente,
      pontos: setPontos(match.rodada),
      classificacao: setClassificacao(match.rodada),
      eliminadoPor: duelista,
    });

    atualizarClassificacao(torneio.classificacao);
  };

  /** === ATUALIZANDO PRÓXIMAS PARTIDAS === */

  const atualizarProximaPartida = (matches: Match[]) => {
    if (!match.proxima_partida_id) return matches;

    const proxima = matches.find((m) => m.id === match.proxima_partida_id);
    if (!proxima) return matches;

    const origemDuelista1 = proxima.origemDuelista1;
    const origemDuelista2 = proxima.origemDuelista2;

    const descricaoVencedor = `Vencedor da Partida ${match.numero_partida}`;
    const descricaoPreliminar = `Preliminar ${match.numero_partida}`;

    const atualizada: Match = {
      ...proxima,
      duelista1:
        origemDuelista1 === descricaoVencedor ||
        origemDuelista1 === descricaoPreliminar
          ? duelista
          : proxima.duelista1,
      duelista2:
        origemDuelista2 === descricaoVencedor ||
        origemDuelista2 === descricaoPreliminar
          ? duelista
          : proxima.duelista2,
    };

    return matches.map((m) => (m.id === proxima.id ? atualizada : m));
  };

  const atualizarDisputaTerceiroLugar = (matches: Match[]) => {
    if (match.rodada.toLowerCase() !== "semifinal") return matches;

    const partidaTerceiro = matches.find(
      (m) => m.id === match.proxima_partida_id! + 1,
    );
    if (!partidaTerceiro) return matches;

    const oponente = getOponente();
    const descricaoPerdedor = `Perdedor da Partida ${match.numero_partida}`;

    const atualizada: Match = {
      ...partidaTerceiro,
      duelista1:
        partidaTerceiro.origemDuelista1 === descricaoPerdedor
          ? oponente!
          : partidaTerceiro.duelista1,
      duelista2:
        partidaTerceiro.origemDuelista2 === descricaoPerdedor
          ? oponente!
          : partidaTerceiro.duelista2,
    };

    return matches.map((m) => (m.id === partidaTerceiro.id ? atualizada : m));
  };

  /** === RETURN === */

  return {
    handleMatch,
  };
};
