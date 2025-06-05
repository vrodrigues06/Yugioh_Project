import { FaCrown } from "react-icons/fa6";
import { Mundial, Torneio } from "../../@types";

const TorneiosAnterioresItem = <T extends Torneio | Mundial>({
  torneio,
}: {
  torneio: T;
}) => {
  const duelistas = torneio.classificacao.length;

  return (
    <div className="group-hover:border-sky-800 bg-blue-950 p-2 rounded-md border border-sky-800/30 shadow-2xl">
      <h3 className="text-orange-500 mb-2">{torneio.nome}</h3>
      <p className="flex gap-1 items-center">
        <FaCrown className="text-yellow-500" /> Campeão:{" "}
        {torneio.podium[0].nome}
      </p>
      <span className="block text-slate-400 mb-3">{duelistas} Duelistas</span>
      <ul>
        {torneio.podium.map((d, index) => {
          if (index === 0) return;
          return (
            <li className="text-slate-400" key={d.nome}>
              <span className="font-bold">{index + 1}°</span> {d.nome}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TorneiosAnterioresItem;
