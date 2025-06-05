import { Colocacao } from "../../@types/personagem";
import { setEmoji } from "../../utils/setEmoji";

interface IPersonagemCardTitulos {
  melhoresColocacoes: Colocacao[] | undefined;
  melhoresColocacoesMundial: Colocacao[] | undefined;
  geracao: string;
}

const PersonagemCardTitulos = ({
  melhoresColocacoes,
  geracao,
  melhoresColocacoesMundial,
}: IPersonagemCardTitulos) => {
  return (
    <div>
      <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
        <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
        Titulos
      </p>
      {melhoresColocacoes?.length ? (
        <div className="text-xs sm:text-sm text-azul-150 grid gap-0.5 *:flex *:gap-1 *:items-center">
          {melhoresColocacoesMundial?.length
            ? melhoresColocacoesMundial.map((colocacao) => {
                return (
                  <span key={colocacao.ano} className="font-bold">
                    {setEmoji(colocacao.classificacao)}
                    MUNDIAL {colocacao.ano}
                  </span>
                );
              })
            : ""}

          {melhoresColocacoes.map((colocacao) => {
            return (
              <span key={colocacao.ano}>
                {setEmoji(colocacao.classificacao)}
                {geracao.toUpperCase()} {colocacao.ano}
              </span>
            );
          })}
        </div>
      ) : (
        <span className="text-xs text-slate-600">Sem Titulos</span>
      )}
    </div>
  );
};

export default PersonagemCardTitulos;
