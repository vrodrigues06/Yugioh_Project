import { Match, Torneio } from "../../@types";
import BracketLine from "./BracketLine";
import ReversedBracketLine from "./ReversedBracketLine";
import DuelistItem from "./DuelistItem";

interface MatchProps {
  duelista1: string | null;
  duelista2: string | null;
  match: Match;
  index: number;
  roundIdx: number;
  isFinal: boolean;
  torneio: Torneio;
}

export default function MatchTerceiro({
  duelista1,
  duelista2,
  match,
  index,
  roundIdx,
  torneio,
  isFinal,
}: MatchProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="flex flex-col justify-center gap-0.5 absolute bottom-57">
      <DuelistItem
        match={match}
        duelista={duelista1}
        identificador="1"
        torneio={torneio}
      />
      <DuelistItem
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
          <BracketLine roundIdx={roundIdx} />
        ) : (
          <ReversedBracketLine roundIdx={roundIdx} />
        ))}
    </div>
  );
}
