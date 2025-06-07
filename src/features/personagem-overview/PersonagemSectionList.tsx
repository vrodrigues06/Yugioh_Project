import React from "react";
import { usePersonagemStore } from "../../store/usePersonagemStore";
import PersonagemSectionListItem from "./PersonagemSectionListItem";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { Personagem } from "../../@types/personagem";

interface IPersonagemSectionList {
  geracao: string;
  personagens: Personagem[];
  error: string | null;
  isLoading: boolean;
}

const PersonagemSectionList = ({
  geracao,
  personagens,
  error,
  isLoading,
}: IPersonagemSectionList) => {
  const personagensFilted = React.useMemo(() => {
    return geracao === "Todos"
      ? personagens
      : personagens.filter((p) => p.geracao === geracao.toLowerCase());
  }, [geracao, personagens]);

  if (error) return <Error message={error} />;

  if (isLoading) return <Loading />;

  const personagemSorted = personagensFilted.sort(() => Math.random() - 0.5);

  return (
    <div className="grid gap-2">
      {personagemSorted.map((p, index) => {
        if (index > 4) return null;

        return (
          <PersonagemSectionListItem
            key={p.id}
            personagem={p}
            delay={index * 0.1}
          />
        );
      })}
    </div>
  );
};

export default PersonagemSectionList;
