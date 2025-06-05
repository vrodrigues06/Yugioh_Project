export const formatDate = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .format(now)
    .replace(/\//g, "-") // Substitui "/" por "-" para evitar problemas no nome do arquivo
    .replace(/, /g, "_") // Substitui ", " por "_" para separar data e hora
    .replace(/:/g, "-"); // Substitui ":" por "-" pois não é aceito em nomes de arquivo
};
