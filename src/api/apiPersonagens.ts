import { FieldValues } from "react-hook-form";
import { Personagem, PersonagemProps } from "../@types/personagem";
import supabase from "./supabase";
import toast from "react-hot-toast";
import { formatDate } from "../utils/date";

export async function getAllPersonagens() {
  const { data, error } = await supabase.from("personagens").select("*");

  if (error) throw new Error("Não foi possível carregar todos os Personagens");

  return data.length ? (data as Personagem[]) : null;
}

export async function getPersonagens(geracao: string) {
  const { data, error } = await supabase
    .from("personagens")
    .select()
    .eq("geracao", geracao);

  if (error) throw new Error("Não foi possível carregar os Personagnes");

  return data;
}

export async function getPersonagem(id: number) {
  const { data, error } = await supabase
    .from("personagens")
    .select()
    .eq("id", id);

  if (error)
    throw new Error(`Não foi possível carregar o Personagem: ${error.message}`);

  if (!data || data.length === 0) return null;

  return data[0];
}

export async function getPersonagemByName(nome: string) {
  const { data, error } = await supabase
    .from("personagens")
    .select()
    .eq("nome", nome);

  if (error)
    throw new Error(`Não foi possível carregar o Personagem: ${error.message}`);

  if (!data || data.length === 0) return null;

  return data[0] as Personagem;
}

export async function createPersonagem(personagem: Personagem | FieldValues) {
  try {
    const { data, error } = await supabase
      .from("personagens")
      .insert([personagem])
      .single();

    if (error) throw new Error("Não foi possível criar o Personagem");

    return data as Personagem;
  } catch (err) {
    console.error("Erro inesperado ao criar personagem:", err);
  }
}

export async function updatePersonagem(
  id: number,
  personagem: Personagem | FieldValues,
) {
  try {
    const { data, error } = await supabase
      .from("personagens")
      .update(personagem)
      .eq("id", id)
      .single();

    if (error) throw new Error("Não foi possível atualizar o Personagem");

    return data as Personagem;
  } catch (err) {
    console.error("Erro inesperado ao atualizar personagem:", err);
  }
}

export async function changeUpdateNeed(estado: boolean, id: number) {
  try {
    const { error } = await supabase
      .from("personagens")
      .update({ precisa_atualizar: estado })
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar status:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Erro inesperado:", err);
    return { success: false, error: "Erro inesperado ao atualizar o status" };
  }
}

export async function getUpdateNeed(id: number) {
  try {
    const { data, error } = await supabase
      .from("personagens")
      .select("precisa_atualizar")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erro ao buscar status:", error.message);
      return { success: false, error: error.message, data: null };
    }

    return { success: true, data: data?.precisa_atualizar ?? false };
  } catch (err) {
    console.error("Erro inesperado ao buscar status:", err);
    return {
      success: false,
      error: "Erro inesperado ao buscar o status",
      data: null,
    };
  }
}

// export async function editPersonagem(id: number, geracao: string) {

//   try {
//  const { data, error } = await supabase
//       .from("personagens")
//       .update([personagem])
//       .single();

//     if (error) throw new Error("Não foi possível editar o Personagem");
//   } catch (err) {
//     console.error("Erro tentar editar o personagem:", err);
//   }

// }

export async function addRanking(
  colocacoes: { ano: string; classificacao: string },
  pontuacao: number,
  id: number,
) {
  // Update Pontos
  const { data, error } = await supabase
    .from("personagens")
    .update({ pontuacao })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar a pontuação:", error);
    return;
  }

  const { data: personagem, error: fetchError } = await supabase
    .from("personagens")
    .select("colocacoes")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Erro ao buscar personagem:", fetchError);
    return;
  }

  const novasColocacoes = personagem?.colocacoes
    ? [...personagem.colocacoes, colocacoes]
    : [colocacoes];

  // Update Colocacao
  const { data: colocacao } = await supabase
    .from("personagens")
    .update({ colocacoes: novasColocacoes })
    .eq("id", id);

  return data;
}

export async function addRankingMundial(
  colocacoes: { ano: string; classificacao: string },
  participacoes_mundial: number,
  pontuacao_mundial: number,
  id: number,
) {
  // Update Pontuacao
  const { data: personagemPontos, error: fetchPontos } = await supabase
    .from("personagens")
    .update({ pontuacao_mundial })
    .eq("id", id);

  if (fetchPontos) {
    console.error("Erro ao atualizar a participação:", fetchPontos);
    return;
  }

  // Update Participacao
  const { data, error } = await supabase
    .from("personagens")
    .update({ participacoes_mundial })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar a participação:", error);
    return;
  }

  const { data: personagem, error: fetchError } = await supabase
    .from("personagens")
    .select("colocacoes_mundial")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Erro ao buscar personagem:", fetchError);
    return;
  }

  const novasColocacoes = personagem?.colocacoes_mundial
    ? [...personagem.colocacoes_mundial, colocacoes]
    : [colocacoes];

  // Update Colocacao
  const { data: colocacao } = await supabase
    .from("personagens")
    .update({ colocacoes_mundial: novasColocacoes })
    .eq("id", id);

  return data;
}

export async function uploadImagemPerfil(file: File, nomePersonagem: string) {
  const fileName = `${formatDate()}-${nomePersonagem}`;
  const { data, error } = await supabase.storage
    .from("perfis") // Substitua pelo nome correto do seu bucket no Supabase
    .upload(`/${fileName}`, file);

  if (error) {
    console.error("Erro ao enviar imagem:", error.message);
    toast.error("Erro ao enviar imagem. Tente novamente.");
    return null;
  }

  // Retorna a URL pública da imagem
  return `${
    supabase.storage.from("perfis").getPublicUrl(`/${fileName}`).data.publicUrl
  }`;
}
