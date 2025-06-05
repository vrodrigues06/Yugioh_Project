import { motion } from "framer-motion";
import React from "react";
import { Mundial, Torneio } from "../../@types";
import Loading from "../../components/Loading";
import { usePersonagemStore } from "../../store/usePersonagemStore";
import Campeao from "./Campeao";
import OutrasColocacoes from "./OutrasColocacoes";
import PodiumItem from "./PodiumItem";
import Vice from "./Vice";

const TorneioResultados = <T extends Torneio | Mundial>({
  torneio,
  ano,
}: {
  torneio: T;
  ano: number;
}) => {
  const personagensStore = usePersonagemStore(
    (state) => state.personagensStore,
  );
  const fetchAllPersonagens = usePersonagemStore(
    (state) => state.fetchAllPersonagens,
  );
  const loading = usePersonagemStore((state) => state.isLoading);

  React.useEffect(() => {
    fetchAllPersonagens();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const campeao = personagensStore.find(
    (personagem) => torneio.podium[0]?.nome === personagem.nome,
  );

  const vice = personagensStore.find(
    (personagem) => torneio.podium[1]?.nome === personagem.nome,
  );

  const terceiro = personagensStore.find(
    (personagem) => torneio.podium[2]?.nome === personagem.nome,
  );

  const quarto = personagensStore.find(
    (personagem) => torneio.podium[3]?.nome === personagem.nome,
  );

  if (!campeao || !vice || !terceiro || !quarto) return;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-azul-950 rounded-md p-4 shadow text-white"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold uppercase self-start relative">
          <span className="w-8 h-px -bottom-0 absolute bg-gradient-to-b from-orange-800 to-orange-300 "></span>
          Podium{" "}
        </h3>
        <div className="flex sm:flex-col gap-1 sm:gap-0 items-center sm:p-3 sm:shadow sm:rounded-sm sm:border sm:border-sky-900 text-slate-400">
          <span className="font-bold text-orange-500">
            {torneio.classificacao.length}
          </span>
          <span className="">Duelistas</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Campeao campeao={campeao} ano={ano} geracao={campeao.geracao} />
        <Vice duelista={vice} ano={ano} geracao={vice.geracao} />
        <PodiumItem
          duelista={terceiro}
          ano={ano}
          geracao={terceiro.geracao}
          posicao="Terceiro"
        />
        <PodiumItem
          duelista={quarto}
          ano={ano}
          geracao={quarto.geracao}
          posicao="Quarto"
        />
        <OutrasColocacoes torneio={torneio} />
      </div>
    </motion.div>
  );
};

export default TorneioResultados;
