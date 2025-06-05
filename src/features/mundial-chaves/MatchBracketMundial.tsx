import { Match, Mundial, Torneio } from "../../@types";
import BracketLine from "../torneios-chaves/BracketLine";
import DuelistItem from "../torneios-chaves/DuelistItem";
import ReversedBracketLine from "../torneios-chaves/ReversedBracketLine";
import DuelistItemMundial from "./DuelistItemMundial";

interface MatchProps {
  duelista1: string | null;
  duelista2: string | null;
  match: Match;
  index: number;
  roundIdx: number;
  isFinal: boolean;
  torneio: Mundial;
}

export default function MatchBracketMundial({
  duelista1,
  duelista2,
  match,
  index,
  roundIdx,
  isFinal,
  torneio,
}: MatchProps) {
  const isEven = index % 2 === 0;

  const campeao = torneio.podium.find(
    (item) => item.classificacao === "Campeao",
  )?.nome;

  const isDuelista1Campeao = duelista1 === campeao;
  const isDuelista2Campeao = duelista2 === campeao;
  const isMatchDoCampeao = isDuelista1Campeao || isDuelista2Campeao;
  const corLinha = isMatchDoCampeao ? "#f97316" : "#fef3c7"; // laranja forte ou padrão amber-50

  return (
    <div className="flex flex-col justify-center gap-0.5 relative select-none">
      <DuelistItemMundial
        match={match}
        duelista={duelista1}
        identificador="1"
        torneio={torneio}
      />
      <DuelistItemMundial
        match={match}
        duelista={duelista2}
        identificador="2"
        torneio={torneio}
      />
      <span className="absolute top-1/2 -left-6 -translate-y-1/2 text-xs text-slate-500">
        {match.numero_partida}
      </span>

      {!isFinal &&
        (isEven ? (
          <BracketLine roundIdx={roundIdx} color={corLinha} />
        ) : (
          <ReversedBracketLine roundIdx={roundIdx} color={corLinha} />
        ))}
    </div>
  );
}
