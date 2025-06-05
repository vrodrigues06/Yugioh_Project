import { Personagem } from "../../@types/personagem";

interface IPersonagemCardHeader {
  personagem: Personagem;
}

const PersonagemCardHeader = ({ personagem }: IPersonagemCardHeader) => {
  return (
    <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-md">
      {/* Imagem */}
      <img
        src={personagem.perfil}
        alt={personagem.nome}
        className="w-full h-full object-contain object-center"
      />

      {/* Gradiente para melhorar a leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Texto */}
      <div className="absolute bottom-3 left-3">
        <h2 className="text-sm sm:text-lg font-bold font-display bg-azul-950/70 backdrop-blur-sm px-3 py-1 rounded-md border border-sky-700 shadow-md text-orange-200">
          {personagem.nome}
        </h2>
      </div>
    </div>
  );
};

export default PersonagemCardHeader;
