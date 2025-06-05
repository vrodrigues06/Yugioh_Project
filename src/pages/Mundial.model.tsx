import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useMundialStore } from "../store/useMundialStore";

export default function MundialModel() {
  const mundial = useMundialStore((state) => state.mundial);
  const fetchMundial = useMundialStore((state) => state.fetchMundial);
  const { isLoading, error } = useMundialStore();
  const [torneioAno, setTorneioAno] = React.useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMundial();
  }, [fetchMundial]);

  const mundialFilted = mundial.filter((m) => m.status === "finalizado");

  const anos = useMemo(() => {
    return mundialFilted.map((torneio) => torneio.ano).sort((a, b) => b - a); // Garantindo que o maior ano venha primeiro
  }, [mundialFilted]);

  React.useEffect(() => {
    if (anos.length > 0 && torneioAno === null) {
      setTorneioAno(anos[0]);
      navigate(`/mundial/${anos[0]}`);
    }
  }, [anos, torneioAno, setTorneioAno, navigate]);

  function handleTorneioAnoChange({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) {
    const anoSelecionado = Number(target.value);
    setTorneioAno(anoSelecionado);

    navigate(`/mundial/${anoSelecionado}`);
  }

  const torneiosSorted = useMemo(() => {
    return mundialFilted.sort((torneioA, torneioB) => {
      const yearA = parseInt(torneioA.nome.slice(-4));
      const yearB = parseInt(torneioB.nome.slice(-4));
      return yearB - yearA;
    });
  }, [mundialFilted]);

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

  return {
    torneioAno,
    setTorneioAno,
    torneioSelected,
    edicaoNumber,
    anos,
    handleTorneioAnoChange,
    error,
    isLoading,
  };
}
