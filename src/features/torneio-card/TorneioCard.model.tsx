import { useAllTorneios } from "../../hooks/useAllTorneios";

export const useTorneioCardModel = () => {
  const { data: torneios, isLoading, error } = useAllTorneios();
  if (!torneios) return {};

  const randomIndex = Math.floor(Math.random() * torneios.length);
  const randomTorneio = torneios[randomIndex];
  // const randomTorneio = torneios.find((t) => t.nome === "GX 2023");
  const torneiosAnteriores = torneios.filter((torneio) => {
    if (torneio.geracao === randomTorneio?.geracao) {
      if (
        torneio.ano === randomTorneio.ano - 2 ||
        torneio.ano === randomTorneio.ano - 1
      )
        return true;
    }
  });

  return { randomTorneio, torneiosAnteriores, error, isLoading };
};
