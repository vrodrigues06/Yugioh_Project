import { motion } from "framer-motion";
import React from "react";
import { Mundial } from "../../@types";
import { Link } from "react-router";

type MundialEmAndamentoProps = {
  mundiaisEmAndamento: Mundial[];
};

const MundialEmAndamento = ({
  mundiaisEmAndamento,
}: MundialEmAndamentoProps) => {
  return (
    <div className="  border-t border-sky-900 mt-20 pt-4">
      {mundiaisEmAndamento.length ? (
        <h3 className="text-slate-500 text-sm mb-4">Torneios em Andamento:</h3>
      ) : (
        ""
      )}
      <div className="flex gap-4">
        {mundiaisEmAndamento.map((t) => {
          return (
            <Link to={`${t.ano}`} key={t.nome}>
              <div className="text-white bg-azul-950  text-md p-2 flex gap-1.5 items-center shadow-2xl transition-all hover:scale-110 border border-transparent rounded-sm hover:border-orange-500">
                {" "}
                {t.nome}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MundialEmAndamento;
