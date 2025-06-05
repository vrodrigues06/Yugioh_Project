import { Colocacao, Personagem } from "../../@types/personagem";
import ButtonDetalhes from "../../components/ButtonDetalhes";
import { setEmoji } from "../../utils/setEmoji";

interface IPersonagenCardHistorico {
  personagem: Personagem;
  colocacoesAnteriores: Colocacao[];
  hasButton?: boolean;
}

const PersonagemCardHistorico = ({
  personagem,
  colocacoesAnteriores,
  hasButton = true,
}: IPersonagenCardHistorico) => {
  return (
    <div className="order-10 xs:order-0 row-span-2">
      <div className="mb-4">
        <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
          <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
          Histórico Anterior
        </p>
        {colocacoesAnteriores.length ? (
          <div className="bg-azul-800 rounded-md p-2 text-xs text-slate-400">
            {colocacoesAnteriores.map((colocacao) => {
              const mundial = personagem.colocacoes_mundial?.find(
                (m) => m.ano === colocacao.ano,
              );

              return (
                <div key={colocacao.ano} className="mb-2">
                  <span className="text-orange-500 block mb-0.5">
                    ({colocacao.ano})
                  </span>
                  {mundial && (
                    <span className="flex gap-0.5 xs:gap-1 items-center">
                      {setEmoji(mundial.classificacao)} Mundial:{" "}
                      {mundial.classificacao}
                    </span>
                  )}

                  <span className="flex gap-0.5 xs:gap-1 items-center">
                    {setEmoji(colocacao.classificacao)}{" "}
                    {personagem.geracao[0].toUpperCase() +
                      personagem.geracao.slice(1)}
                    : {colocacao.classificacao}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <span className="text-xs text-slate-600">Sem Histórico anterior</span>
        )}
      </div>
      {hasButton ? (
        <ButtonDetalhes personagem={personagem}>Ver Detalhes</ButtonDetalhes>
      ) : (
        ""
      )}
    </div>
  );
};

export default PersonagemCardHistorico;
