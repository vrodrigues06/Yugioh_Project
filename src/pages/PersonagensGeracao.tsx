import { motion } from "framer-motion";
import React from "react";
import { Link, useLocation } from "react-router";
import PersonagensGeracaoModel from "./PersonagensGeracao.model";
import useModal from "../hooks/useModal";
import Modal from "../components/modal";
import PersonagemForm from "../features/personagens-detalhes/PersonagemForm";
import { IoMdAdd } from "react-icons/io";
import PersonagemSectionList from "../features/personagem-overview/PersonagemSectionList";
import PersonagemDetalhe from "./PersonagemDetalhe";
import PersonagensListByGen from "../features/personagens-detalhes/PersonagensListByGen";
import { useAuth } from "../components/AuthContext";

const PersonagensGeracao = () => {
  const { status } = useAuth();
  const { geracao } = PersonagensGeracaoModel();
  const { handleToggleModal, open } = useModal();
  const location = useLocation();

  if (!geracao) return;
  const isPersonagemDetalhe = location.pathname.includes(
    `/personagens/${geracao}/`,
  );

  return (
    <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <div className="grid gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold text-2xl">
              {geracao?.toUpperCase()}
            </h1>
            <Link
              to="/personagens"
              className="text-orange-500 text-xs hover:underline justify-self-start"
            >
              🠔 Voltar para Gerações{" "}
            </Link>
          </div>
          {status !== "admin" ? (
            ""
          ) : (
            <button
              title="criar torneio"
              className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200"
              onClick={handleToggleModal}
            >
              <Modal handleToggleModal={handleToggleModal} isOpen={open}>
                <PersonagemForm />
              </Modal>
              <span className="flex items-center justify-center">
                <IoMdAdd className="text-orange-500 text-lg sm:text-2xl" />
              </span>
            </button>
          )}
        </motion.div>
        <div className="bg-azul-950 shadow rounded-md p-4">
          {isPersonagemDetalhe ? (
            <PersonagemDetalhe />
          ) : (
            <PersonagensListByGen geracao={geracao} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonagensGeracao;
