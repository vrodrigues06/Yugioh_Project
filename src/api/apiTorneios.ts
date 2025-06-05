import supabase from "./supabase";
import {
  Geracao,
  Torneio,
  SistemaPontuacao,
  Classificacao,
  Podium,
  RankingPontuacao,
  TorneioInput,
  RankingData,
  Match,
} from "../@types";
import { FieldValues } from "react-hook-form";

// Interfaces

export async function getAllTorneios(): Promise<Torneio[] | null> {
  const geracoes: Geracao[] = ["dm", "gx", "5ds", "zexal", "arc-v", "vrains"];
  const allTorneios: Torneio[] = [];

  for (const geracao of geracoes) {
    const { data, error } = await supabase
      .from(`torneio_${geracao}`)
      .select("*");

    if (error) {
      console.error(
        `Erro ao buscar os torneios da geração${geracao}: ${error.message}`,
      );
      continue;
    }

    if (data) allTorneios.push(...data);
  }

  return allTorneios.length ? allTorneios : null;
}

export async function getTorneios(geracao: Geracao): Promise<Torneio[] | null> {
  if (!geracao) return null;

  const { data, error } = await supabase.from(`torneio_${geracao}`).select("*");

  if (error)
    throw new Error(`Não foi possível carregar os torneios: ${error.message}`);

  if (!data || data.length === 0) return null;

  return data as Torneio[];
}

export async function getTorneioByYear(
  geracao: Geracao | string,
  year: number,
): Promise<Torneio | null> {
  if (!geracao && !year) return null;

  const { data, error } = await supabase
    .from(`torneio_${geracao}`)
    .select()
    .eq("ano", year);

  if (error)
    throw new Error(`Não foi possível carregar o Torneio: ${error.message}`);

  if (!data || data.length === 0) return null;

  return data[0] as Torneio;
}

// Criação do Torneio

export async function createTorneio(
  torneioInput: TorneioInput | FieldValues,
): Promise<Torneio | null> {
  const { ano, geracao, nome, matches, status } = torneioInput;

  // Cria o objeto Torneio com os dados fornecidos
  const torneio: Torneio = {
    ano,
    classificacao: [],
    geracao,
    nome,
    podium: [],
    status: status,
    matches: matches,
  };

  // Insere o torneio no banco de dados
  const { data, error } = await supabase
    .from(`torneio_${geracao}`)
    .insert([torneio])
    .single();

  if (error) {
    throw new Error(`Não foi possível criar o torneio: ${error.message}`);
  }

  return data as Torneio;
}

export async function updateClassificacao(
  classificacao: Classificacao[],
  geracao: string,
  ano: number,
): Promise<Classificacao[] | null> {
  const { data, error } = await supabase
    .from(`torneio_${geracao}`)
    .update({ classificacao }) // atualiza a coluna 'classificacao'
    .eq("ano", ano) // filtra pelo ano
    .select("classificacao") // opcional: retorna só a coluna atualizada
    .single(); // espera só um registro (caso o ano seja único)

  if (error) {
    throw new Error(
      `Não foi possível atualizar a classificação: ${error.message}`,
    );
  }

  return data?.classificacao ?? null;
}

export async function updateMatches(
  matches: Match[],
  geracao: string,
  ano: number,
): Promise<Match[] | null> {
  const { data, error } = await supabase
    .from(`torneio_${geracao}`)
    .update({ matches }) // atualiza a coluna 'matches'
    .eq("ano", ano) // filtra pelo ano
    .select("matches") // opcional: retorna só a coluna atualizada
    .single(); // espera só um registro

  if (error) {
    throw new Error(`Não foi possível atualizar as partidas: ${error.message}`);
  }

  return data?.matches ?? null;
}

export async function updatePodiumAndStatus(
  podium: Podium[],
  geracao: string,
  ano: number,
): Promise<void> {
  const { error } = await supabase
    .from(`torneio_${geracao}`)
    .update({
      podium,
      status: "finalizado",
    })
    .eq("ano", ano);

  if (error) {
    throw new Error(
      `Não foi possível atualizar o pódio e o status: ${error.message}`,
    );
  }
}
