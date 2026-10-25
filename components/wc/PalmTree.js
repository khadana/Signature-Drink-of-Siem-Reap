import { useArt, Crayon, Smudge } from "./Paper.js";

// A sugar palm: a ringed trunk and a crown of spiky fan-shaped leaves,
// with a bamboo tube hung under the crown to catch the sap.
const CX = 60;
const CY = 32;

function fanPath() {
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const a = ((-30 + i * 6) * Math.PI) / 180;
    const r = i % 2 ? 20 : 27;
    pts.push(`${(CX + r * Math.sin(a)).toFixed(1)} ${(CY - r * Math.cos(a)).toFixed(1)}`);
  }
  return `M${CX} ${CY} L${pts.join(" L")} Z`;
}
const FAN = fanPath();
const fans = [
  [-115, "#7fb055"],
  [-75, "#5f9443"],
  [-37, "#93c464"],
  [0, "#6fa04a"],
  [37, "#93c464"],
  [75, "#5f9443"],
  [115, "#7fb055"],
];

export default function PalmTree({ size = 120 }) {
  const art = useArt(17);
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <defs>{art.defs}</defs>
      <g filter={art.url("crayon")}>
        <Smudge art={art} rx={30} />
        <Crayon art={art} d="M56 102 L57 34 L63 34 L64 102 Z" color="#9a6a45" shade="#5e3a22" shadeD="M61 34 L63 34 L64 102 L61 102 Z" edge="#4a2c18" />
        {[46, 58, 70, 82, 93].map((y) => (
          <path key={y} d={`M56.5 ${y} Q60 ${y + 2} 63.5 ${y}`} stroke="#4a2c18" strokeWidth="1" fill="none" opacity="0.7" />
        ))}
        {fans.map(([a, c]) => (
          <g key={a} transform={`rotate(${a} ${CX} ${CY})`}>
            <Crayon art={art} d={FAN} color={c} edge="#3f6a2a" />
            <path d={`M${CX} ${CY} L${CX - 8} ${CY - 22} M${CX} ${CY} L${CX} ${CY - 24} M${CX} ${CY} L${CX + 8} ${CY - 22}`} stroke="#e1f2c0" strokeWidth="0.9" opacity="0.8" />
          </g>
        ))}
        <Crayon art={art} d="M64 40 h8 v17 q-4 3 -8 0 Z" color="#e6b955" shade="#b88a33" shadeD="M69 40 h3 v17 q-1.5 1.5 -3 1.5 Z" edge="#8f6a24" />
      </g>
    </svg>
  );
}
