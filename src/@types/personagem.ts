export interface Colocacao {
  ano: number;
  classificacao: string;
}

export interface Personagem {
  id: number;
  nome: string;
  geracao: string;
  deckName: string;
  participacoes_mundial: number;
  colocacoes: Colocacao[];
  criado_em?: string;
  atualizado_em?: string;
  colocacoes_mundial?: Colocacao[];
  pontuacao_mundial: number | null;
  pontuacao: number;
  perfil: string;
  precisa_atualizar?: boolean;
}

export interface PersonagemProps {
  nome: string;
  perfil: string;
  deckName: string;
  geracao: string;
  carta?: string;
}
