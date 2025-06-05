import { motion } from "framer-motion";
import React from "react";
import Button from "../../components/Button";
import MundialParticipantesItem from "./MundialParticipantesItem";
import { useGerarMundial } from "../../hooks/useGerarMundial";

export type ParticipantesI = {
  campeoes: string[];
  quartos: string[];
  restantesQuartas: string[];
  selecionadosQuartas: string[];
  terceiros: string[];
  vices: string[];
};

type GerarMundialProps = {
  ano: number | undefined;
  participantes: ParticipantesI | null | undefined;
};

const GerarMundial = ({ ano, participantes }: GerarMundialProps) => {
  const { onGerarMundial } = useGerarMundial({ participantes, ano });
  if (!onGerarMundial) return null;
  if (!ano) return null;
  if (!participantes) return null;

  const {
    campeoes,
    vices,
    terceiros,
    quartos,
    selecionadosQuartas,
    restantesQuartas,
  } = participantes;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        flex flex-col items-center justify-center gap-4
        rounded-2xl border border-white/20
        bg-white/10 p-6
        text-center text-white
        shadow-lg backdrop-blur-md
      "
    >
      <h2 className="text-xl font-bold">Participantes Mundial {ano}</h2>

      {/* Grid de colunas */}
      <div className="grid grid-cols-5 gap-6">
        {/* Coluna Campeões */}
        <div>
          <h3 className="font-semibold mb-2 text-yellow-400">Campeões 🥇</h3>
          {campeoes.map((nome) => (
            <MundialParticipantesItem nome={nome} key={nome} />
          ))}
        </div>

        {/* Coluna Vices */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-300">Vices 🥈</h3>
          {vices.map((nome) => (
            <MundialParticipantesItem nome={nome} key={nome} />
          ))}
        </div>

        {/* Coluna Terceiros */}
        <div>
          <h3 className="font-semibold mb-2 text-orange-300">Terceiros 🥉</h3>
          {terceiros.map((nome) => (
            <MundialParticipantesItem nome={nome} key={nome} />
          ))}
        </div>

        {/* Coluna Quartos */}
        <div>
          <h3 className="font-semibold mb-2 text-blue-300">Quartos 🎯</h3>
          {quartos.map((nome) => (
            <MundialParticipantesItem nome={nome} key={nome} />
          ))}
        </div>

        {/* Coluna Quartas */}
        <div>
          <h3 className="font-semibold mb-2 text-green-300">Quartas 🏹</h3>
          {/* Selecionados das quartas */}
          {selecionadosQuartas.map((nome) => (
            <MundialParticipantesItem nome={nome} key={nome} />
          ))}
          {/* Restantes das quartas */}
          {restantesQuartas.map((nome) => (
            <MundialParticipantesItem
              nome={nome}
              key={nome}
              selecionado={false}
            />
          ))}
        </div>
      </div>

      {/* Botão */}
      <Button
        onClick={onGerarMundial}
        disabled={false}
        className="px-6 py-3 font-semibold rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-300"
      >
        Gerar Mundial {ano}
      </Button>
    </motion.div>
  );
};

export default GerarMundial;
