import { motion } from "framer-motion";
import { usePersonagemCardModel } from "./PersonagemCardModel";
import PersonagemCardHeader from "./PersonagemCardHeader";
import PersonagemCardTitulos from "./PersonagemCardTitulos";
import PersonagemCardRanking from "./PersonagemCardRanking";
import PersonagemCardHistorico from "./PersonagemCardHistorico";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

const PersonagemCard = () => {
  const {
    randomPersonagem: personagem,
    colocacoesAnteriores,
    melhoresColocacoes,
    melhoresColocacoesMundial,
    rankingMundial,
    rankingNacional,
    error: errorPersonagem,
    errorRanking,
    isLoading,
    isLoadingRanking,
  } = usePersonagemCardModel();

  if (!personagem) return;

  const error = errorPersonagem || errorRanking;

  if (error) return <Error message={error} />;

  const loading = isLoading || isLoadingRanking;

  if (loading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "linear", delay: 0.2 }}
      className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden transition-all hover:ring-1 duration-100"
    >
      <PersonagemCardHeader personagem={personagem} />
      <div className="p-4 ">
        <div className="grid xs:grid-cols-2 gap-y-6">
          <PersonagemCardTitulos
            melhoresColocacoes={melhoresColocacoes}
            melhoresColocacoesMundial={melhoresColocacoesMundial}
            geracao={personagem.geracao}
          />
          <PersonagemCardHistorico
            personagem={personagem}
            colocacoesAnteriores={colocacoesAnteriores}
          />

          <PersonagemCardRanking
            rankingMundial={rankingMundial}
            rankingNacional={rankingNacional}
            geracao={personagem.geracao}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PersonagemCard;
