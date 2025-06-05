import { ReactNode } from "react";
import { FaTrophy } from "react-icons/fa";
import { FaMedal } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { TbWorldStar } from "react-icons/tb";

export function setEmoji(classificacao: string): ReactNode | null {
  switch (classificacao) {
    case "Campeao":
      return <FaTrophy className="text-yellow-500" />;
    case "Segundo":
      return <FaMedal className="text-azul-150" />;
    case "Terceiro":
      return <FaMedal className="text-amber-700" />;
    case "Quarto":
      return <FaMedal className="text-sky-800" />;
    case "Quartas":
      return <FaStar className="text-yellow-500" />;
    case "Oitavas":
      return <FaBalanceScaleLeft className="text-azul-300" />;
    case "Pf":
      return <FaFlag className="text-slate-600" />;
    case "Mundial-C":
      return <TbWorldStar className="text-orange-500" />;
    case "Mundial-V":
      return <TbWorldStar className="text-azul-150" />;
    default:
      return null;
  }
}
