import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useTorneioStore } from "../store/useTorneiosStore";

export const TorneioGeracaoModel = () => {
  const { geracao, ano } = useParams();

  const torneiosStore = useTorneioStore((state) => state.torneiosStore);
  const fetchAllTorneios = useTorneioStore((state) => state.fetchAllTorneios);
  const { isLoading, error } = useTorneioStore();
  const [torneioAno, setTorneioAno] = React.useState<number | null>(
    Number(ano) || null,
  );
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTorneios();
  }, [fetchAllTorneios]);

  const torneiosByGen = useMemo(() => {
    return torneiosStore.filter(
      (torneio) =>
        torneio.geracao === geracao && torneio.status === "finalizado",
    );
  }, [torneiosStore, geracao]);

  const anos = useMemo(() => {
    return torneiosByGen.map((torneio) => torneio.ano).sort((a, b) => b - a); // Garantindo que o maior ano venha primeiro
  }, [torneiosByGen]);

  React.useEffect(() => {
    if (anos.length > 0 && torneioAno === null) {
      setTorneioAno(anos[0]);
      navigate(`/torneios/${geracao}/${anos[0]}`);
    } else if (torneioAno !== null) {
      navigate(`/torneios/${geracao}/${torneioAno}`);
      setTorneioAno(torneioAno);
    }
  }, [anos, geracao, torneioAno, navigate]);

  function handleTorneioAnoChange({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) {
    const anoSelecionado = Number(target.value);
    setTorneioAno(anoSelecionado);

    navigate(`/torneios/${geracao}/${anoSelecionado}`);
  }

  const torneiosSorted = useMemo(() => {
    return torneiosByGen.sort((torneioA, torneioB) => {
      const yearA = parseInt(torneioA.nome.slice(-4));
      const yearB = parseInt(torneioB.nome.slice(-4));
      return yearB - yearA;
    });
  }, [torneiosByGen]);

  const torneioSelected = torneiosSorted.find(
    (torneio) => torneio.ano === torneioAno,
  );

  const edicaoNumber = useMemo(() => {
    if (!torneioSelected) return null;
    return (
      torneiosSorted.length -
      torneiosSorted.findIndex((torneio) => torneioSelected.ano === torneio.ano)
    );
  }, [torneiosSorted, torneioSelected]);

  function handleToggleModal() {
    setOpen((prev) => {
      const newModalState = !prev; // Alterna o estado
      return newModalState; // Retorna o novo valor de estado
    });
  }

  return {
    geracao,
    torneioAno,
    setTorneioAno,
    torneioSelected,
    edicaoNumber,
    anos,
    handleTorneioAnoChange,
    error,
    handleToggleModal,
    isLoading,
    open,
  };
};
