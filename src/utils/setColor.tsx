export const setColor = (stats: number) => {
  if (stats === 0) return <span className="text-slate-600/15">{stats}</span>;
  if (stats === 1)
    return <span className="text-purple-700 font-semibold">{stats}</span>;
  if (stats > 1 && stats <= 5)
    return <span className="text-sky-400 font-semibold">{stats}</span>;
  if (stats > 5)
    return <span className="text-orange-500 font-bold">{stats}</span>;
};
