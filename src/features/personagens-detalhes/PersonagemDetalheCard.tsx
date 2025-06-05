import { motion } from "framer-motion";
import React from "react";
import PersonagemCardTitulos from "../personagem-card/PersonagemCardTitulos";
import PersonagemCardHistorico from "../personagem-card/PersonagemCardHistorico";
import PersonagemCardRanking from "../personagem-card/PersonagemCardRanking";
import { Personagem } from "../../@types/personagem";
import { findRankingIndex, setMelhoresColocacoes } from "../../utils/global";
import { useRankingStore } from "../../store/useRankingStore";
import PersonagemCardHeader from "../personagem-card/PersonagemCardHeader";
import PersonagemDetalhesRanking from "./PersonagemDetalhesRanking";

interface IPersonagemDetalheCard {
  personagem: Personagem;
}

const PersonagemDetalheCard = ({ personagem }: IPersonagemDetalheCard) => {
  const { rankings, fetchRanking } = useRankingStore();

  React.useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  const melhoresColocacoes = setMelhoresColocacoes(personagem);
  const melhoresColocacoesMundial = setMelhoresColocacoes(personagem, true);

  const colocacoesAnteriores = personagem.colocacoes.sort((a, b) => {
    return b.ano - a.ano;
  });

  if (Object.keys(rankings).length === 0) return;

  const rankingMundial = findRankingIndex(
    personagem.nome,
    personagem.geracao,
    rankings,
    true,
  );
  const rankingNacional = findRankingIndex(
    personagem.nome,
    personagem.geracao,
    rankings,
  );
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "linear", delay: 0.2 }}
      className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden transition-all hover:ring-1 duration-100"
    >
      <PersonagemCardHeader personagem={personagem} />
      <div className="p-4 ">
        <div className="grid xs:grid-cols-2 gap-y-6 mb-8">
          <PersonagemCardTitulos
            melhoresColocacoes={melhoresColocacoes}
            melhoresColocacoesMundial={melhoresColocacoesMundial}
            geracao={personagem.geracao}
          />
          <PersonagemDetalhesRanking
            rankingMundial={rankingMundial}
            rankingNacional={rankingNacional}
            personagem={personagem}
          />
        </div>
        <PersonagemCardHistorico
          personagem={personagem}
          colocacoesAnteriores={colocacoesAnteriores}
          hasButton={false}
        />
      </div>
    </motion.div>
  );
};

export default PersonagemDetalheCard;
