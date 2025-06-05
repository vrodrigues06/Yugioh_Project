import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Classificacao,
  Geracao,
  Ranking,
  RankingPontuacao,
  TorneioInput,
} from "../../@types";
import { addRanking } from "../../api/apiPersonagens";
import setPodium from "../../utils/setPodium";
import { setAnos } from "../../utils/setAnos";
import usePersonagens from "../../hooks/usePersonagens";
import useCreateTorneio from "../../hooks/useCreateTorneio";
import { geracoes } from "../../utils/global";
import { updateRankingGlobal } from "../../api/apiRanking";
import useClassificacao from "../../hooks/useClassificacao";
import useCreateRanking from "../../hooks/useCreateRanking";
import { useNavigate } from "react-router";

export const TournamentFormModel = () => {
  const {
    classificacao,
    handleClassificacaoChange,
    classificacoesSelecionadas,
    setClassificacoes,
    setClassificacoesSelecionadas,
  } = useClassificacao();
  const { mutate: createRanking } = useCreateRanking();
  const { isCreating, mutate: createTorneio } = useCreateTorneio();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<TorneioInput | FieldValues>();

  const geracaoInput = watch("geracao");
  const anoInput = watch("ano");
  const nomeInput = watch("nome");

  let anos = setAnos(2002);
  if (geracaoInput === "dm") anos = setAnos(2002);
  if (geracaoInput === "gx") anos = setAnos(2005);
  if (geracaoInput === "5ds") anos = setAnos(2009);

  const { data: personagens, isLoading } = usePersonagens(geracaoInput);

  useEffect(() => {
    if (geracaoInput && anoInput) {
      setValue("nome", `${geracaoInput.toUpperCase()} ${anoInput}`);
    }
  }, [geracaoInput, anoInput, setValue]);

  const onSubmit: SubmitHandler<TorneioInput | FieldValues> = (data) => {
    if (!personagens) return;

    const rankingAtual: Ranking = {
      ano: Number(anoInput),
      geracao: geracaoInput,
      ranking: classificacao.map(({ nome, pontos }) => ({ nome, pontos })),
    };

    data.classificacao = classificacao;

    updateRankingGlobal(data.geracao, classificacao);
    createRanking(rankingAtual);

    data.podium = setPodium(classificacao);

    personagens.forEach(({ nome, id, pontuacao }) => {
      const personagemPontuacao = data.classificacao.find(
        ({ nome: n }: Classificacao) => n === nome,
      );

      if (personagemPontuacao) {
        const pontuacaoAtual = personagemPontuacao.pontos + pontuacao;
        const colocacao = {
          ano: data.ano,
          classificacao: personagemPontuacao.classificacao,
        };
        addRanking(colocacao, pontuacaoAtual, id);
      }
    });

    createTorneio(data, {
      onSuccess: () => {
        navigate(`/torneios/${geracaoInput}/${anoInput}`);
        reset();
        setClassificacoes([]);
        setClassificacoesSelecionadas({});
      },
    });
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    geracaoInput,
    anoInput,
    personagens,
    isLoading,
    isCreating,
    classificacao,
    classificacoesSelecionadas,
    handleClassificacaoChange,
    anos,
    geracoes,
    nomeInput,
  };
};
