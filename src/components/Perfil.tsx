import React, { useEffect, useState, useRef } from "react";
import { Personagem } from "../@types/personagem";
import useMedia from "../hooks/useMedia";

interface IPerfil {
  personagem: Personagem;
  size: "8" | "10" | "12" | "16" | "32" | "64";
}

const Perfil = ({ personagem, size }: IPerfil) => {
  const match = useMedia("(max-width: 500px)");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const smallSize = Number(size) * 3;
  const defaultSize = Number(size) * 4;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Para não observar mais após carregar
        }
      },
      {
        rootMargin: "50px", // carregar um pouco antes de aparecer
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rounded-full bg-cover bg-top border-2 transition-all border-blue-950 group-hover:border-orange-500`}
      style={{
        width: match ? `${smallSize}px` : `${defaultSize}px`,
        height: match ? `${smallSize}px` : `${defaultSize}px`,
        backgroundImage: isVisible ? `url(${personagem.perfil})` : undefined,
      }}
    ></div>
  );
};

export default Perfil;
