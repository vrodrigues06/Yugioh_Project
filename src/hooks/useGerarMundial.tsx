import { useNavigate } from "react-router";
import { Mundial } from "../@types";
import { ParticipantesI } from "../features/mundial-chaves/GerarMundial";
import { gerarChavesMundial } from "../utils/gerarChavesMundial";
import useCreateMundial from "./useCreateMundial";

type useHandleMatchMundialProps = {
  participantes: ParticipantesI | null | undefined;
  ano: number | undefined;
};

export const useGerarMundial = ({
  participantes,
  ano = 0,
}: useHandleMatchMundialProps) => {
  const { mutateAsync: createMundial, isCreating } = useCreateMundial();
  const navigate = useNavigate();
  if (!ano) return {};
  if (!participantes) return {};

  async function onGerarMundial() {
    // Atribuir uma Participação do mundial em cada personagem

    const chaves = gerarChavesMundial(participantes as ParticipantesI);

    const mundial: Mundial = {
      ano,
      nome: `Mundial ${ano}`,
      status: "em_andamento",
      matches: chaves,
      classificacao: [],
      podium: [],
    };

    await createMundial(mundial);

    setTimeout(() => {
      navigate(`/mundial/painel-mundial/${ano}`);
    }, 1000);
  }

  return {
    onGerarMundial,
  };
};
