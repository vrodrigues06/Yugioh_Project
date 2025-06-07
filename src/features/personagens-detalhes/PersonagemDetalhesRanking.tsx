import { FaMap } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { Personagem } from "../../@types/personagem";
import { calcularColocacoes } from "../../utils/global";
import { setColor } from "../../utils/setColor";

interface IPersonagemDetalhesRanking {
  rankingMundial: number | null;
  rankingNacional: number | null;
  personagem: Personagem;
}

const PersonagemDetalhesRanking = ({
  rankingMundial,
  rankingNacional,
  personagem,
}: IPersonagemDetalhesRanking) => {
  const { titulos, vices, vezesPodium, terceiro, quarto, vezesFinal } =
    calcularColocacoes(personagem.colocacoes);

  const {
    titulos: titulosMundial,
    vices: vicesMundial,
    vezesPodium: vezesPodiumMundial,
    terceiro: terceiroMundial,
    quarto: quartoMundial,
    vezesFinal: vezesFinalMundial,
  } = calcularColocacoes(personagem.colocacoes_mundial);

  if (!rankingNacional) return;

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
          <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
          Rankings
        </p>
        <div className="text-xs sm:text-sm text-azul-150 grid gap-1">
          {rankingMundial != null && rankingMundial > 0 && (
            <span className="flex items-center gap-0.5 xs:gap-1">
              {" "}
              <TbWorld className="text-orange-500 text-lg" /> Mundial: #
              {rankingMundial}
            </span>
          )}
          <span className="flex items-center gap-1 xs:gap-1.5">
            <FaMap className="text-orange-500 text-lg" />
            {personagem.geracao.toUpperCase()}: #{rankingNacional}
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
          <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
          Estatísticas
        </p>
        <div className="text-xs sm:text-sm text-azul-150">
          <div className="mb-2 border-b border-sky-900 pb-2">
            <h3 className="text-orange-500 font-semibold mb-1">
              {personagem.geracao.toUpperCase()}
            </h3>

            <p>Vezes na Final #{setColor(vezesFinal)}</p>
            <p>Titulos #{setColor(titulos)}</p>
            <p>Vices #{setColor(vices)}</p>
            <p>Vezes no Podium #{setColor(vezesPodium)}</p>
            <p>Terceiro #{setColor(terceiro)}</p>
            <p>Quarto #{setColor(quarto)}</p>
          </div>
          <div>
            <h3 className="text-orange-500 font-semibold mb-1">Mundial</h3>
            <p>
              Vezes no Mundial #{setColor(personagem.participacoes_mundial)}
            </p>
            <p>Titulos Mundial #{setColor(titulosMundial)}</p>
            <p>Vices Mundial #{setColor(vicesMundial)}</p>
            <p>Vezes na Final Mundial #{setColor(vezesFinalMundial)}</p>
            <p>Vezes no Podium Mundial #{setColor(vezesPodiumMundial)}</p>
            <p>Terceiro Mundial #{setColor(terceiroMundial)}</p>
            <p>Quarto Mundial #{setColor(quartoMundial)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonagemDetalhesRanking;
