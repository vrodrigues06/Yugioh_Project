import { Match, Torneio } from "../../@types";
import BracketLine from "./BracketLine";
import ReversedBracketLine from "./ReversedBracketLine";
import DuelistItem from "./DuelistItem";

interface MatchProps {
  matchs: Match[];
  roundIdx: number;
  torneio: Torneio;
}

export default function MatchPreliminarDupla({
  matchs,
  roundIdx,
  torneio,
}: MatchProps) {
  const match1 = matchs[0];

  const { duelista1, duelista2 } = match1;

  const match2 = matchs[1];

  const { duelista1: duelista3, duelista2: duelista4 } = match2;

  const campeao = torneio.podium.find(
    (item) => item.classificacao === "Campeao",
  )?.nome;

  const isDuelista1Campeao = duelista1 === campeao;
  const isDuelista2Campeao = duelista2 === campeao;
  const isDuelista3Campeao = duelista3 === campeao;
  const isDuelista4Campeao = duelista4 === campeao;

  const isMatchDoCampeao =
    isDuelista1Campeao ||
    isDuelista2Campeao ||
    isDuelista3Campeao ||
    isDuelista4Campeao;

  const corLinha = isMatchDoCampeao ? "#f97316" : "#fef3c7"; // Laranja para destaque

  return (
    <>
      <div className="flex flex-col justify-center gap-0.5 absolute select-none right-130 -top-[60px]">
        <DuelistItem
          match={match1}
          duelista={duelista1}
          identificador="1"
          torneio={torneio}
        />
        <DuelistItem
          match={match1}
          duelista={duelista2}
          identificador="2"
          torneio={torneio}
        />
        <span className="absolute top-1/2 -left-6 -translate-y-1/2 text-xs text-slate-500">
          {match1.numero_partida}
        </span>

        <BracketLine
          roundIdx={roundIdx}
          preliminarDupla={true}
          color={corLinha}
        />
      </div>
      <div className="flex flex-col justify-center gap-0.5 absolute select-none right-130 top-[53px]">
        <DuelistItem
          match={match2}
          duelista={duelista3}
          identificador="1"
          torneio={torneio}
        />
        <DuelistItem
          match={match2}
          duelista={duelista4}
          identificador="2"
          torneio={torneio}
        />
        <span className="absolute top-1/2 -left-6 -translate-y-1/2 text-xs text-slate-500">
          {match2.numero_partida}
        </span>

        <ReversedBracketLine
          roundIdx={roundIdx}
          preliminarDupla={true}
          color={corLinha}
        />
      </div>
    </>
  );
}
