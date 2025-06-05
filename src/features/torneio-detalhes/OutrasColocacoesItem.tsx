import React from "react";
import { Classificacao } from "../../@types";
import Perfil from "../../components/Perfil";
import useRankingByYear from "../../hooks/useRankingByYear";
import { usePersonagemStore } from "../../store/usePersonagemStore";
import { Link } from "react-router";

interface IOutrasColocacoesItem {
  colocacao: Classificacao;
  ano: number;
  geracao: string;
}

const OutrasColocacoesItem = ({
  colocacao,
  ano,
  geracao,
}: IOutrasColocacoesItem) => {
  const { nome } = colocacao;
  const personagensStore = usePersonagemStore(
    (state) => state.personagensStore,
  );
  const fetchAllPersonagens = usePersonagemStore(
    (state) => state.fetchAllPersonagens,
  );
  const { data: ranking } = useRankingByYear(ano, geracao);

  React.useEffect(() => {
    if (personagensStore.length === 0) {
      fetchAllPersonagens();
    }
  }, [personagensStore, fetchAllPersonagens]);

  const personagem = React.useMemo(() => {
    return personagensStore.find((p) => p.nome === nome);
  }, [personagensStore, nome]);

  if (!personagem) return null;

  const pontos = ranking?.ranking.find((c) => c.nome === nome);

  return (
    <Link
      className="group mb-2"
      to={`/personagens/${personagem.geracao}/${personagem.id}`}
    >
      <div className="group-hover:border-orange-500 transition-all group-hover:scale-105 border border-transparent  bg-blue-950 p-2 rounded-sm flex items-start gap-1">
        <Perfil personagem={personagem} size="12" />
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-md">
            <h4>{nome}</h4>
            <span className="bg-clip-text bg-gradient-to-b from-slate-600 to-slate-300 text-transparent ">
              {pontos?.pontos}Pts
            </span>
          </div>
          <span className="text-slate-400 text-xs sm:text-sm">
            Deck: {personagem.deckName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OutrasColocacoesItem;
