import React from "react";
import { Classificacao, Mundial, Podium, Torneio } from "../@types";
import { FieldValues, useForm } from "react-hook-form";
import { useMundialStore } from "../store/useMundialStore";
import useAllPersonagens from "../hooks/useAllPersonagens";
import { useAllTorneios } from "../hooks/useAllTorneios";
import { embaralharArray } from "../utils/global";
import { useMundiais } from "../hooks/useMundiais";

const PainelMundialModel = () => {
  const { data: mundiais, isLoading: isLoadingMundial, error } = useMundiais();

  const { data: personagens, isLoading: isLoadingPersonagens } =
    useAllPersonagens();
  const { data: allTorneios, isLoading: isLoadingAllTorneios } =
    useAllTorneios();

  const podeCriar = React.useMemo(() => {
    return verificarSePodeCriarMundial(allTorneios, mundiais);
  }, [allTorneios, mundiais]);

  const participantes = React.useMemo(() => {
    if (!podeCriar.ano) return null;
    return definirParticipantesMundial(podeCriar.ano, allTorneios);
  }, [podeCriar.ano, allTorneios]);

  const mundiaisEmAndamento = mundiais.filter(
    (t) => t.status === "em_andamento",
  );
  const isLoading =
    isLoadingMundial || isLoadingPersonagens || isLoadingAllTorneios;

  return {
    isLoading,
    podeCriar,
    mundiaisEmAndamento,
    participantes,
  };
};

export default PainelMundialModel;

const definirParticipantesMundial = (ano: number, torneios: Torneio[]) => {
  if (!ano) return;

  // Filtrar os torneios do ano informado
  const torneiosDoAno = torneios?.filter((t) => t.ano === ano) || [];

  // Inicializar arrays
  const campeoes: string[] = [];
  const vices: string[] = [];
  const terceiros: string[] = [];
  const quartos: string[] = [];
  const quartas: string[] = [];

  torneiosDoAno.forEach((torneio) => {
    // Processar o podium
    torneio.podium?.forEach((item: Podium) => {
      switch (item.classificacao) {
        case "Campeao":
          campeoes.push(item.nome);
          break;
        case "Segundo":
          vices.push(item.nome);
          break;
        case "Terceiro":
          terceiros.push(item.nome);
          break;
        case "Quarto":
          quartos.push(item.nome);
          break;
      }
    });

    // Processar quem chegou nas Quartas
    const classificadosQuartas =
      torneio.classificacao
        ?.filter((c: Classificacao) => c.classificacao === "Quartas")
        .map((c: Classificacao) => c.nome) || [];

    quartas.push(...classificadosQuartas);
  });

  // Embaralhar a lista (permite duplicatas)
  const embaralhado = embaralharArray([...quartas]);

  // Selecionar 4 aleatórios
  const selecionadosQuartas = embaralhado.slice(0, 4);

  // Restantes
  const restantesQuartas = embaralhado.slice(4);

  return {
    campeoes,
    vices,
    terceiros,
    quartos,
    selecionadosQuartas,
    restantesQuartas,
  };
};

const verificarSePodeCriarMundial = (
  allTorneios: Torneio[],
  mundiais: Mundial[],
) => {
  if (!allTorneios || !mundiais) {
    return { liberado: false, motivo: "Dados inválidos." };
  }

  // Agrupar torneios por geração
  const geracoes = [...new Set(allTorneios.map((t) => t.geracao))];

  // Pegar o último torneio de cada geração
  const ultimosTorneios = geracoes.map((geracao) => {
    const torneiosDaGeracao = allTorneios
      .filter((t) => t.geracao === geracao)
      .map((t) => {
        const match = t.nome.match(/\d{4}/); // Extrair o ano do nome do torneio
        const ano = match ? parseInt(match[0], 10) : null;
        return { ...t, ano };
      })
      .filter((t) => t.ano !== null); // Filtrar torneios que possuem ano válido

    if (torneiosDaGeracao.length === 0) {
      return null; // Nenhum torneio encontrado para essa geração
    }

    // Encontrar o torneio com o ano mais recente
    return torneiosDaGeracao.reduce((maisRecente, atual) => {
      const anoAtual = atual.ano ?? 0;
      const anoMaisRecente = maisRecente.ano ?? 0;
      return anoAtual > anoMaisRecente ? atual : maisRecente;
    });
  });

  // 🔸 Verificar se algum torneio não foi encontrado (nulo)
  if (ultimosTorneios.some((t) => t === null)) {
    return {
      liberado: false,
      motivo: "Nem todas as gerações possuem torneios.",
    };
  }

  // 🔸 Garantir que todos os últimos torneios estejam finalizados
  const todosFinalizados = ultimosTorneios.every(
    (t) => t?.status?.toLowerCase() === "finalizado",
  );

  if (!todosFinalizados) {
    return {
      liberado: false,
      motivo: "Nem todos os últimos torneios estão finalizados.",
    };
  }

  // 🔸 Extrair os anos dos últimos torneios (todos não-nulos garantido)
  const anos = ultimosTorneios.map((t) => t!.ano!);

  // 🔸 Verificar se todos os anos são iguais
  const todosMesmoAno = anos.every((ano) => ano === anos[0]);

  if (!todosMesmoAno) {
    return {
      liberado: false,
      motivo: "Os últimos torneios não são do mesmo ano.",
    };
  }

  const anoVerificado = anos[0];

  // 🔸 Verificar se já existe um Mundial criado para esse ano
  const mundialJaExiste = mundiais.some((m) => m.ano === anoVerificado);

  if (mundialJaExiste) {
    return { liberado: false, motivo: `O Mundial ${anoVerificado} já existe.` };
  }

  // 🔸 ✅ Todas as validações passaram. Está liberado!
  return { liberado: true, ano: anoVerificado };
};
