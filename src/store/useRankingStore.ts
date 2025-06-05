import { create } from "zustand";
import { RankingData } from "../@types";
import { sortRanking } from "../utils/sortRanking";
import { getRankingGlobal } from "../api/apiRanking";

interface RankingStore {
  rankings: RankingData;
  isLoading: boolean;
  error: string | null;
  fetchRanking: () => Promise<void>;
}

export const useRankingStore = create<RankingStore>((set) => ({
  rankings: {} as RankingData,
  isLoading: false,
  error: null,

  fetchRanking: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await getRankingGlobal();

      if (data?.torneio_mundial) {
        data.torneio_mundial = sortRanking(data.torneio_mundial);
      }

      set({ rankings: data || {}, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro desconhecido",
        isLoading: false,
      });
      console.error("Erro ao buscar ranking global:", error);
    }
  },
}));
