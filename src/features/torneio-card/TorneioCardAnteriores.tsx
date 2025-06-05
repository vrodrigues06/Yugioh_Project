import { Torneio } from "../../@types";

interface ITorneioCardAnteriores {
  torneios: Torneio[];
}

const TorneioCardAnteriores = ({ torneios }: ITorneioCardAnteriores) => {
  return (
    <div>
      <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
        <span className="w-6 h-px -top-0.5 bg-gradient-to-t from-azul-800 to-azul-300 absolute"></span>
        Torneios Anteriores
      </p>

      {torneios.length ? (
        <div className="grid gap-2 grid-cols-2 divide-azul-800 divide-x-1">
          {torneios
            .slice()
            .reverse()
            .map((torneio) => {
              return (
                <div
                  key={torneio.nome}
                  className="text-xs *:block text-slate-400 *:mb-0.5"
                >
                  <h3 className="text-xs text-orange-500 mb-1 pb-1">
                    ({torneio.ano})
                  </h3>
                  <span>1° {torneio.podium[0]?.nome}</span>
                  <span>2° {torneio.podium[1]?.nome}</span>
                  <span>3° {torneio.podium[2]?.nome}</span>
                </div>
              );
            })}
        </div>
      ) : (
        <span className="text-xs text-slate-600">Sem Histórico anterior</span>
      )}
    </div>
  );
};

export default TorneioCardAnteriores;
