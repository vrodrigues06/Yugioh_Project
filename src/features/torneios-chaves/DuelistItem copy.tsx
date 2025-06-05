import React from "react";
import { Classificacao, Match, Ranking, Torneio } from "../../@types";
import { Personagem } from "../../@types/personagem";
import { addRanking, getPersonagemByName } from "../../api/apiPersonagens";
import { setEmoji } from "../../utils/setEmoji";
import setPontos from "../../utils/setPontos";
import setClassificacao from "../../utils/setClassificacao";
import { useUpdateClassificacao } from "../../hooks/useUpdateClassificacao";
import { useUpdateMatches } from "../../hooks/useUpdateMatches";
import { getPerdedor } from "../../utils/getPerdedor";
import setPodium from "../../utils/setPodium";
import { useFinalizarTorneio } from "../../hooks/useFinalizarTorneio";
import { createRanking, updateRankingGlobal } from "../../api/apiRanking";
import usePersonagens from "../../hooks/usePersonagens";
import { useRankingStore } from "../../store/useRankingStore";
import { findRankingIndex, setMelhoresColocacoes } from "../../utils/global";

interface DuelistItemProps {
  match: Match;
  duelista: string | null;
  identificador: "1" | "2";
  torneio: Torneio;
}

const DuelistItem = ({
  match,
  duelista,
  identificador,
  torneio,
}: DuelistItemProps) => {
  const [personagem, setPersonagem] = React.useState<Personagem | null>(null);
  const { mutate: atualizarClassificacao } = useUpdateClassificacao(
    torneio.geracao,
    torneio.ano,
  );
  const { mutate: atualizarMatches } = useUpdateMatches(
    torneio.geracao,
    torneio.ano,
  );
  const { mutate: finalizarTorneio } = useFinalizarTorneio();
  const { data: personagens } = usePersonagens(torneio.geracao);

  const perdedor = getPerdedor(match);
  const isPerdedor = duelista === perdedor;
  const hasVencedor = !!match.vencedor;
  const isMatchReady = match.duelista1 !== null && match.duelista2 !== null;
  const campeao = torneio.podium.find((p) => p.classificacao === "Campeao");
  const isCampeao = campeao?.nome === duelista;

  const { rankings, fetchRanking } = useRankingStore();

  React.useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  React.useEffect(() => {
    async function fetchPersonagem() {
      if (duelista === null) return;

      const personagemData = await getPersonagemByName(duelista);

      setPersonagem(personagemData);
    }

    fetchPersonagem();
  }, [duelista]);

  if (duelista === null) {
    const origem =
      match[
        `origemDuelista${identificador}` as
          | "origemDuelista1"
          | "origemDuelista2"
      ];
    if (!origem) return;

    return (
      <div className="w-50 h-12 text-slate-600 text-xs bg-azul-950 p-1.5 flex gap-1.5 items-center shadow-2xl  ">
        <div className=" size-8 rounded-full bg-cover bg-top border transition-all border-black bg-[url('/shadow.jpg')]"></div>

        {origem}
      </div>
    );
  }

  if (!personagem) return;

  const titulos = personagem?.colocacoes.filter(
    (c) => c.classificacao === "Campeao",
  );

  const vices = personagem?.colocacoes.filter(
    (c) => c.classificacao === "Segundo",
  );

  const terceiro = personagem?.colocacoes.filter(
    (c) => c.classificacao === "Terceiro",
  );

  const quarto = personagem?.colocacoes.filter(
    (c) => c.classificacao === "quarto",
  );

  const hasTitulo =
    titulos.length > 0 ||
    vices.length > 0 ||
    terceiro.length > 0 ||
    quarto.length > 0;

  const rankingNacional = findRankingIndex(
    personagem.nome,
    personagem.geracao,
    rankings,
  );

  const melhoresColocacoes = setMelhoresColocacoes(personagem);

  const colocacoesAnteriores = personagem.colocacoes
    .sort((a, b) => {
      return b.ano - a.ano;
    })
    .slice(0, 3);

  function handleMatch() {
    if (torneio.status !== "em_andamento") return;

    const duelistaOponente =
      match.duelista1 === duelista ? match.duelista2 : match.duelista1;

    if (!duelistaOponente) return;

    const oponenteJaEliminado = torneio.classificacao.some(
      (item) => item.nome === duelistaOponente,
    );
    const duelistaJaEliminado = torneio.classificacao.some(
      (item) => item.nome === duelista,
    );

    if (oponenteJaEliminado || duelistaJaEliminado) {
      console.log("Partida já foi decidida");
      return;
    }

    const rodada = match.rodada.toLowerCase();

    if (rodada === "final") {
      const partidaTerceiroLugar = torneio.matches.find(
        (m) => m.rodada.toLowerCase() === "disputa 3º lugar",
      );

      if (partidaTerceiroLugar && partidaTerceiroLugar.status !== "concluida") {
        console.log(
          "⚠️ Defina primeiro o vencedor da disputa de 3º lugar antes de finalizar a final.",
        );
        alert(
          "⚠️ Defina primeiro o vencedor da disputa de 3º lugar antes de finalizar a final.",
        );
        return;
      }

      // Campeão
      torneio.classificacao.push({
        nome: duelista as string,
        pontos: setPontos("campeao"),
        classificacao: setClassificacao("campeao"),
        eliminadoPor: null, // Ninguém venceu o campeão
      });

      // Vice-campeão
      torneio.classificacao.push({
        nome: duelistaOponente,
        pontos: setPontos("segundo"),
        classificacao: setClassificacao("segundo"),
        eliminadoPor: duelista,
      });

      atualizarClassificacao(torneio.classificacao);

      const podium = setPodium(torneio.classificacao);
      torneio.status = "finalizado";

      const rankingAtual: Ranking = {
        ano: torneio.ano,
        geracao: torneio.geracao,
        ranking: torneio.classificacao.map(({ nome, pontos }) => ({
          nome,
          pontos,
        })),
      };

      updateRankingGlobal(torneio.geracao, torneio.classificacao);
      createRanking(rankingAtual);

      personagens.forEach(({ nome, id, pontuacao }) => {
        const personagemPontuacao = torneio.classificacao.find(
          ({ nome: n }: Classificacao) => n === nome,
        );

        if (personagemPontuacao) {
          const pontuacaoAtual = personagemPontuacao.pontos + pontuacao;
          const colocacao = {
            ano: torneio.ano.toString(),
            classificacao: personagemPontuacao.classificacao,
          };
          addRanking(colocacao, pontuacaoAtual, id);
        }
      });

      finalizarTorneio({ podium, geracao: torneio.geracao, ano: torneio.ano });
    } else if (rodada === "disputa 3º lugar") {
      // Terceiro lugar
      torneio.classificacao.push({
        nome: duelista as string,
        pontos: setPontos("terceiro"),
        classificacao: setClassificacao("terceiro"),
        eliminadoPor: null, // Não foi eliminado nesta partida
      });

      // Quarto lugar
      torneio.classificacao.push({
        nome: duelistaOponente,
        pontos: setPontos("quarto"),
        classificacao: setClassificacao("quarto"),
        eliminadoPor: duelista,
      });

      atualizarClassificacao(torneio.classificacao);
    } else if (rodada !== "semifinal") {
      // Outras rodadas
      torneio.classificacao.push({
        nome: duelistaOponente,
        pontos: setPontos(rodada),
        classificacao: setClassificacao(rodada),
        eliminadoPor: duelista,
      });

      atualizarClassificacao(torneio.classificacao);
    }

    // Atualiza a partida atual
    const partidaAtualizada = {
      ...match,
      status: "concluida",
      vencedor: duelista,
    };

    let matchesAtualizadas = torneio.matches.map((m) =>
      m.id === match.id ? partidaAtualizada : m,
    );

    // Atualiza a próxima partida (Final ou 3º lugar)
    if (match.proxima_partida_id) {
      const proximaPartida = matchesAtualizadas.find(
        (m) => m.id === match.proxima_partida_id,
      );

      if (proximaPartida) {
        const origemDuelista1 = proximaPartida.origemDuelista1;
        const origemDuelista2 = proximaPartida.origemDuelista2;

        const descricaoVencedor1 = `Vencedor da Partida ${match.numero_partida}`;
        const descricaoVencedor2 = `Preliminar ${match.numero_partida}`;

        const proximaPartidaAtualizada = {
          ...proximaPartida,
          duelista1:
            origemDuelista1 === descricaoVencedor1 ||
            origemDuelista1 === descricaoVencedor2
              ? duelista
              : proximaPartida.duelista1,
          duelista2:
            origemDuelista2 === descricaoVencedor1 ||
            origemDuelista2 === descricaoVencedor2
              ? duelista
              : proximaPartida.duelista2,
        };

        matchesAtualizadas = matchesAtualizadas.map((m) =>
          m.id === proximaPartida.id ? proximaPartidaAtualizada : m,
        );

        // Se for Semifinal, perdedor vai para disputa do 3º lugar
        if (rodada === "semifinal") {
          const partidaTerceiroLugar = matchesAtualizadas.find(
            (m) => m.id === proximaPartida.id + 1,
          );

          if (partidaTerceiroLugar) {
            const origemDuelista1 = partidaTerceiroLugar.origemDuelista1;
            const origemDuelista2 = partidaTerceiroLugar.origemDuelista2;

            const descricaoPerdedor = `Perdedor da Partida ${match.numero_partida}`;

            const partidaTerceiroLugarAtualizada = {
              ...partidaTerceiroLugar,
              duelista1:
                origemDuelista1 === descricaoPerdedor
                  ? duelistaOponente
                  : partidaTerceiroLugar.duelista1,
              duelista2:
                origemDuelista2 === descricaoPerdedor
                  ? duelistaOponente
                  : partidaTerceiroLugar.duelista2,
            };

            matchesAtualizadas = matchesAtualizadas.map((m) =>
              m.id === partidaTerceiroLugar.id
                ? partidaTerceiroLugarAtualizada
                : m,
            );
          }
        }
      }
    }

    torneio.matches = matchesAtualizadas as Match[];
    atualizarMatches(torneio.matches);
  }

  return (
    <div className="relative group">
      <div
        onClick={hasVencedor || !isMatchReady ? undefined : handleMatch}
        className={`w-50 h-12 text-xs p-1.5 flex gap-1.5 items-center shadow-2xl border border-transparent transition-all group
        ${
          isPerdedor
            ? "text-slate-500 opacity-50 bg-gradient-to-r from-slate-800 to-slate-700 cursor-default"
            : isCampeao
            ? "bg-gradient-to-r from-orange-500 to-laranja-500 text-white border-white cursor-default" // 🎉 Estilo de campeão
            : `text-white ${
                hasVencedor || !isMatchReady
                  ? "bg-azul-950 cursor-default"
                  : "bg-azul-950 cursor-pointer hover:scale-105 hover:border-orange-500"
              }`
        }
        `}
      >
        <div
          className={`size-8 rounded-full bg-cover bg-top border transition-all ${
            isPerdedor
              ? "border-slate-500"
              : isCampeao
              ? "border-white" // 🏆 Borda especial para campeão
              : hasVencedor || !isMatchReady
              ? "border-sky-300"
              : "border-sky-300 group-hover:border-orange-500"
          }`}
          style={{ backgroundImage: `url(${personagem?.perfil})` }}
        ></div>

        <div className="grid gap-0.5">
          <h1>{duelista}</h1>
          <div className="flex gap-1 mb-1 flex-wrap items-center">
            {hasTitulo && (
              <span
                className={`text-xs ${
                  isCampeao ? "text-orange-100" : "text-slate-600"
                }`}
              >
                Nacional |
              </span>
            )}
            <div className="flex gap-1">
              {titulos.map((t, i) => (
                <span key={i}>{setEmoji(t.classificacao)}</span>
              ))}
            </div>
            <div className="flex gap-1">
              {vices.map((t, i) => (
                <span key={i}>{setEmoji(t.classificacao)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-50 w-60 p-3 bg-azul-950/80 text-slate-400 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2 top-14">
        <div className="flex justify-between mb-4 border-b pb-1.5 border-sky-300/80">
          <h2 className="font-semibold  text-orange-500 text-sm flex flex-col gap-px">
            {personagem?.nome}
            <span className="text-[10px] text-slate-500">
              {personagem?.deckName}
            </span>
          </h2>
          <span>
            Ranking <span className="text-white"> #{rankingNacional}</span>
          </span>
        </div>
        {melhoresColocacoes.length ? (
          <div className="mb-4">
            <p className="mb-1 ">Titulos:</p>
            {melhoresColocacoes.map((colocacao) => {
              return (
                <span
                  key={colocacao.ano}
                  className="flex gap-0.5 items-center text-white font-semibold"
                >
                  {setEmoji(colocacao.classificacao)}
                  {personagem.geracao.toUpperCase()} {colocacao.ano}
                </span>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* <div className="mb-2">
          {personagem.participacoes_mundial > 0 && (
            <p>Mundial Participações: #{personagem.participacoes_mundial}</p>
          )}
        </div> */}
        <div>
          <p className="mb-1 ">Histórico Recente:</p>
          <ul className="grid gap-1">
            {colocacoesAnteriores.map((c) => (
              <li key={c.ano} className="flex gap-0.5 items-center text-white">
                <span className="text-sky-400 font-semibold">{c.ano}: </span>{" "}
                {setEmoji(c.classificacao)} {c.classificacao}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DuelistItem;
