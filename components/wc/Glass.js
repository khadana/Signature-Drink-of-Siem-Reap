import { useArt, Crayon, Smudge } from "./Paper.js";

// A glass of fresh palm juice with ice, a straw and a slice of palm fruit.
export default function Glass({ size = 120 }) {
  const art = useArt(3);
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <defs>{art.defs}</defs>
      <g filter={art.url("crayon")}>
        <Smudge art={art} rx={30} />
        <Crayon art={art} d="M38 14 L82 14 L77 96 Q76 101 70 101 L50 101 Q44 101 43 96 Z" color="#e3f2f8" edge="#6aa9cc" />
        <Crayon art={art} d="M41 40 Q60 35 79 40 L76 94 Q75 98 70 98 L50 98 Q45 98 44 94 Z" color="#f6c968" shade="#de8f30" shadeD="M66 38 Q73 38 79 40 L76 94 Q75 98 70 98 L66 98 Z" edge="#c97a24" />
        <Crayon art={art} d="M70 3 L74 5 L62 84 L58 83 Z" color="#f28a3e" shade="#c95a1c" shadeD="M72 4 L74 5 L62 84 L60 84 Z" edge="#b5501a" />
        <Crayon art={art} d="M46 52 L59 50 L61 63 L48 65 Z" color="#ffffff" shade="#cfe9f5" shadeD="M55 51 L59 50 L61 63 L57 64 Z" edge="#7fb3d9" />
        <Crayon art={art} d="M60 67 L72 69 L70 81 L58 79 Z" color="#ffffff" shade="#cfe9f5" shadeD="M68 68 L72 69 L70 81 L66 80 Z" edge="#7fb3d9" />
        <Crayon art={art} d="M25 16 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0 Z" color="#fbf0d2" shade="#ead39a" shadeD="M36 5 a11 11 0 0 1 0 22 Z" edge="#c9a24a" />
        <path d="M47 20 L48 90" stroke="#ffffff" strokeWidth="3" opacity="0.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}
