import React from "react";
import TorneiosRankingOverview from "./TorneiosRankingOverview";
import PersonagemSectionList from "../personagem-overview/PersonagemSectionList";

const categorias = ["Todos", "Dm", "Gx", "5ds", "Zexal", "Arc-v", "Vrains"];

const TorneioOverviewSection = () => {
  const [categoriaAtiva, setCategoriaAtiva] = React.useState("Todos");
  function handleFilterChange({
    currentTarget,
  }: React.MouseEvent<HTMLLIElement>) {
    const novaCategoria = currentTarget.textContent || "";
    setCategoriaAtiva(novaCategoria);
  }

  return (
    <section className="grid  md:grid-cols-[1.4fr_1fr] text-white  gap-4">
      <div className="md:col-span-2 justify-self-center md:justify-self-end ">
        <ul className="flex gap-y-1.5 gap-x-1 flex-wrap">
          {categorias.map((categoria) => (
            <li
              key={categoria}
              onClick={handleFilterChange}
              className={`py-0.5 px-1 xs:px-1.5 rounded-sm uppercase text-xs transition-all border shadow cursor-pointer ${
                categoriaAtiva === categoria
                  ? "!bg-azul-950 !border-azul-800 hover:!border-azul-800 hover:!cursor-default"
                  : "bg-blue-950 border-transparent hover:border-orange-500"
              }`}
            >
              {categoria}
            </li>
          ))}
        </ul>
      </div>
      <PersonagemSectionList geracao={categoriaAtiva} />
      <TorneiosRankingOverview geracao={categoriaAtiva} />
    </section>
  );
};

export default TorneioOverviewSection;
