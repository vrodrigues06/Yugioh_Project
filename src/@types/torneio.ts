import { SistemaPontuacao } from "./pontuacao";

export type Geracao = "dm" | "gx" | "5ds" | "zexal" | "arc-v" | "vrains";

export interface Classificacao {
  nome: string;
  pontos: number;
  classificacao: string;
  eliminadoPor?: string | null;
}

export interface Podium {
  nome: string;
  classificacao: string;
}

export interface RankingPontuacao {
  nome: string;
  pontos: number;
}

export interface RankingData {
  [key: string]: RankingPontuacao[];
}

export interface Ranking {
  id?: number;
  ano: number;
  geracao: string;
  ranking: RankingPontuacao[];
}

export interface Torneio {
  ano: number;
  atualizado_em?: string;
  classificacao: Classificacao[];
  criado_em?: string;
  geracao: Geracao;
  nome: string;
  podium: Podium[];
  status: `pendente` | "em_andamento" | "finalizado";
  matches: Match[];
}

export interface TorneioInput {
  ano: number;
  geracao: Geracao;
  nome: string;
  matches: Match[];
  status: `pendente` | "em_andamento" | "finalizado";
}

export interface Mundial {
  ano: number;
  atualizado_em?: string;
  classificacao: Classificacao[];
  criado_em?: string;
  nome: string;
  podium: Podium[];
  status: `pendente` | "em_andamento" | "finalizado";
  matches: Match[];
}

export type Rodada =
  | "Primeira Fase"
  | "32 avos"
  | "16 avos"
  | "Oitavas"
  | "Quartas"
  | "Semifinal"
  | "Disputa 3º Lugar"
  | "Final";

export interface Match {
  id: number;
  rodada: Rodada;
  numero_partida: number;
  duelista1: string | null;
  duelista2: string | null;
  vencedor: null | string;
  status: "pendente" | "concluida" | "bye";
  proxima_partida_id: number | null;
  origemDuelista1?: string | null;
  origemDuelista2?: string | null;
}
