import { Helmet } from "react-helmet-async";
import PersonagemCard from "../features/personagem-card/PersonagemCard";
import TorneioCard from "../features/torneio-card/TorneioCard";
import TorneioOverviewSection from "../features/torneio-overview/TorneioOverviewSection";
import React from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet>
        <title>Yugioh | Project</title>
        <meta
          name="description"
          content="Página Inicial do Torneios, contendo informações gerais dos torneios e personagens"
        />
      </Helmet>
      <main className="text-orange-500 font-sans mx-auto py-4 px-4 sm:px-8 md:px-16">
        <section className="md:grid md:grid-cols-2 gap-8 mb-8">
          {isReady ? (
            <>
              <TorneioCard />
              <PersonagemCard />
            </>
          ) : (
            <Loading />
          )}
        </section>
        <TorneioOverviewSection />
      </main>
    </>
  );
};

export default Home;
