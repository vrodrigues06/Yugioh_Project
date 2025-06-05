import React from "react";
import { usePersonagemByName } from "../../hooks/usePersonagemByName";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const MundialParticipantesItem = ({
  nome,
  selecionado = true,
}: {
  nome: string;
  selecionado?: boolean;
}) => {
  const { data: personagem, isLoading, error } = usePersonagemByName(nome);

  if (isLoading) return <Loading />;

  if (error) return <Error message={error.message} />;

  if (!personagem)
    return (
      <div className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 mb-3">
        Personagem não encontrado
      </div>
    );

  return (
    <div
      className={`
        text-xs p-1.5 py-2 flex gap-1.5 items-center transition-all 
        bg-azul-950 text-white mb-2 border border-sky-300/70 rounded-md
        ${!selecionado ? "opacity-40 grayscale" : ""}
      `}
    >
      <div
        className={`
          size-8 rounded-full bg-cover bg-top border border-white transition-all
          ${!selecionado ? "opacity-40 grayscale" : ""}
        `}
        style={{ backgroundImage: `url(${personagem?.perfil})` }}
      ></div>

      <div className="grid gap-0.5">
        <h1>
          {personagem.nome}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold">
            {" "}
            ({personagem.geracao.toUpperCase()}){" "}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default MundialParticipantesItem;
