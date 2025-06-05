import { motion } from "framer-motion";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Select from "../components/Select";
import { geracoes } from "../utils/global";
import usePersonagens from "../hooks/usePersonagens";
import LoadingMini from "../components/LoadingMini";
import Button from "../components/Button";
import { Link } from "react-router";
import Loading from "../components/Loading";
import PainelTorneioModel from "./PainelTorneio.model";
import useMedia from "../hooks/useMedia"; // <-- Importa o hook

const PainelTorneio = () => {
  const isMobile = useMedia("(max-width: 768px)"); // <-- Verifica se é mobile

  const {
    register,
    errors,
    handleSubmit,
    onGerarTorneio,
    nomeInput,
    personagens,
    isLoading,
    isLoadingTorneios,
    anos,
    torneiosEmAndamento,
  } = PainelTorneioModel();

  if (isLoadingTorneios && isLoading) return <Loading />;

  // 🚫 Bloqueia mobile
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

  // ✅ Conteúdo normal para desktop
  return (
    <>
      <Helmet>
        <title>Yugioh | Painel Torneio</title>
        <meta
          name="description"
          content="Página responsável por gerenciar os torneios"
        />
      </Helmet>
      <section className="font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
        <h1 className="text-lg sm:text-2xl text-white font-bold mb-1">
          Painel de Torneios Nacionais
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-8">
          Gerencie os torneios desde a sua concepção e desfecho final!.
        </p>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2"
        >
          <form onSubmit={handleSubmit(onGerarTorneio)}>
            <div className="mb-2 text-md xs:text-lg text-orange-500 font-semibold">
              <h3 className="text-slate-500 text-sm">
                Selecione o Torneio:{" "}
                <span className="text-md xs:text-lg text-azul-700 font-semibold">
                  {nomeInput}
                </span>
              </h3>
            </div>
            <div className="flex mb-1 gap-4 border-t border-sky-900 pt-4">
              <Select
                options={geracoes}
                label="Geração"
                id="geracao"
                register={register}
                errors={errors}
                errorMessage={errors.geracao?.message as string}
              />
              <Select
                options={anos}
                label="Ano"
                id="ano"
                register={register}
                errors={errors}
                errorMessage={errors.ano?.message as string}
              />
            </div>

            {personagens.length > 0 && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-10"
              >
                <h3 className="text-md sm:text-lg text-sky-200 mb-1">
                  Nº de Duelistas:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold">
                    {personagens.length}
                  </span>
                </h3>
              </motion.div>
            )}

            {personagens.length > 0 && (
              <Button disabled={false}>Gerar Torneio</Button>
            )}
          </form>
        </motion.div>

        <div className="border-t border-sky-900 mt-2 pt-4">
          {torneiosEmAndamento.length > 0 && (
            <h3 className="text-slate-500 text-sm mb-4">
              Torneios em Andamento:
            </h3>
          )}
          <div className="flex gap-4">
            {torneiosEmAndamento.map((t) => (
              <Link to={`/torneios/painel-torneio/${t.nome}`} key={t.nome}>
                <div className="text-white bg-azul-950 text-md p-2 flex gap-1.5 items-center shadow-2xl transition-all hover:scale-110 border border-transparent rounded-sm hover:border-orange-500">
                  {t.nome}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PainelTorneio;
