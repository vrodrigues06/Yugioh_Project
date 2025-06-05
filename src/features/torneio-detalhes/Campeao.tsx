import { FaCrown } from "react-icons/fa";
import { Personagem } from "../../@types/personagem";
import Perfil from "../../components/Perfil";
import useRankingByYear from "../../hooks/useRankingByYear";
import { Link } from "react-router";

const Campeao = ({
  campeao,
  ano,
  geracao,
}: {
  campeao: Personagem;
  ano: number;
  geracao: string;
}) => {
  const { data: ranking, error, isLoading } = useRankingByYear(ano, geracao);

  if (!ranking) return;

  const pontos = ranking.ranking.find((p) => p.nome === campeao.nome);

  return (
    <Link
      className="group"
      to={`/personagens/${campeao.geracao}/${campeao.id}`}
    >
      <div className="group-hover:border-orange-500 transition-all group-hover:scale-105 bg-gradient-to-r from-slate-900 to-slate-800 p-2 sm:p-4 rounded-md flex gap-2 items-center border border-sky-500">
        <div className="relative">
          <Perfil personagem={campeao} size="16" />
          <FaCrown className="absolute text-orange-500 right-0 -top-0.5" />
        </div>
        <div className="w-full text-sm sm:text-md">
          <div className="flex flex-col xs:flex-row xs:justify-between flex-wrap xs:items-center ">
            <h4> Campeão: {campeao?.nome}</h4>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300">
              {pontos?.pontos}Pts
            </span>
          </div>
          <span className="text-slate-400">Deck: {campeao?.deckName}</span>
        </div>
      </div>
    </Link>
  );
};

export default Campeao;
