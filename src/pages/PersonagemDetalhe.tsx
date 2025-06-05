import React from "react";
import { Link, useParams } from "react-router";
import { usePersonagemStore } from "../store/usePersonagemStore";
import Error from "../components/Error";
import Loading from "../components/Loading";
import PersonagemDetalheCard from "../features/personagens-detalhes/PersonagemDetalheCard";

const PersonagemDetalhe = () => {
  const { geracao, id } = useParams();
  const { fetchAllPersonagens, personagensStore, error, isLoading } =
    usePersonagemStore();

  React.useEffect(() => {
    if (personagensStore.length === 0) fetchAllPersonagens();
  }, [fetchAllPersonagens, personagensStore.length]);

  const personagem = React.useMemo(() => {
    return personagensStore.find((p) => p.id === Number(id));
  }, [personagensStore, id]);

  if (!personagem) return;

  if (error) return <Error message={error} />;
  if (isLoading) return <Loading />;

  if (!id) return;
  return (
    <div className="text-white">
      <Link
        to={`/personagens/${geracao}`}
        className="hover:underline text-slate-400 text-xs block -mt-2 mb-4"
      >
        {" "}
        🠔 Voltar para personagens{" "}
      </Link>
      <PersonagemDetalheCard personagem={personagem} />
    </div>
  );
};

export default PersonagemDetalhe;
