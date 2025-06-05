import { FieldValues } from "react-hook-form";
import { Classificacao, Match, Mundial, Podium } from "../@types";
import supabase from "./supabase";

export async function getMundial(): Promise<Mundial[] | null> {
  const { data, error } = await supabase.from("torneio_mundial").select("*");

  if (error) throw new Error("Não foi possivel carregar os Torneios Mundiais");

  return data.length ? data : null;
}

export async function getMundialByAno(ano: number): Promise<Mundial | null> {
  const { data, error } = await supabase
    .from("torneio_mundial")
    .select()
    .eq("ano", ano);

  if (error)
    throw new Error(
      `Não foi possível carregar o torneio mundial de ${ano}: ${error.message}`,
    );

  if (!data || data.length === 0) return null;
  return data[0] as Mundial;
}

export async function createMundial(torneio: Mundial): Promise<Mundial | null> {
  const { ano, nome, classificacao, podium, matches, status } = torneio;

  // Cria o objeto Torneio com os dados fornecidos
  const mundial: Mundial = {
    ano,
    classificacao,
    nome,
    podium,
    matches,
    status,
  };

  // Insere o torneio no banco de dados
  const { data, error } = await supabase
    .from("torneio_mundial")
    .insert([mundial])
    .single();

  if (error) {
    throw new Error(`Não foi possível criar o torneio: ${error.message}`);
  }

  return data as Mundial;
}

export async function updateClassificacaoMundial(
  classificacao: Classificacao[],
  ano: number,
): Promise<Classificacao[] | null> {
  const { data, error } = await supabase
    .from(`torneio_mundial`)
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

export async function updateMatchesMundial(
  matches: Match[],
  ano: number,
): Promise<Match[] | null> {
  const { data, error } = await supabase
    .from(`torneio_mundial`)
    .update({ matches }) // atualiza a coluna 'matches'
    .eq("ano", ano) // filtra pelo ano
    .select("matches") // opcional: retorna só a coluna atualizada
    .single(); // espera só um registro

  if (error) {
    throw new Error(`Não foi possível atualizar as partidas: ${error.message}`);
  }

  return data?.matches ?? null;
}

export async function updatePodiumAndStatusMundial(
  podium: Podium[],
  ano: number,
): Promise<void> {
  const { error } = await supabase
    .from(`torneio_mundial`)
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
