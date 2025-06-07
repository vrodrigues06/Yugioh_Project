import { useEffect, useState, useMemo } from "react";
import { Match, Mundial, Torneio } from "../../@types";
import { getPersonagemByName } from "../../api/apiPersonagens";
import { getPerdedor } from "../../utils/getPerdedor";
import { setMelhoresColocacoes } from "../../utils/global";
import { useRankingStore } from "../../store/useRankingStore";
import usePersonagens from "../../hooks/usePersonagens";
import { useHandleMatch } from "../../hooks/useHandleMatch";
import { findRankingIndex } from "../../utils/global";
import { Personagem } from "../../@types/personagem";
import { useHandleMatchMundial } from "../../hooks/useHandleMatchMundial";

export const DuelistItemMundialModel = ({
  duelista,
  match,
  torneio,
}: {
  duelista: string | null;
  match: Match;
  torneio: Mundial;
}) => {
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const { handleMatch } = useHandleMatchMundial({
    duelista,
    match,
    torneio,
  });

  const { rankings, fetchRanking } = useRankingStore();

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  useEffect(() => {
    async function fetchPersonagem() {
      if (duelista === null) return;
      const personagemData = await getPersonagemByName(duelista);
      setPersonagem(personagemData);
    }

    fetchPersonagem();
  }, [duelista]);

  const perdedor = useMemo(() => getPerdedor(match), [match]);
  const isPerdedor = duelista === perdedor;
  const hasVencedor = !!match.vencedor;
  const isMatchReady = match.duelista1 !== null && match.duelista2 !== null;
  const campeao = torneio.podium.find((p) => p.classificacao === "Campeao");
  const isCampeao = campeao?.nome === duelista;

  const {
    rankingMundial,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    terceiro,
    colocacoesAnterioresMundial,
    melhoresColocacoesMundial,
    quarto,
    hasTitulo,
  } = useMemo(() => {
    if (!personagem) {
      return {
        rankingMundial: null,
        melhoresColocacoes: [],
        colocacoesAnteriores: [],
        titulos: [],
        vices: [],
        terceiro: [],
        quarto: [],
        hasTitulo: false,
      };
    }

    const rankingMundial = findRankingIndex(
      personagem.nome,
      personagem.geracao,
      rankings,
      true,
    );

    const melhoresColocacoes = setMelhoresColocacoes(personagem);
    const melhoresColocacoesMundial = setMelhoresColocacoes(personagem, true);

    const colocacoesAnteriores = [...personagem.colocacoes]
      .sort((a, b) => b.ano - a.ano)
      .slice(0, 3);

    const colocacoesAnterioresMundial = personagem.colocacoes_mundial
      ?.sort((a, b) => b.ano - a.ano)
      .slice(0, 3);

    const titulos =
      personagem.colocacoes_mundial?.filter(
        (c) => c.classificacao === "Campeao",
      ) || [];

    const vices =
      personagem.colocacoes_mundial?.filter(
        (c) => c.classificacao === "Segundo",
      ) || [];

    const terceiro =
      personagem.colocacoes_mundial?.filter(
        (c) => c.classificacao === "Terceiro",
      ) || [];

    const quarto =
      personagem.colocacoes_mundial?.filter(
        (c) => c.classificacao === "Quarto",
      ) || [];

    const hasTitulo =
      titulos.length > 0 ||
      vices.length > 0 ||
      terceiro.length > 0 ||
      quarto.length > 0;

    return {
      rankingMundial,
      melhoresColocacoes,
      colocacoesAnteriores,
      titulos,
      vices,
      terceiro,
      quarto,
      colocacoesAnterioresMundial,
      melhoresColocacoesMundial,
      hasTitulo,
    };
  }, [personagem, rankings]);

  return {
    personagem,
    handleMatch,
    isPerdedor,
    hasVencedor,
    isMatchReady,
    isCampeao,
    rankingMundial,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    colocacoesAnterioresMundial,
    melhoresColocacoesMundial,
    terceiro,
    quarto,
    hasTitulo,
  };
};
