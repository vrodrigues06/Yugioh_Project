import { FaMap } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

interface IPersonagemCardRanking {
  rankingMundial: number | null;
  rankingNacional: number | null;
  geracao: string;
}

const PersonagemCardRanking = ({
  rankingMundial,
  rankingNacional,
  geracao,
}: IPersonagemCardRanking) => {
  if (!rankingMundial) return;
  if (!rankingNacional) return;

  return (
    <div className="self-start">
      <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
        <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
        Rankings
      </p>
      <div className="text-xs sm:text-sm text-azul-150 grid gap-1">
        {rankingMundial > 0 && (
          <span className="flex items-center gap-0.5 xs:gap-1">
            {" "}
            <TbWorld className="text-orange-500 text-lg" /> Mundial: #
            {rankingMundial}
          </span>
        )}
        <span className="flex items-center gap-1 xs:gap-1.5">
          <FaMap className="text-orange-500 text-lg" />
          {geracao.toUpperCase()}: #{rankingNacional}
        </span>
      </div>
    </div>
  );
};

export default PersonagemCardRanking;
