import React from "react";

const getRoundName = (roundIdx: number, totalRounds: number) => {
  const distanceFromFinal = totalRounds - roundIdx - 1;

  if (distanceFromFinal === 0) return "Final";
  if (distanceFromFinal === 1) return "Semifinal";
  if (distanceFromFinal === 2) return "Quartas ";
  if (distanceFromFinal === 3) return "Oitavas ";
  if (distanceFromFinal === 4) return "16 avos ";
  if (distanceFromFinal === 5) return "32 avos ";

  return `Round ${roundIdx + 1}`;
};

const getTopPosition = (roundIdx: number, totalRounds: number) => {
  const baseTop = -40; // Começa em -40px nas fases iniciais
  const increment = 50; // Incrementa 40px a cada rodada mais próxima da final

  const top = baseTop + roundIdx * increment;

  return `${top}px`;
};

const Identificador = ({
  roundIdx,
  totalRounds,
}: {
  roundIdx: number;
  totalRounds: number;
}) => {
  const roundName = getRoundName(roundIdx, totalRounds);
  const topPosition = getTopPosition(roundIdx, totalRounds);

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 px-4 py-1 rounded-2xl 
                 bg-white/10 backdrop-blur-md shadow-md border border-white/20 
                 text-sky-300 text-sm font-semibold"
      style={{ top: topPosition }}
    >
      {roundName}
    </div>
  );
};

export default Identificador;
