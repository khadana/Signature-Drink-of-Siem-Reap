import { useArt, Crayon, Smudge } from "./Paper.js";

// Three round cakes of palm sugar, stacked.
function Cake({ x, y, art }) {
  const top = `M${x - 21} ${y} A21 8 0 0 1 ${x + 21} ${y} A21 8 0 0 1 ${x - 21} ${y} Z`;
  const side = `M${x - 21} ${y} L${x - 21} ${y + 12} A21 8 0 0 0 ${x + 21} ${y + 12} L${x + 21} ${y} A21 8 0 0 1 ${x - 21} ${y} Z`;
  const sideShade = `M${x + 6} ${y + 7} L${x + 6} ${y + 19} A21 8 0 0 0 ${x + 21} ${y + 12} L${x + 21} ${y} Z`;
  return (
    <>
      <Crayon art={art} d={side} color="#c97a34" shade="#8a4518" shadeD={sideShade} edge="#7a3a14" />
      <Crayon art={art} d={top} color="#f2b45c" shade="#d98a33" shadeD={`M${x + 4} ${y - 8} A21 8 0 0 1 ${x + 4} ${y + 8} Z`} edge="#a85a22" />
      <path d={`M${x - 12} ${y - 1} Q${x - 2} ${y + 4} ${x + 9} ${y - 2}`} stroke="#fff3d6" strokeWidth="2.2" fill="none" opacity="0.85" strokeLinecap="round" />
    </>
  );
}

export default function SugarCakes({ size = 120 }) {
  const art = useArt(7);
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <defs>{art.defs}</defs>
      <g filter={art.url("crayon")}>
        <Smudge art={art} rx={46} />
        <Cake x={38} y={80} art={art} />
        <Cake x={82} y={80} art={art} />
        <Cake x={60} y={58} art={art} />
      </g>
    </svg>
  );
}
