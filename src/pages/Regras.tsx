import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router";
import RegraConteudo from "../features/regras/RegraConteudo";
import RegrasNav from "../features/regras/RegrasNav";

const Regras = () => {
  return (
    <>
      <Helmet>
        <title>Yugioh | Regras</title>
        <meta
          name="description"
          content="Página com as regras dos torneios e decks."
        />
      </Helmet>
      <section className="container font-sans  py-4 px-4 sm:px-8 md:px-16 mx-auto">
        <div className="grid gap-4 sm:grid-cols-[0.5fr_1.5fr]">
          <RegrasNav />
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <p className="bg-azul-800 p-4 rounded-md text-white text-xs xs:text-sm">
                      Selecione um tópico para ver as regras.
                    </p>
                  </motion.div>
                }
              />
              <Route path=":categoria" element={<RegraConteudo />} />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
};

export default Regras;
