import React from "react";
import { Helmet } from "react-helmet-async";
import { geracoes } from "../utils/global";
import { usePersonagemStore } from "../store/usePersonagemStore";
import { Link } from "react-router";
import { GiWizardFace } from "react-icons/gi";
import { motion } from "framer-motion";
import Error from "../components/Error";
import Loading from "../components/Loading";

const Personagens = () => {
  const personagensStore = usePersonagemStore(
    (state) => state.personagensStore,
  );
  const fetchAllPersonagens = usePersonagemStore(
    (state) => state.fetchAllPersonagens,
  );

  const { error, isLoading } = usePersonagemStore();

  React.useEffect(() => {
    fetchAllPersonagens();
  }, []);

  if (error) return <Error message={error} />;

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Yugioh | Personagens</title>
        <meta
          name="description"
          content="Página contendo os detalhes de cada Personagem"
        />
      </Helmet>
      <section className="container font-sans  py-4 px-4 sm:px-8 md:px-16 mx-auto">
        <h1 className="text-lg sm:text-2xl text-white font-bold mb-1">
          Geração de Personagens
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-16">
          Explore os mais poderosos duelistas de diferentes gerações dos
          torneios e seus feitos.
        </p>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {geracoes.map((gen) => {
            const countPersonagensByGeracao = personagensStore.filter(
              (t) => t.geracao === gen,
            );

            return (
              <Link key={gen} className="group" to={`/personagens/${gen}`}>
                <div className=" flex items-end relative h-36 rounded-lg p-2 pb-3 sm:p-4  shadow-lg sm:h-48 transition-all border border-transparent group-hover:border-orange-500 ">
                  <div
                    className="absolute inset-0 rounded-lg -z-10 "
                    style={{
                      backgroundImage: `url('./torneios/torneio-${gen}.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black opacity-80 rounded-lg -z-5  "></div>

                  <div>
                    <h3 className="text-white font-bold">
                      {gen.toUpperCase()}
                    </h3>
                    <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent text-sm flex items-center gap-1">
                      <GiWizardFace className="text-orange-500" />
                      {countPersonagensByGeracao.length <= 1
                        ? `${countPersonagensByGeracao.length} Duelista`
                        : `${countPersonagensByGeracao.length} Duelistas`}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </section>
    </>
  );
};

export default Personagens;
