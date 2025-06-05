import React from "react";
import { Classificacao, RankingPontuacao } from "../@types";
import setPontos from "../utils/setPontos";

const useClassificacao = () => {
  const [classificacao, setClassificacoes] = React.useState<Classificacao[]>(
    [],
  );
  const [ranking, setRanking] = React.useState<RankingPontuacao[]>([]);
  const [classificacoesSelecionadas, setClassificacoesSelecionadas] =
    React.useState<Record<string, string>>({});

  const handleClassificacaoChange = (
    nome: string,
    classificacao: string,
    pontos: number,
  ) => {
    if (!classificacao.length) return;

    setClassificacoesSelecionadas((prev) => {
      const novoEstado = { ...prev };
      Object.keys(novoEstado).forEach((key) => {
        if (novoEstado[key] === classificacao) {
          delete novoEstado[key];
        }
      });
      return { ...novoEstado, [nome]: classificacao };
    });
    setClassificacoes((prevClassificacoes) => {
      const novaClassificacao: Classificacao = { nome, classificacao, pontos };

      return [...prevClassificacoes, novaClassificacao].sort(
        (a, b) => b.pontos - a.pontos,
      );
    });

    setRanking((prevRanking) => {
      const isDuplicate = prevRanking.some((item) => item.nome === nome);

      if (isDuplicate) {
        return prevRanking;
      }

      const rankingAtual = {
        nome,
        pontos: setPontos(classificacao),
      };

      return [...prevRanking, rankingAtual].sort((a, b) => b.pontos - a.pontos);
    });
  };

  return {
    classificacao,
    handleClassificacaoChange,
    classificacoesSelecionadas,
    ranking,
    setClassificacoesSelecionadas,
    setClassificacoes,
    setRanking,
  };
};

export default useClassificacao;
