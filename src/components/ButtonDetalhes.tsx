import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router";
import { Torneio } from "../@types";
import { Personagem } from "../@types/personagem";

interface IButtonDetalhes {
  torneio?: Torneio;
  personagem?: Personagem;
  children: string;
}

const ButtonDetalhes = ({ torneio, personagem, children }: IButtonDetalhes) => {
  return (
    <div className="text-sm bg-azul-800 justify-self-end self-start p-1 rounded-md text-slate-400">
      <Link
        className="flex gap-2 items-center"
        title="Ver mais Detalhes"
        to={
          torneio
            ? `torneios/${torneio.geracao}/${torneio.ano}`
            : `personagens/${personagem?.geracao}/${personagem?.id}`
        }
      >
        <span className="hidden xs:block"> {children} </span>{" "}
        <FaArrowUpRightFromSquare />
      </Link>
    </div>
  );
};

export default ButtonDetalhes;
