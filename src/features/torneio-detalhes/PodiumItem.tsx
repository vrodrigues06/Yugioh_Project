import React from "react";
import { Personagem } from "../../@types/personagem";
import Perfil from "../../components/Perfil";
import useRankingByYear from "../../hooks/useRankingByYear";
import { Link } from "react-router";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

interface IPodiumItem {
  posicao: string;
  ano: number;
  geracao: string;
  duelista: Personagem;
}

const PodiumItem = ({ ano, geracao, posicao, duelista }: IPodiumItem) => {
  const { data: ranking, error, isLoading } = useRankingByYear(ano, geracao);

  const pontos = React.useMemo(() => {
    return ranking?.ranking.find((p) => p.nome === duelista.nome);
  }, [ranking, duelista.nome]);

  if (error) return <Error message={error} />;
  if (isLoading) return <Loading />;

  if (!ranking) return;

  return (
    <Link
      className="group"
      to={`/personagens/${duelista.geracao}/${duelista.id}`}
    >
      <div className=" group-hover:border-orange-500 transition-all  bg-azul-950 p-2 sm:p-4 rounded-md flex gap-2 items-center border border-sky-300">
        <div className="relative">
          <Perfil personagem={duelista} size="16" />
        </div>
        <div className="w-full text-sm sm:text-md">
          <div className="flex flex-col xs:flex-row xs:justify-between flex-wrap xs:items-center ">
            <h4>
              {" "}
              {posicao}: {duelista?.nome}
            </h4>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300">
              {pontos?.pontos}Pts
            </span>
          </div>
          <span className="text-slate-400">Deck: {duelista?.deckName}</span>
        </div>
      </div>
    </Link>
  );
};

export default PodiumItem;
