import { Match, Torneio } from "../../@types";
import BracketLine from "./BracketLine";
import ReversedBracketLine from "./ReversedBracketLine";
import DuelistItem from "./DuelistItem";

interface MatchProps {
  duelista1: string | null;
  duelista2: string | null;
  match: Match;
  index: number;
  torneio: Torneio;
  roundIdx: number;
}

export default function MatchPreliminar({
  duelista1,
  duelista2,
  match,
  index,
  torneio,
  roundIdx,
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
    <div className="flex flex-col justify-center gap-0.5 absolute select-none right-63 top-[53px]">
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

      <ReversedBracketLine roundIdx={roundIdx} color={corLinha} />
    </div>
  );
}
