import { useQueryClient } from "@tanstack/react-query"; // ou react-query v3
import { Personagem } from "../../@types/personagem";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router";
import Perfil from "../../components/Perfil";
import { setEmoji } from "../../utils/setEmoji";
import React, { ButtonHTMLAttributes, ReactEventHandler } from "react";
import { changeUpdateNeed, getUpdateNeed } from "../../api/apiPersonagens";
import Modal from "../../components/modal";
import PersonagemEditForm from "./PersonagemEditForm";
import { FaEdit } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

import useModal from "../../hooks/useModal";
import { useAuth } from "../../components/AuthContext";
import { QueryClient } from "@tanstack/react-query";

interface IPersonagensListByGenItem {
  personagem: Personagem;
  delay: number;
  isAtualizar: boolean;
}

const PersonagensListByGenItem = ({
  personagem,
  delay,
  isAtualizar: atualizar,
}: IPersonagensListByGenItem) => {
  const { status } = useAuth();
  const { geracao } = useParams();
  const { id, precisa_atualizar } = personagem;
  const { handleToggleModal, open } = useModal();
  const [isAtualizar, setIsAtualizar] = React.useState(precisa_atualizar);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setIsAtualizar(precisa_atualizar);
  }, [precisa_atualizar]);

  const { titulos, vices, titulosMundial, vicesMundial } = React.useMemo(() => {
    const titulos = personagem.colocacoes.filter(
      (c) => c.classificacao === "Campeao",
    );
    const vices = personagem.colocacoes.filter(
      (c) => c.classificacao === "Segundo",
    );
    const titulosMundial =
      personagem.colocacoes_mundial?.filter(
        (c) => c.classificacao === "Campeao",
      ) || [];
    const vicesMundial =
      personagem.colocacoes_mundial?.filter(
        (c) => c.classificacao === "Segundo",
      ) || [];
    return { titulos, vices, titulosMundial, vicesMundial };
  }, [personagem]);

  const hasTitulo = titulos.length > 0 || vices.length > 0;

  const hasTituloMundial =
    titulosMundial.length > 0 || vicesMundial?.length > 0;

  async function handleSetAtualizar(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    const novoEstado = !isAtualizar;
    setIsAtualizar(novoEstado);
    const response = await changeUpdateNeed(novoEstado, id);
    if (!response.success) {
      setIsAtualizar(!novoEstado);
      alert("Erro ao atualizar status. Tente novamente.");
    } else {
      queryClient.invalidateQueries({
        queryKey: ["allPersonagens"],
      });
    }
  }

  function handleToggleEditModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    handleToggleModal();
  }

  return (
    <Link
      to={
        geracao
          ? `${personagem.id}`
          : `personagens/${personagem?.geracao}/${personagem?.id}`
      }
      className="group"
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "linear", delay: delay }}
        className={`${
          isAtualizar
            ? "bg-gradient-to-r from-orange-400 to-orange-300 border-orange-400"
            : "bg-azul-950 border-sky-900"
        } py-2 pl-2 sm:p-4 shadow-lg rounded-md flex items-center gap-2 xs:gap-4 transition-all group-hover:border-orange-500`}
      >
        <Perfil size="16" personagem={personagem} />
        <div>
          <p className="mb-1 text-sm text-white">{personagem.nome}</p>

          <span className="block text-xs text-slate-400 mb-1 font-semibold">
            Deck: {personagem.deckName}
          </span>
          <div className="flex gap-1 mb-1 flex-wrap">
            {hasTitulo && (
              <span className="text-xs text-slate-500">Nacional | </span>
            )}

            <div className="flex gap-1">
              {titulos.map((t, i) => (
                <span key={i}>{setEmoji(t.classificacao)}</span>
              ))}
            </div>
            <div className="flex gap-1">
              {vices.map((t, i) => (
                <span key={i}>{setEmoji(t.classificacao)}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            {hasTituloMundial && (
              <span className="text-xs text-slate-500">Mundial | </span>
            )}

            <div className="flex gap-1">
              {titulosMundial.map((t, i) => (
                <span key={i}> {setEmoji("Mundial-C")} </span>
              ))}
            </div>
            <div className="flex gap-1">
              {vicesMundial.map((t, i) => (
                <span key={i}> {setEmoji("Mundial-V")} </span>
              ))}
            </div>
          </div>
        </div>
        {status !== "admin" ? (
          ""
        ) : (
          <div className="ml-auto flex gap-1 text-white text-xs">
            <button
              title="criar torneio"
              className="rounded-sm size-8 sm:size-9 cursor-pointer hover:scale-110 transition-all duration-200 p-2"
              onClick={handleToggleEditModal}
            >
              <Modal handleToggleModal={handleToggleModal} isOpen={open}>
                <PersonagemEditForm personagem={personagem} />
              </Modal>
              <span className="flex justify-center items-center text-lg text-sky-900">
                <FaEdit />
              </span>
            </button>
            <button
              onClick={handleSetAtualizar}
              className="rounded-sm size-8 sm:size-9 cursor-pointer hover:scale-110 transition-all duration-200 p-2"
            >
              {isAtualizar ? (
                <span className="flex justify-center items-center text-lg text-yellow-600">
                  <FaBookmark />
                </span>
              ) : (
                <span className="flex justify-center items-center text-lg text-sky-900">
                  <FaRegBookmark />
                </span>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default PersonagensListByGenItem;
