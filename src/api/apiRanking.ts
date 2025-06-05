import {
  Classificacao,
  Ranking,
  RankingData,
  RankingPontuacao,
} from "../@types";
import { Personagem } from "../@types/personagem";
import supabase from "./supabase";

export const updateRankingGlobal = async (
  geracao: string,
  participantes: Classificacao[],
) => {
  const colunaGeracao = `torneio_${geracao}`;

  const { data, error } = await supabase
    .from("ranking-global")
    .select(colunaGeracao)
    .eq("id", 1)
    .single<RankingData>();

  if (error) {
    console.error("Erro ao buscar ranking existente:", error);
    return;
  }

  const rankingAtual: RankingPontuacao[] = data
    ? data[colunaGeracao] || []
    : [];

  const novoRanking = [...rankingAtual];

  participantes.forEach(({ nome, pontos }) => {
    const index = novoRanking.findIndex((p) => p.nome === nome);

    if (index !== -1) {
      // Atualizar pontuação do participante existente
      novoRanking[index].pontos += pontos;
    } else {
      // Adicionar novo participante
      novoRanking.push({ nome, pontos });
    }
  });

  const { error: updateError } = await supabase
    .from("ranking-global")
    .update({ [colunaGeracao]: novoRanking })
    .eq("id", 1);

  if (updateError) {
    console.error("Erro ao atualizar ranking:", updateError);
  }
};

export const getRankingGlobal = async (): Promise<RankingData> => {
  const { data, error } = await supabase
    .from("ranking-global")
    .select()
    .eq("id", 1)
    .single();

  if (error)
    throw new Error(`Não foi possivel obter os Rankings: ${error.message}`);

  return data as RankingData;
};

export const getAllRankings = async (): Promise<Ranking[]> => {
  const { data, error } = await supabase.from("rankings").select();

  if (error) {
    throw new Error(`Não foi possível obter os rankings: ${error.message}`);
  }

  return data as Ranking[];
};

export const getRankingByYear = async (
  ano: number,
  geracao: string,
): Promise<Ranking | null> => {
  const { data, error } = await supabase
    .from("rankings")
    .select()
    .eq("ano", ano)
    .eq("geracao", geracao)
    .single();

  if (error) {
    throw new Error(
      `Não foi possível obter o ranking para o ano ${ano} e geração ${geracao}: ${error.message}`,
    );
  }

  return data as Ranking | null;
};

export const createRanking = async ({
  ano,
  geracao,
  ranking,
}: Ranking): Promise<Ranking> => {
  try {
    // 1. Verificar se já existe um ranking para o ano atual
    const { data: rankingExistente, error: errorRankingExistente } =
      await supabase
        .from("rankings")
        .select("ranking")
        .eq("ano", ano)
        .eq("geracao", geracao)
        .single();

    if (errorRankingExistente && errorRankingExistente.code !== "PGRST116") {
      throw new Error(
        `Erro ao verificar o ranking do ano atual: ${errorRankingExistente.message}`,
      );
    }

    // Se o ranking já existir para o ano atual, lança um erro
    if (rankingExistente) {
      throw new Error(`Já existe um ranking para o ano ${ano}.`);
    }

    // 2. Pegar o ranking do ano anterior
    const { data: rankingAnterior, error: errorRankingAnterior } =
      await supabase
        .from("rankings")
        .select("ranking")
        .eq("ano", ano - 1) // ano anterior
        .eq("geracao", geracao)
        .single();

    if (errorRankingAnterior && errorRankingAnterior.code !== "PGRST116") {
      console.error(
        `Não foi possível obter o ranking do ano anterior: ${errorRankingAnterior.message}`,
      );
    }

    // 3. Se não existir o ranking anterior, apenas insere o ranking atual
    if (!rankingAnterior) {
      const { data, error } = await supabase
        .from("rankings")
        .insert([
          {
            ano,
            geracao,
            ranking, // Inserindo o ranking atual diretamente
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(`Não foi possível criar o ranking: ${error.message}`);
      }

      return data as Ranking;
    }

    // 4. Se existir ranking anterior, atualiza o ranking
    const rankingAtualizado = ranking.map((personagemAtual) => {
      const personagemAnterior = rankingAnterior.ranking.find(
        (personagemAnterior: RankingPontuacao) =>
          personagemAnterior.nome === personagemAtual.nome,
      );

      if (personagemAnterior) {
        personagemAtual.pontos += personagemAnterior.pontos;
      }

      return personagemAtual;
    });

    rankingAnterior.ranking.forEach((personagemAnterior: RankingPontuacao) => {
      const existeNoRankingAtual = rankingAtualizado.some(
        (personagemAtual) => personagemAtual.nome === personagemAnterior.nome,
      );

      if (!existeNoRankingAtual) {
        rankingAtualizado.push(personagemAnterior);
      }
    });

    rankingAtualizado.sort((a, b) => b.pontos - a.pontos);

    const { data, error } = await supabase
      .from("rankings")
      .upsert([
        {
          ano,
          geracao,
          ranking: rankingAtualizado, // Atualizando o ranking com a versão modificada
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(
        `Não foi possível salvar o ranking atualizado: ${error.message}`,
      );
    }

    return data as Ranking;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// pegar o Ranking do ano anterior
// caso o ranking anterior nao exista, apenas adicionar o ranking
// fazer a soma dos pontos do ranking recebido com o do anterior
// adicionar novos personagens tb caso ele nao exista no ranking anterior
