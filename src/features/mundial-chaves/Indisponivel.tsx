import { motion } from "framer-motion";
import React from "react";

const Indisponivel = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-6 text-center text-white shadow-lg backdrop-blur"
    >
      <h2 className="text-xl font-semibold">
        Nenhum Torneio Mundial disponível para gerar no momento
      </h2>
      <p className="text-sm text-white/70">
        Assim que todos os Torneios Nacionais Finalizarem o Mundial estará
        disponível.
      </p>
    </motion.div>
  );
};

export default Indisponivel;
