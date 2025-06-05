import { create } from "zustand";
import { Torneio } from "../@types";
import { getAllTorneios } from "../api/apiTorneios";

interface TorneiosStore {
  torneiosStore: Torneio[];
  isLoading: boolean;
  error: string | null;
  fetchAllTorneios: () => Promise<void>;
}

export const useTorneioStore = create<TorneiosStore>((set) => ({
  torneiosStore: [],
  isLoading: false,
  error: null,

  fetchAllTorneios: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await getAllTorneios();
      set({ torneiosStore: data || [], isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro desconhecido",
        isLoading: false,
      });
      console.error("Erro ao buscar torneios:", error);
    }
  },
}));
