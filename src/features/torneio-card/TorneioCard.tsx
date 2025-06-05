import { motion } from "framer-motion";
import TorneioCardPodium from "./TorneioCardPodium";
import { useTorneioCardModel } from "./TorneioCard.model";
import TorneioCardHeader from "./TorneioCardHeader";
import TorneioCardAnteriores from "./TorneioCardAnteriores";
import ButtonDetalhes from "../../components/ButtonDetalhes";
import Error from "../../components/Error";
import Loading from "../../components/LoadingMini";

const TorneioCard = () => {
  const { randomTorneio, torneiosAnteriores, error, isLoading } =
    useTorneioCardModel();

  if (randomTorneio === undefined) return;

  if (error) return <Error message={error} />;

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "linear" }}
      className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden transition-all hover:ring-1 duration-100 "
    >
      <TorneioCardHeader torneio={randomTorneio} />
      <div className="p-4 ">
        <div className="flex justify-between mb-4">
          <TorneioCardPodium randomTorneio={randomTorneio} />
          <ButtonDetalhes torneio={randomTorneio}>Ver Detalhes</ButtonDetalhes>
        </div>
        <TorneioCardAnteriores torneios={torneiosAnteriores} />
      </div>
    </motion.div>
  );
};

export default TorneioCard;
