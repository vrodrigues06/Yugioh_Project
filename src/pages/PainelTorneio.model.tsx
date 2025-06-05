import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { geracoes } from "../utils/global";
import { setAnos } from "../utils/setAnos";
import usePersonagens from "../hooks/usePersonagens";
import { gerarChavesTorneio } from "../utils/gerarChavesTorneio";
import { Match, Torneio, TorneioInput } from "../@types";
import { useAllTorneios } from "../hooks/useAllTorneios";
import useCreateTorneio from "../hooks/useCreateTorneio";
import { useNavigate } from "react-router";

const PainelTorneioModel = () => {
  const { isCreating, mutate } = useCreateTorneio();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm<FieldValues>();

  const geracaoInput = watch("geracao");
  const anoInput = watch("ano");
  const nomeInput = watch("nome");

  React.useEffect(() => {
    if (geracaoInput && anoInput) {
      setValue("nome", `${geracaoInput.toUpperCase()} ${anoInput}`);
    }
  }, [geracaoInput, anoInput, setValue]);

  let anos = setAnos(2002);
  if (geracaoInput === "dm") anos = setAnos(2002);
  if (geracaoInput === "gx") anos = setAnos(2005);
  if (geracaoInput === "5ds") anos = setAnos(2009);

  const { data: personagens = [], isLoading } = usePersonagens(geracaoInput);
  const { data: allTorneios = [], isLoading: isLoadingTorneios } =
    useAllTorneios();

  const torneiosEmAndamento = allTorneios.filter(
    (t) => t.status === "em_andamento",
  );

  const onGerarTorneio = () => {
    clearErrors();

    const torneiosGeracao = allTorneios.filter(
      (torneio) => torneio.geracao === geracaoInput,
    );

    const jaExiste = torneiosGeracao.some((t) => t.ano === Number(anoInput));

    if (jaExiste) {
      setError("ano", {
        type: "manual",
        message: "Já existe um torneio dessa geração com esse ano cadastrado.",
      });
      return;
    }

    const precisaAtualizar = personagens.some((p) => p.precisa_atualizar);
    if (precisaAtualizar) {
      setError("geracao", {
        type: "manual",
        message: "Existem personagens que precisam ser atualizados.",
      });
      return;
    }

    const participantesNome = personagens.map((p) => p.nome);
    const chaves = gerarChavesTorneio(participantesNome, torneiosGeracao);

    const torneio: TorneioInput = {
      ano: Number(anoInput),
      geracao: geracaoInput,
      nome: nomeInput,
      status: "em_andamento",
      matches: chaves,
    };

    mutate(torneio);

    reset();
  };

  return {
    register,
    errors,
    handleSubmit,
    onGerarTorneio,
    geracaoInput,
    anoInput,
    nomeInput,
    personagens,
    isLoading,
    isLoadingTorneios,
    anos,
    torneiosEmAndamento,
  };
};

export default PainelTorneioModel;
