import { create } from "zustand";
import { Mundial } from "../@types";
import { getMundial } from "../api/apiMundial";

interface MundialStore {
  mundial: Mundial[];
  isLoading: boolean;
  error: string | null;
  fetchMundial: () => Promise<void>;
}

export const useMundialStore = create<MundialStore>((set) => ({
  mundial: [],
  isLoading: false,
  error: null,

  fetchMundial: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await getMundial();
      set({ mundial: data || [], isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro desconhecido",
        isLoading: false,
      });
      console.error("Erro ao buscar dados do Mundial:", error);
    }
  },
}));
