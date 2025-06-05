import { Torneio } from "../../@types";

interface ITorneioCardHeader {
  torneio: Torneio;
}

const TorneioCardHeader = ({ torneio }: ITorneioCardHeader) => {
  return (
    <div className="relative h-36 sm:h-48">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('./torneios/torneio-${torneio?.geracao}.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-50 "></div>

      <div className="relative z-10 flex  items-end justify-between h-full text-orange-200 px-2 py-4 sm:px-4 ">
        <div className="flex flex-col">
          <h2 className="text-xs sm:text-sm font-bold font-display bg-gradient-to-t from-orange-500 to-orange-300 px-2 rounded-md">
            {torneio?.nome}
          </h2>
          <span className="text-xs text-center text-white font-bold">
            {torneio?.classificacao.length} Duelistas
          </span>
        </div>
        <div>
          <img
            className="h-10 w-16  sm:h-12 sm:w-18"
            src={`./torneios/torneio-${torneio?.geracao}-logo.png`}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default TorneioCardHeader;
