import { create } from "zustand";
import { getAllPersonagens } from "../api/apiPersonagens";
import { Personagem } from "../@types/personagem";

interface PersonagemStore {
  personagensStore: Personagem[];
  isLoading: boolean;
  error: string | null;
  fetchAllPersonagens: () => Promise<void>;
}

export const usePersonagemStore = create<PersonagemStore>((set) => ({
  personagensStore: [],
  isLoading: false,
  error: null,

  fetchAllPersonagens: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await getAllPersonagens();
      set({ personagensStore: data || [], isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro desconhecido",
        isLoading: false,
      });
      console.error("Erro ao buscar personagens:", error);
    }
  },
}));
