import React from "react";
import { Classificacao, Match, Mundial, Ranking, Torneio } from "../../@types";
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
import { useHandleMatch } from "../../hooks/useHandleMatch";
import { DuelistItemMundialModel } from "./DuelistItemMundialModel";
import { ConfirmModal } from "../../components/ConfirmModal";
import supabase from "../../api/supabase";

interface DuelistItemProps {
  match: Match;
  duelista: string | null;
  identificador: "1" | "2";
  torneio: Mundial;
}

const DuelistItemMundial = ({
  match,
  duelista,
  identificador,
  torneio,
}: DuelistItemProps) => {
  const {
    personagem,
    handleMatch,
    isPerdedor,
    hasVencedor,
    isMatchReady,
    isCampeao,
    rankingMundial,
    melhoresColocacoes,
    colocacoesAnteriores,
    melhoresColocacoesMundial,
    colocacoesAnterioresMundial,
    titulos,
    vices,
    terceiro,
    quarto,
    hasTitulo,
  } = DuelistItemMundialModel({ duelista, match, torneio });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmAction = () => {
    handleMatch(); // ação real
    closeModal();
  };

  // React.useEffect(() => {
  //   const atualizarParticipacoes = async () => {
  //     if (!personagem?.colocacoes_mundial) return;

  //     const participacoes_mundial = personagem.colocacoes_mundial.length;

  //     const { data, error } = await supabase
  //       .from("personagens")
  //       .update({ participacoes_mundial })
  //       .eq("id", personagem.id); // certifique-se que `personagem.id` está disponível

  //     if (error) {
  //       console.error("Erro ao atualizar a participação:", error);
  //     } else {
  //       console.log("Participações atualizadas com sucesso:", data);
  //     }
  //   };

  //   atualizarParticipacoes();
  // }, [personagem]);

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

  return (
    <>
      <div className="relative group">
        <div
          onClick={hasVencedor || !isMatchReady ? undefined : openModal}
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
            <h1 className="flex gap-1">
              {duelista}
              <span
                className={`font-semibold ${
                  personagem.geracao === "gx"
                    ? "text-purple-500"
                    : personagem.geracao === "dm"
                    ? "text-orange-400"
                    : personagem.geracao === "5ds"
                    ? "text-sky-500"
                    : "text-sky-300" // cor padrão caso não caia em nenhuma condição
                }`}
              >
                ({personagem.geracao.toUpperCase()})
              </span>
            </h1>
            <div className="flex gap-1 mb-1 flex-wrap items-center">
              {hasTitulo && (
                <span
                  className={`text-xs ${
                    isCampeao ? "text-orange-100" : "text-slate-600"
                  }`}
                >
                  Mundial |
                </span>
              )}
              <div className="flex gap-1">
                {titulos.map((t, i) => (
                  <span key={i}>{setEmoji("Mundial-C")}</span>
                ))}
              </div>
              <div className="flex gap-1">
                {vices.map((t, i) => (
                  <span key={i}>{setEmoji("Mundial-V")}</span>
                ))}
              </div>
              <div className="flex gap-1">
                {terceiro.map((t, i) => (
                  <span key={i}>{setEmoji(t.classificacao)}</span>
                ))}
              </div>
              <div className="flex gap-1">
                {quarto.map((t, i) => (
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
            {rankingMundial !== null && rankingMundial > 0 ? (
              <div className="flex flex-col gap-0.5">
                <span>
                  Ranking <span className="text-white"> #{rankingMundial}</span>
                </span>
                <div>
                  <p>Part: #{personagem.participacoes_mundial}</p>
                </div>
              </div>
            ) : (
              ""
            )}
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

          {colocacoesAnterioresMundial !== undefined ? (
            <div className="mb-4">
              <p className="mb-1 ">
                Histórico Recente:{" "}
                <span className="text-white"> (mundial) </span>
              </p>
              <ul className="grid gap-1">
                {colocacoesAnterioresMundial.map((c) => (
                  <li
                    key={c.ano}
                    className="flex gap-0.5 items-center text-white"
                  >
                    <span className="text-sky-400 font-semibold">
                      {c.ano}:{" "}
                    </span>{" "}
                    {setEmoji(c.classificacao)} {c.classificacao}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}

          <div>
            <p className="mb-1 ">
              Histórico Recente:{" "}
              <span className="text-white"> (nacional) </span>
            </p>
            <ul className="grid gap-1">
              {colocacoesAnteriores.map((c) => (
                <li
                  key={c.ano}
                  className="flex gap-0.5 items-center text-white"
                >
                  <span className="text-sky-400 font-semibold">{c.ano}: </span>{" "}
                  {setEmoji(c.classificacao)} {c.classificacao}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        title="Deseja definir o vencedor?"
        duelista={duelista}
      />
    </>
  );
};

export default DuelistItemMundial;
