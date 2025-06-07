import React from "react";
import { usePersonagemStore } from "../../store/usePersonagemStore";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import PersonagensListByGenItem from "./PersonagensListByGenItem";
import useAllPersonagens from "../../hooks/useAllPersonagens";

interface IPersonagensListByGen {
  geracao: string;
}

const PersonagensListByGen = ({ geracao }: IPersonagensListByGen) => {
  const { data: personagens, error, isLoading } = useAllPersonagens();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400); // delay de 400ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const personagensFilted = React.useMemo(() => {
    const filteredByGen =
      geracao === "Todos"
        ? personagens
        : personagens.filter((p) => p.geracao === geracao.toLowerCase());

    if (debouncedSearchTerm.trim() === "") return filteredByGen;

    return filteredByGen.filter((p) =>
      p.nome.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [geracao, personagens, debouncedSearchTerm]);

  const personagensSorted = React.useMemo(() => {
    return personagensFilted.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }, [personagensFilted]);

  if (error) return <Error message={error} />;
  if (isLoading) return <Loading />;

  return (
    <div className="grid gap-4">
      <input
        type="text"
        placeholder="Buscar personagem..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-azul-950 border border-sky-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {personagensSorted.length > 0 ? (
        <div className="grid gap-2">
          {personagensSorted.map((p, index) => (
            <PersonagensListByGenItem
              key={p.id}
              personagem={p}
              delay={index * 0.1}
              isAtualizar={p.precisa_atualizar as boolean}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400">
          Nenhum personagem encontrado.
        </p>
      )}
    </div>
  );
};

export default PersonagensListByGen;
