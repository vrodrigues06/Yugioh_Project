import { Personagem } from "../../@types/personagem";
import PersonagensItem from "./PersonagensItem";

interface PersonagensListProps {
  personagens: Personagem[] | undefined;
  handleClassificacaoChange: (
    nome: string,
    classificacao: string,
    pontos: number,
  ) => void;
  classificacoesSelecionadas: Record<string, string>;
}

const PersonagemList = ({
  personagens,
  handleClassificacaoChange,
  classificacoesSelecionadas,
}: PersonagensListProps) => {
  if (!personagens?.length) return;

  const personagensSorted = personagens.sort((a, b) =>
    a.nome.localeCompare(b.nome),
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
      {personagensSorted.map((p) => (
        <PersonagensItem
          key={p.id}
          personagem={p}
          setClassificacao={handleClassificacaoChange}
          classificacoesSelecionadas={classificacoesSelecionadas}
        />
      ))}
    </div>
  );
};

export default PersonagemList;
