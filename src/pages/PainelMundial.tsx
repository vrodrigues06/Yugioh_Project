import { motion } from "framer-motion";
import React from "react";
import { Helmet } from "react-helmet-async";
import PainelMundialModel from "./PainelMundial.model";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { Link } from "react-router";
import GerarMundial from "../features/mundial-chaves/GerarMundial";
import Indisponivel from "../features/mundial-chaves/Indisponivel";
import MundialEmAndamento from "../features/mundial-detalhes/MundialEmAndamento";
import useMedia from "../hooks/useMedia"; // <-- importe seu hook

const PainelMundial = () => {
  const isMobile = useMedia("(max-width: 500px)"); // <-- verifica se é mobile
  const { isLoading, podeCriar, mundiaisEmAndamento, participantes } =
    PainelMundialModel();

  if (isLoading) return <Loading />;

  // Se for mobile, exibe a mensagem e não renderiza o restante
  if (isMobile) {
    return (
      <section className="flex flex-col items-center justify-center h-screen bg-black text-center px-4">
        <h1 className="text-2xl sm:text-3xl text-white font-bold mb-4">
          Acesso não permitido no mobile
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mb-6">
          Este conteúdo está disponível apenas para desktop.
          <br />
          Por favor, acesse em um computador para continuar.
        </p>
      </section>
    );
  }

  // Conteúdo normal para desktop
  return (
    <>
      <Helmet>
        <title>Yugioh | Painel Mundial</title>
        <meta
          name="description"
          content="Página responsável por gerenciar os torneios"
        />
      </Helmet>
      <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
        <h1 className="text-lg sm:text-2xl text-white font-bold mb-1">
          Painel de Torneios Mundiais
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-16">
          Gerencie os torneios mundiais desde a sua concepção e desfecho final!.
        </p>
        {podeCriar.liberado ? (
          <GerarMundial ano={podeCriar.ano} participantes={participantes} />
        ) : (
          <Indisponivel />
        )}
        <MundialEmAndamento mundiaisEmAndamento={mundiaisEmAndamento} />
      </section>
    </>
  );
};

export default PainelMundial;
