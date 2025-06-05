import React from "react";
import { Personagem } from "../../@types/personagem";
import setPontos from "../../utils/setPontos";
import Perfil from "../../components/Perfil";
import { setEmoji } from "../../utils/setEmoji";
import { motion } from "framer-motion";

interface PersonagemWithProps {
  personagem: Personagem;
  setClassificacao: (
    nome: string,
    classificacao: string,
    pontos: number,
  ) => void;
  classificacoesSelecionadas: Record<string, string>;
}

const PersonagensItem = ({
  personagem,
  setClassificacao,
  classificacoesSelecionadas,
}: PersonagemWithProps) => {
  const [classificacao, setClassificacaoLocal] = React.useState<string>("");

  const classificacoesDisponiveis = [
    "Pf",
    "Oitavas",
    "Quartas",
    "Quarto",
    "Terceiro",
    "Segundo",
    "Campeao",
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassificacao = event.target.value;

    const pontos = setPontos(selectedClassificacao);

    setClassificacaoLocal(selectedClassificacao);
    setClassificacao(personagem.nome, selectedClassificacao, pontos);
  };

  return (
    <div className="flex gap-2 mb-4 animate-slide-in bg-azul-800 p-2 rounded-md items-center border border-sky-800">
      <div className="relative">
        <Perfil personagem={personagem} size="12" />
        <motion.span
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-0 right-0"
        >
          {setEmoji(classificacao)}
        </motion.span>
      </div>
      <div>
        <h3 className="text-white mb-2">{personagem.nome}</h3>
        <select
          value={classificacao}
          onChange={handleSelectChange}
          className="bg-azul-800 py-1 outline outline-sky-800 text-sky-300 rounded-md text-xs xs:text-md"
        >
          <option value="">...</option>
          {classificacoesDisponiveis.map((classificacaoOption) => (
            <option
              key={classificacaoOption}
              value={classificacaoOption}
              disabled={
                ["Campeao", "Segundo", "Terceiro", "Quarto"].includes(
                  classificacaoOption,
                ) &&
                Object.values(classificacoesSelecionadas ?? {}).includes(
                  classificacaoOption,
                )
              }
            >
              {classificacaoOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PersonagensItem;
