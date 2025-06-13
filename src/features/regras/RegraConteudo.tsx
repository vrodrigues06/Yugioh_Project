import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import useMedia from "../../hooks/useMedia";

interface Regra {
  titulo: string;
  regras: React.ReactNode[];
}

const RegraConteudo = () => {
  const { categoria } = useParams<{ categoria: keyof typeof conteudos }>();
  const match = useMedia("(max-width: 640px)");

  if (!categoria) return null;

  const conteudos: Record<string, Regra> = {
    decks: {
      titulo: "Regras para Criação dos Decks",
      regras: [
        <>
          Cada deck deve conter no mínimo{" "}
          <span className="font-bold text-orange-500">40</span> cartas.
        </>,
        <>
          Não é permitido{" "}
          <span className="font-bold text-orange-500">3 cópias</span> de cartas
          que não fazem parte do{" "}
          <span className="font-bold text-orange-500">arquétipo</span>, no
          máximo <span className="font-bold text-orange-500">2 cópias</span>.
        </>,
        <>
          Cartas <span className="font-bold text-orange-500">banidas</span> ou
          cartas de{" "}
          <span className="font-bold text-orange-500">animes muito fortes</span>{" "}
          não podem ter mais de uma cópia, com exceção de cartas de{" "}
          <span className="font-bold text-orange-500">draw</span>.
        </>,
        <>
          Cartas de <span className="font-bold text-orange-500">Draw</span>: O
          Deck terá cartas de draw de acordo com a quantidade de cartas no
          baralho: <br /> <br />
          entre <span className="font-bold text-orange-500">40-45</span>: 2{" "}
          <span>Pot of Greed</span>, 1 <span>Graceful</span>, <br />
          entre <span className="font-bold text-orange-500">45-50</span>:
          adiciona 1 <span>Demise</span>, <br />
          entre <span className="font-bold text-orange-500">50-55</span>:
          adiciona 1 <span>Graceful</span>
          , <br />
          entre <span className="font-bold text-orange-500">55-60</span>:
          adiciona 1 <span>Demise</span>, <br />
          entre <span className="font-bold text-orange-500">60-70</span>:
          adiciona 1 <span>Graceful</span>
          , <br />
          entre <span className="font-bold text-orange-500">70-80</span>:
          adiciona 1 <span>Demise</span>.
        </>,
      ],
    },
    torneio: {
      titulo: "Regras do Torneio Nacional",
      regras: [
        <>
          Os duelos seguem o formato{" "}
          <span className="font-bold text-orange-500">único</span>.
        </>,
        <>
          O Duelista que no torneio anterior chegou nas{" "}
          <span className="font-bold text-orange-500">Semis</span>, irá passar
          da{" "}
          <span className="font-bold text-orange-500">PF (Primeira Fase)</span>{" "}
          automaticamente.
        </>,
        <>
          As <span className="font-bold text-orange-500">Pontuações</span>{" "}
          atuais são: <br /> <br />
          <span className=" text-orange-500">Campeão</span>: 50pts, <br />
          <span className=" text-orange-500">Vice</span>: 25pts, <br />
          <span className=" text-orange-500">Terceiro</span>: 14pts, <br />
          <span className=" text-orange-500">Quarto</span>: 10pts, <br />
          <span className=" text-orange-500">Quartas</span>: 5pts, <br />
          <span className=" text-orange-500">Oitavas</span>: 3pts <br />
          <span className=" text-orange-500">16 avos</span>: 2pts <br />
          <span className=" text-orange-500">32 avos</span>: 1pt <br />
          <span className=" text-orange-500">PF</span>: 0pt.
        </>,
      ],
    },
    mundial: {
      titulo: "Regras de Classificação do Mundial",
      regras: [
        <>
          Podem ser classificados para o mundial os duelistas que chegarem até
          as{" "}
          <span className="text-orange-500 font-bold">
            quartas do torneio nacional
          </span>
          .
        </>,
        <>
          Serão escolhidos{" "}
          <span className="text-orange-500 font-bold">automaticamente </span>
          os duelistas que chegarem na{" "}
          <span className="text-orange-500 font-bold">semis</span>.
        </>,
        <>
          Aqueles que foram eliminados nas quartas, serão escolhidos de maneira
          <span className="text-orange-500 font-bold">
            {" "}
            aleatória por sorteio{" "}
          </span>
          4 participantes dentre os 12.
        </>,
        <>
          será feito uma filtragem para aqueles que foram eliminados na quartas
          seja selecionado pelo menos um de cada geração e no fim completar os
          16.
        </>,
        <>
          Atualmente há{" "}
          <span className="text-orange-500 font-bold">
            3 Gerações (DM, GX e 5Ds)
          </span>
          , isto está sujeito a mudança conforme forem adicionadas novas
          gerações.
        </>,
        <>
          O Mundial{" "}
          <span className="text-orange-500 font-bold">
            {" "}
            não tem e não terá jamais duelos preliminares{" "}
          </span>
          , pois o objetivo é tornar o torneio restrito a poucos participantes,
          então, é necessário uma organização para que os números de
          participantes sejam sempre potencia de 2. Caso necessário serão
          realizados sorteios aleatórios para eliminar participantes que
          chegaram nas quartas.
        </>,
      ],
    },
  };

  const regraSelecionada = conteudos[categoria];

  return (
    <motion.div
      key={categoria}
      initial={match ? { y: -50, opacity: 0 } : { x: -50, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-labelledby={`regra-${categoria}-title`}
      className="bg-azul-800 rounded-sm p-3"
    >
      <h2
        id={`regra-${categoria}-title`}
        className="text-xs xs:text-lg font-bold mb-2 text-white flex  items-center gap-1 xs:gap-1.5"
      >
        <FaStar className="text-lg xs:text-2xl text-orange-500" />{" "}
        {regraSelecionada.titulo}
      </h2>
      <ul className="list-disc p-3 pl-4 divide-y divide-sky-800/30">
        {regraSelecionada.regras.map((regra, index) => (
          <li className="text-slate-400 text-xs mb-4 pb-1" key={index}>
            {regra}{" "}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RegraConteudo;
