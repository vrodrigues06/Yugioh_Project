import React from "react";

const useMedia = (media: string) => {
  const [match, setMatch] = React.useState(false);

  React.useEffect(() => {
    // Verifica se a função `window.matchMedia` está disponível
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQueryList = window.matchMedia(media);

      // Função que altera o estado conforme o resultado da query
      const changeMatch = () => {
        setMatch(mediaQueryList.matches);
      };

      // Inicializa o estado com o valor atual
      changeMatch();

      // Adiciona o ouvinte de evento
      mediaQueryList.addEventListener("change", changeMatch);

      // Limpeza: remove o ouvinte de evento quando o componente for desmontado ou a query mudar
      return () => {
        mediaQueryList.removeEventListener("change", changeMatch);
      };
    }
  }, [media]);

  return match;
};

export default useMedia;
