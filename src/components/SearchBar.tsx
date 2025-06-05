import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useAllPersonagens from "../hooks/useAllPersonagens";
import { useAllTorneios } from "../hooks/useAllTorneios";
import { Personagem } from "../@types/personagem";
import { Torneio } from "../@types";

interface SearchItem {
  type: "personagem" | "torneio";
  id: number | string;
  name: string;
  geracao: string;
}

const SearchBar = ({
  personagens,
  torneios,
}: {
  personagens: Personagem[];
  torneios: Torneio[];
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<SearchItem[]>([]);
  const navigate = useNavigate();

  // ✅ Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // ✅ Memorizar os dados
  const memorizedPersonagens = useMemo(() => personagens, [personagens]);
  const memorizedTorneios = useMemo(() => torneios, [torneios]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = debouncedQuery.toLowerCase();

    const filteredPersonagens = memorizedPersonagens
      .filter((p) => p.nome.toLowerCase().includes(lowerQuery))
      .map((p) => ({
        type: "personagem" as const,
        id: p.id,
        name: p.nome,
        geracao: p.geracao,
      }));

    const filteredTorneios = memorizedTorneios
      .filter((t) => t.nome.toLowerCase().includes(lowerQuery))
      .map((t) => ({
        type: "torneio" as const,
        id: t.ano,
        name: t.nome,
        geracao: t.geracao,
      }));

    setResults([...filteredPersonagens, ...filteredTorneios]);
  }, [debouncedQuery, memorizedPersonagens, memorizedTorneios]);

  const handleSelect = (item: SearchItem) => {
    if (item.type === "personagem") {
      navigate(`/personagens/${item.geracao}/${item.id}`);
    } else {
      navigate(`/torneios/${item.geracao}/${item.id}`);
    }
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full sm:max-w-xs">
      <input
        type="text"
        className="w-full px-3 py-1.5 rounded-sm bg-azul-950 border border-sky-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Pesquisar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <AnimatePresence>
        {results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 w-full mt-1 bg-azul-950 border border-sky-900 rounded-sm shadow-lg max-h-60 overflow-y-auto"
          >
            {results.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item)}
                className="cursor-pointer px-3 py-1.5 hover:bg-azul-800 text-slate-200"
              >
                <span className="text-orange-400">
                  {item.type === "personagem" ? "👤" : "🏆"}{" "}
                </span>
                {item.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
