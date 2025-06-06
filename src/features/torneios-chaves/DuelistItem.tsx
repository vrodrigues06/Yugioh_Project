import React from "react";
import { Match, Torneio } from "../../@types";
import { setEmoji } from "../../utils/setEmoji";
import { DuelistItemModel } from "./DuelistItemModel";
import { ConfirmModal } from "../../components/ConfirmModal";

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
  const {
    personagem,
    handleMatch,
    isPerdedor,
    hasVencedor,
    isMatchReady,
    isCampeao,
    rankingNacional,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    hasTitulo,
  } = DuelistItemModel({ duelista, match, torneio });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmAction = () => {
    handleMatch(); // ação real
    closeModal();
  };

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

export default DuelistItem;
