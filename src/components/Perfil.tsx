import React from "react";
import { Personagem } from "../@types/personagem";
import useMedia from "../hooks/useMedia";

interface IPerfil {
  personagem: Personagem;
  size: "8" | "10" | "12" | "16" | "32" | "64";
}

const Perfil = ({ personagem, size }: IPerfil) => {
  const match = useMedia("(max-width: 500px)");

  // Calculando o tamanho dinamicamente
  const smallSize = Number(size) * 3;
  const defaultSize = Number(size) * 4;

  return (
    <div
      className={`rounded-full bg-cover bg-top border-2 transition-all border-blue-950 group-hover:border-orange-500`}
      style={{
        width: match ? `${smallSize}px` : `${defaultSize}px`,
        height: match ? `${smallSize}px` : `${defaultSize}px`,
        backgroundImage: `url(${personagem.perfil})`,
      }}
    ></div>
  );
};

export default Perfil;
