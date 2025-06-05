export function setAnos(anoInicial: number): string[] {
  const date = new Date();

  const year = date.getFullYear();

  if (anoInicial > year) return [];

  const arrAnos: number[] = [];

  for (let i = year - anoInicial; i >= 0; i--) {
    arrAnos.push(anoInicial + i);
  }

  return arrAnos.map((n) => n.toString());
}
